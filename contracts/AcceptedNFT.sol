// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (utils/cryptography/MerkleProof.sol)

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AcceptedNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    //delete these three lines when err
    uint256 private antibotInterval = 3;
    uint256 private mintLimitPerBlock = 3;
    uint256 private mintStartBlockNumber;

    constructor() payable ERC721("Rick.S", "RnM") {
        mintPrice = 1000000000000000;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 3;
        withdrawWallet = payable(msg.sender);
    }

    function setupSale(
        uint256 newMaxSaleAmount,
        uint256 newMintPrice,
        uint256 newMaxPerWallet
    ) external onlyOwner {
        maxSupply = newMaxSaleAmount;
        mintPrice = newMintPrice;
        maxPerWallet = newMaxPerWallet;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId_), "Token does not exist!");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == quantity_ * mintPrice, "wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold Out!");
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "exceed max wallet"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }

    //this part is still being edited

    function airDropOne(address user) public {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _mint(user, newTokenId);
    }
    function airDropTo(address user, uint256 quantity_) external {
      require(quantity_ > 0, "zero request");
      for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _mint(user, newTokenId);
        }
    }


    function setupPublicSale(
        uint256 newAntibotInterval,
        uint256 newMintLimitPerBlock,
        uint256 newMintStartBlockNumber,
        uint256 newMaxSaleAmount,
        uint256 newMintPrice,
        uint256 newMaxPerWallet
    ) external onlyOwner {
        antibotInterval = newAntibotInterval;
        mintLimitPerBlock = newMintLimitPerBlock;
        mintStartBlockNumber = newMintStartBlockNumber;
        maxSupply = newMaxSaleAmount;
        mintPrice = newMintPrice;
        maxPerWallet = newMaxPerWallet;
    }

    function publicMint(uint256 quantity_) external payable {
        require(isPublicMintEnabled, "minting not enabled");
        require(
            walletMints[msg.sender] + (antibotInterval) < block.number,
            "Bot is not allowed"
        );
        require(block.number >= mintStartBlockNumber, "Not yet started");
        require(
            quantity_ > 0 && quantity_ <= mintLimitPerBlock,
            "Too many requests or zero request"
        );

        require(msg.value == quantity_ * mintPrice, "wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold Out!");
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "exceed max wallet"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
        walletMints[msg.sender] = block.number;
    }
}