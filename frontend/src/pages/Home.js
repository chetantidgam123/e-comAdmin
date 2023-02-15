import { Box, Button, ButtonGroup, Divider, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AddtoCart, getProductList } from '../service'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import '../CSS/home.css'
const Home = () => {
    const [products, setProducts] = useState([])
    const toast = useToast()
    useEffect(() => {
        ProductsList()
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

    const addtoCart = async (id)=>{
        await AddtoCart(id)
        .then((data)=>{
            if(data.data.code==200){
                toast({
                    title: data.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })
            }else{
                toast({
                    title: data.data.message,
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })

            }
        }).catch((err)=>{
            toast({
                title: err.error.message,
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
            {products.map((e, i) => {
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
                        <Button onClick={()=>{addtoCart(e._id)}} variant='solid' colorScheme='blue'>
                        Add to cart
                        </Button>
                        <Button textAlign={'end'} variant='solid' colorScheme='blue'>
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
