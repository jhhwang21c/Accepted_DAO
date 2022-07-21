import React from "react";
import { Box, Button, Flex, Image, Spacer } from '@chakra-ui/react';
import Discord from "./assets/social-media-icons/discord.png";
import Email from "./assets/social-media-icons/email_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";

import { Link } from 'react-router-dom';
import Chat from './Chat';

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" backgroundColor="rgba(0,0,0,0.2)">
            {/* left side - social media icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <a href="https://www.discord.com" target="_blank" rel="noreferrer">
                    <Image src={Discord} boxSize="42px" margin="0 15px" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </a>
                <a href="https://www.gmail.com" target="_blank" rel="noreferrer">
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </a>
            </Flex>

            {/* right side - social media icons */}
            <Flex justify="space-around" align="center" width="40%" padding="30px">
            
                <Box margin="0 15px">
                        <a href="https://rinkebyfaucet.com/" target="_blank" style={{ textDecoration: 'none', color: 'white'}} rel="noreferrer">Faucet</a>
                </Box>
                <Spacer />
                <Box margin="0 15px">About</Box>
                <Spacer />
                <Box margin="0 15px"><a href="/" style={{ textDecoration: 'none', color: 'white'}} >Home</a></Box>
                <Spacer />

                <Box margin="0 15px"><Link to="/Chat">Chat</Link></Box>
                <Spacer />
                

                {/* connect */}
                {isConnected ? (
                    <Box backgroundColor="green" 
                    fontFamily="inherit" borderRadius="5px" width="150px" fontSize="20px"
                    padding="14px" margin="0 15px" boxShadow="0px 2px 2px 1px #0F0F0F" >Connected</Box>
                ) : (
                    <Button 
                        backgroundColor="#D6517D"
                        borderRadius="5px" 
                        boxShadow="0px 2px 2px 1px #0F0F0F" 
                        color="white" 
                        cursor="pointer"
                        fontFamily="inherit"
                        fontSize="20px"
                        width="150px"
                        padding="12px"
                        margin="0 15px"
                        onClick={connectAccount}>Connect</Button>
                )}

            </Flex>

        </Flex>
    );
};

export default NavBar;