import { useState } from "react";
import { Box, Button, Flex, Link, Input, Text } from '@chakra-ui/react';
import { ethers, BigNumber } from 'ethers';
import AcceptedNFT from './AcceptedNFT.json';

const acceptedNFTAddress = '0x1a6cC113a0b336DE3a401083567b635781bC61c3';

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const mintValue = 0.001;

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                acceptedNFTAddress,
                AcceptedNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((mintValue * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    var privateKey = process.env.REACT_APP_PRIVATE_KEY;
    var rpc = process.env.REACT_APP_RINKEBY_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    var wallet = new ethers.Wallet(privateKey, provider);

    async function airDropMint() {
        
        const signer = wallet.provider.getSigner(wallet.address);
        const contract = new ethers.Contract(
            acceptedNFTAddress,
            AcceptedNFT.abi,
            signer
        );
            console.log(contract);
            try {
                //this is the part where the error occurs
                const response = await contract.airDropMint(1, {});
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="1000px">
                <div>
                    <Text fontSize="40px" textShadow="0 5px #000000">Accepted DAO</Text>
                    <Text 
                        fontSize="35px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        Welcome to Accepted DAO.</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        Accepted DAO is a decentralized college counseling organization.
                    </Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        ** Mint your membership NFT for only 0.001ETH **
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px" 
                            boxShadow="0px 2px 2px 1px #0F0F0F" 
                            color="white" 
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="0 15px"
                            onClick={handleMint}
                        >
                            Join Now!
                        </Button>
                        </Flex>
                    </div>
                ) : (
                    <p>You must be connected to your Metamask wallet to mint your membership NFT.</p>
                )}
                 <div>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        ** enter your wallet address to get an airdrop **
                    </Text>
                    <input id="wa"></input>
                    <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px" 
                            boxShadow="0px 2px 2px 1px #0F0F0F" 
                            color="white" 
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="0 15px"
                            onClick={airDropMint}
                        >
                            airdrop
                        </Button>
                </div>
                
            </Box>
        </Flex>
    );

};

export default MainMint;