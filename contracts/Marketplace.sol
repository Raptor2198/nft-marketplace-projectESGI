// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount; // Compte recevant les frais de marketplace
    uint public immutable feePercent;            // Pourcentage de frais sur la vente
    uint public itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    // Mapping : itemId => Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    /// @notice Liste un NFT sur la marketplace.
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        // Transfert du NFT vers le contrat Marketplace
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount] = Item(itemCount, _nft, _tokenId, _price, payable(msg.sender), false);
        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    /// @notice Permet d'acheter un NFT listé.
    function purchaseItem(uint _itemId) external payable nonReentrant {
        require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
        Item storage item = items[_itemId];
        require(!item.sold, "Item already sold");
        uint totalPrice = getTotalPrice(_itemId);
        require(msg.value >= totalPrice, "Insufficient funds");

        // Transfert des fonds : le vendeur reçoit le prix, la marketplace le reste.
        item.seller.transfer(item.price);
        feeAccount.transfer(totalPrice - item.price);
        item.sold = true;
        // Transfert du NFT vers l'acheteur
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(_itemId, address(item.nft), item.tokenId, item.price, item.seller, msg.sender);
    }

    /// @notice Calcule le prix total incluant les frais.
    function getTotalPrice(uint _itemId) public view returns (uint) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }
}
