// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCollection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Contract metadata : URL décrivant la collection (ex. via un gateway IPFS)
    string public contractMetadata;

    // Frais de mint en wei (par exemple, en MATIC ou ETH selon le réseau)
    uint256 public mintFee;

    struct ArtRender {
        uint256 id;
        string uri;
    }

    event NFTMinted(address indexed recipient, uint256 tokenId, string tokenURI);

    constructor(
        address initialOwner,
        string memory _contractMetadata_,
        string memory name_,
        string memory symbol_,
        uint256 _mintFee
    )
        ERC721(name_, symbol_)
    {
        contractMetadata = _contractMetadata_;
        mintFee = _mintFee;
        // Transférer la propriété à l'initialOwner
        transferOwnership(initialOwner);
    }

    /// @notice Permet à un utilisateur de mint un NFT en payant le mintFee.
    function mintNFT(string memory uri) external payable returns (uint256) {
        require(msg.value >= mintFee, "Insufficient mint fee");
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTMinted(msg.sender, tokenId, uri);
        return tokenId;
    }

    /// @notice Renvoie tous les NFT créés sous forme d’un tableau de {id, uri}.
    function getAllNFTs() external view returns (ArtRender[] memory) {
        uint256 total = _tokenIds.current();
        ArtRender[] memory items = new ArtRender[](total);
        for (uint256 i = 0; i < total; ) {
            items[i] = ArtRender(i, tokenURI(i));
            unchecked { ++i; }
        }
        return items;
    }

    /// @notice Renvoie les NFT possédés par une adresse donnée.
    function getUserNFTs(address account) external view returns (ArtRender[] memory) {
        uint256 total = _tokenIds.current();
        uint256 count;
        for (uint256 i = 0; i < total; ) {
            if (ownerOf(i) == account) {
                count++;
            }
            unchecked { ++i; }
        }
        ArtRender[] memory items = new ArtRender[](count);
        uint256 index;
        for (uint256 i = 0; i < total; ) {
            if (ownerOf(i) == account) {
                items[index] = ArtRender(i, tokenURI(i));
                index++;
            }
            unchecked { ++i; }
        }
        return items;
    }

    // --- OVERRIDES obligatoires ---

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
