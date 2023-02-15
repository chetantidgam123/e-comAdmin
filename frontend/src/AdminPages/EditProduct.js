import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Textarea, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProdutDetails, updateProd } from '../service'
const EditProduct = () => {
    const navigate = useNavigate()
    const [loader, setloader] = useState(false)
    const toast = useToast();
    const { id } = useParams()
    const [data, setData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    })

    useEffect(() => {
        getDetails(id)
    }, [])

    const getDetails = async (id) => {
        await getProdutDetails(id)
            .then((res) => {
                setData(res.data.data)
            })
    }

    const submitHandler = async () => {
        setloader(true);
        if (!data.title || !data.price || !data.description) {
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
        await updateProd(id, data)
            .then((data) => {
                setloader(false)
                toast({
                    title: "Product Updated Succesful",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                })
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setloader(false)
            })
    }
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
                    setData({ ...data, image: picdata.url.toString() });
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
    return (
        <div>
            <VStack spacing={'5'} w={"50%"} margin={'auto'} mt={2}>
                <FormControl id='first-name' isRequired>
                    <FormLabel>title</FormLabel>
                    <Input placeholder='enter title' value={data.title} onChange={(e) => { setData({ ...data, title: e.target.value }) }} />
                </FormControl>
                <FormControl id='Price' isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input placeholder='enter Price' value={data.price} onChange={(e) => { setData({ ...data, price: e.target.value }) }} />
                </FormControl>
                <FormControl id='category' isRequired>
                    <FormLabel>Category</FormLabel>
                    <Input placeholder='enter Category' value={data.category} onChange={(e) => { setData({ ...data, category: e.target.value }) }} />
                </FormControl>
                <FormControl id='description' isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder='enter description' value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
                </FormControl>
                <FormControl id='pic' isRequired>
                    <FormLabel>Upload Your Picture</FormLabel>
                    <Input type={'file'} p={'1.5'} accept="image/*" onChange={(e) => { postDetails(e.target.files[0]) }} />
                </FormControl>
                <Button colorScheme={'blue'} width="100%" mt={'1.5'} onClick={submitHandler} isLoading={loader} >
                    Add Product
                </Button>
            </VStack>
        </div>
    )
}

export default EditProduct
