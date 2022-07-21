import { useState } from "react";
import { Box, Button, Flex, Text, Center } from '@chakra-ui/react';
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
    
    return (
        <Center>
            <Flex justify="center" align="center" width="1000px" height="90vh" flexDirection="column">
                <Box bg='rgba(0,0,0,0.2)' borderRadius="30px" w='100%' paddingBottom="30px" >
                    <Text fontSize="50px" fontFamily="Ubuntu" textShadow="0 3px #000000">Accepted DAO</Text>
                    <Text
                        fontSize="40px"
                        letterSpacing="-5.5%"
                        fontFamily="Ubuntu"
                        textShadow="0 2px 2px #000000"
                    >
                        Welcome to Accepted DAO.</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="Ubuntu"
                        textShadow="0 2px 2px #000000"
                    >
                        Accepted DAO is a decentralized college counseling organization.
                    </Text>
                </Box>

                <Box bg='rgba(0,0,0,0.2)' borderRadius="30px" w='100%' paddingBottom="30px" marginTop="70px">

                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="Ubuntu"
                        textShadow="0 2px 2px #000000"
                    >
                        ** Mint your membership NFT for only 0.001ETH **
                    </Text>


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
                                    fontSize="20px"
                                    padding="12px"
                                    margin="0 15px"
                                    onClick={handleMint}
                                >
                                    Join Now!
                                </Button>
                            </Flex>
                        </div>
                    ) : (
                        <>
                        <p>You must be connected to your Metamask wallet to mint your membership NFT.</p>
                        <p> Press connect button at the top-right corner to connect your metamask wallet.</p>
                        </>
                    )}
                </Box>
            </Flex>
        </Center>
    );

};

export default MainMint;