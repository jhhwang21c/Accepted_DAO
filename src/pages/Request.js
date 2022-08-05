import {
    Box, Button, Container, Flex, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Stack
} from "@chakra-ui/react";
import './Request.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FirebaseConfig } from '../firebase_config';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link, useNavigate } from "react-router-dom";

firebase.initializeApp(FirebaseConfig);

const firestore = firebase.firestore();

const Request = ({ accounts, setAccounts, member, signIn, profileImg, setImg, nickname }) => {

    let navigate = useNavigate();

    const requestsRef = firestore.collection('request');
    const query = requestsRef.orderBy('createdAt', 'desc').limit(20);
    const [requests] = useCollectionData(query, { idField: 'id' });


    return (
        <Flex className="request" flexDirection="column" align="center">
            <Text marginTop="120px">Request List</Text>
            <Button onClick={() => navigate("/pages/CreateRequest")} width="120px" position="absolute" right="300px" top="130px">make request</Button>
            <Container fontSize="20px" fontFamily="sans-serif" marginTop="30px" backgroundColor="#E1F6FF" borderRadius="10px" height="65%">
                <Flex>
                    <Text width="600px">Title</Text>
                    <Text width="160px">Subject</Text>
                    <Text width="100px">ETH</Text>
                    <Text width="130px">Requestor</Text>
                </Flex>

                {requests && requests.map((cont, index) => <RequestList key={index} content={cont} accounts={accounts} profileImg={profileImg} />)}

            </Container>
        </Flex>
    );

};

function RequestList(props) {

    const { title, type, author, contents, eth } = props.content;
    const accounts = props.accounts;
    let navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Flex>
                <Text width="600px" onClick={onOpen}>{title}</Text>
                <Text width="160px">{type}</Text>
                <Text width="100px">{eth}</Text>
                <Text width="130px">{author}</Text>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent width="400px" height="400px" backgroundColor="white" borderRadius="20px"
                    position='fixed' top="30%" left="40%">
                    <Flex flexDirection="column" align="center">
                        <ModalHeader marginTop="40px">Request Details</ModalHeader>
                        <ModalBody marginTop="40px">
                                <Text>Title: {title}</Text>
                                <Text>ETH: {eth}</Text>
                                <Text>Requestor: {author}</Text>
                                <Box width="350px">{contents}</Box>
                        </ModalBody>

                        <ModalFooter marginTop="40px">
                            <Button  mr={10} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Accept</Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>
        </>


    )
}

export default Request;