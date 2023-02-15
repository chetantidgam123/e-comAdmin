import { Box, Button, ButtonGroup, Divider, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AddtoCart, getProductList, getProdutDetails, removeProd, updateProd } from '../service'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import '../CSS/home.css'
import { AuthState } from '../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const { user } = AuthState()
    const [products, setProducts] = useState([])
    const toast = useToast()
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            ProductsList()
        }, 1000);
    }, [])

    const ProductsList = async () => {
        await getProductList()
            .then(async (result) => {
                let responce = await result.data;
                setProducts(responce)
            }).catch((err) => {
                toast({
                    title: err.message,
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })
            });
    }

    const addtoCart = async (id) => {
        if (!user) {
            toast({
                title: "Login Required",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            return
        }
        await AddtoCart(id)
            .then((data) => {
                if (data.data.code == 200) {
                    toast({
                        title: data.data.message,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    })
                } else {
                    toast({
                        title: data.data.message,
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    })

                }
            }).catch((err) => {
                toast({
                    title: err.error.message,
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })
            })
    }

    const prodDetails = async (id) => {
        if (!user) {
            toast({
                title: "Login Required",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            return
        }
        navigate('/product/' + id)

    }
    const RemoveProd = async (id) => {
        await removeProd(id).then((res) => {
            toast({
                title: res.data.message,
                status: "succcess",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })

        }).catch((err) => {
            toast({
                title: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
        })
    }
    return (
        <>
            <Box className='prodList'>
                {products?.map((e, i) => {
                    return (
                        <Card key={i} maxW='sm'>
                            <CardBody className='prodCardBody'>
                                <Image
                                    src={e.image}
                                    alt={e.title}
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{e.title}</Heading>
                                    <Text color='blue.600' fontSize='2xl'>
                                        ${e.price}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup>
                                    {
                                        user?.role == 'admin' ? <><Button variant='solid' colorScheme='blue' onClick={() => { navigate('/admin/editProd/' + e._id) }} >Edit</Button> <Button variant='solid' colorScheme='blue' onClick={() => { RemoveProd(e._id) }}>remove</Button></> : <Button onClick={() => { addtoCart(e._id) }} variant='solid' colorScheme='blue'>
                                            Add to cart
                                        </Button>
                                    }

                                    <Button onClick={() => { prodDetails(e._id) }} textAlign={'end'} variant='solid' colorScheme='blue'>
                                        View
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>

                    )


                })}
            </Box>

        </>
    )
}

export default Home
