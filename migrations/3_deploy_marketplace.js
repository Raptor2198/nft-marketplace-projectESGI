const Marketplace = artifacts.require("Marketplace");

module.exports = function (deployer) {
  // Ici, feePercent est fixé à 1 (1%)
  deployer.deploy(Marketplace, 1);
};
