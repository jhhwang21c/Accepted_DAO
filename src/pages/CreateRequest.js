import { Button, Text, Input, Stack, Textarea, Select } from '@chakra-ui/react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FirebaseConfig } from '../firebase_config';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import './Profile.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


firebase.initializeApp(FirebaseConfig);

const firestore = firebase.firestore();

const CreateRequest = ({ accounts, setAccounts, member, signIn, profileImg, setImg }) => {

    const requestRef = firestore.collection('request');

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [contents, setContents] = useState('');
    
    let navigate = useNavigate();

    const SaveRequest = async (e) => {
        e.preventDefault();

        await requestRef.add({
            uid: accounts[0],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            title: title,
            type: type,
            contents: contents
        })

        alert("successfully saved!")
        navigate("/pages/Request")

    };

    return (
        <div className='Profile'>
            <Text color='tomato'>Create Request</Text>

            <Stack spacing={10} marginTop='20px' marginBottom='20px'>
                <Input variant='outline' placeholder="Title" size='md' value={title} onChange={(e) => setTitle(e.target.value)} />

                <Select placeholder='Select option' onChange={(e) => setType(e.target.value)} value={type} >
                    <option value='College Counseling'>College Counseling</option>
                    <option value='SAT Math'>SAT Math</option>
                    <option value='Computer Science'>Computer Science</option>
                    <option value='English'>English</option>
                </Select>
                
                <Textarea placeholder="Contents" size='md' value={contents} onChange={(e) => setContents(e.target.value)} />
            </Stack>

            <Button onClick={SaveRequest} disabled={!contents}>Save</Button>
        </div>
    );
};

export default CreateRequest;