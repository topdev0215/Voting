const ConvertLib = artifacts.require("ConvertLib");
const Ballot = artifacts.require("Ballot");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Ballot);
  deployer.deploy(Ballot, [web3.utils.asciiToHex("Song"), web3.utils.asciiToHex("Ra")]);
};
