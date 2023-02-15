import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registration } from '../../service'

const Signup = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loader, setloader] = useState(false)
    const toast = useToast();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cnfPassword: '',
    })
    const handleClick = () => setShow(!show)

    const postDetails = (pics) => {
        setloader(true);
        if (pics == undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const pic = new FormData();
            pic.append("file", pics);
            pic.append("upload_preset", "chat-app");
            pic.append("cloud_name", "dj3shw4tc");
            fetch("https://api.cloudinary.com/v1_1/dj3shw4tc/image/upload", {
                method: "post",
                body: pic
            })
                .then((res) => res.json())
                .then((picdata) => {
                    setData({ ...data, pic: picdata.url.toString() });
                    setloader(false);
                })
                .catch((err) => {
                    console.log(err);
                    setloader(false)
                })

        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
        }
    }

    const submitHandler = async () => {
        setloader(true);
        if (!data.email || !data.firstname || !data.password || !data.cnfPassword) {
            toast({
                title: "Please Fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            setloader(false);
            return
        }
        if (data.password != data.cnfPassword) {
            toast({
                title: "Password Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            return
        }
        await registration(data)
            .then((data) => {
                setloader(false)
                toast({
                    title: "Registration Successful",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
                setloader(false)
            })
    }
    return (
        <VStack spacing={'5'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>First Name</FormLabel>
                <Input placeholder='enter Your First Name' onChange={(e) => { setData({ ...data, firstname: e.target.value }) }} />
            </FormControl>
            <FormControl id='last-name' isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder='enter Your Last Name' onChange={(e) => { setData({ ...data, lastname: e.target.value }) }} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='enter Your Email' onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder='enter Your Password' onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                    <InputRightElement pr={'1'}>
                        <Button onClick={handleClick} h={'1.75rem'} size={'sm'} >{show ? "Hide" : "Show"}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='cnf_password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder='Confirm Password' onChange={(e) => { setData({ ...data, cnfPassword: e.target.value }) }} />
                    <InputRightElement pr={'1'}>
                        <Button onClick={handleClick} h={'1.75rem'} size={'sm'} >{show ? "Hide" : "Show"}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id='pic' isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input type={'file'} p={'1.5'} accept="image/*" onChange={(e) => { postDetails(e.target.files[0]) }} />
            </FormControl> */}
            <Button colorScheme={'blue'} width="100%" mt={'1.5'} onClick={submitHandler} isLoading={loader} >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup
