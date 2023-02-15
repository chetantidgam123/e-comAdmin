import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Radio,
    Stack,
    Text,
    GridItem,
    Grid,
    useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom'
import { AddtoCart, getProdutDetails, getUserCart } from '../service'
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { AuthState } from '../Context/AuthProvider';
const ProductDetails = () => {
    const { user } = AuthState()
    const params = useParams()
    const toast = useToast()
    const [disable, setDisable] = useState(false);
    const [cart, setCart] = useState([])
    const [prodData, setprodData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        getDetails(params.id)
        getUserCartItem()
    }, []);

    const getUserCartItem = async () => {
        if (user) {
            await getUserCart()
                .then((res) => {
                    setCart(res.data.cartItem)
                    disabelCart()
                })
        } else {
            setCart([])
        }
    }
    const disabelCart = () => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].cartId == params.id) {
                setDisable(true);
                break;
            }
        }
    }
    const getDetails = async (id) => {
        await getProdutDetails(id)
            .then((res) => {
                setprodData(res.data.data)
            })
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
    return (
        <div>
            <Flex className="makeColumn" justifyContent={"space-between"} m={10}>
                <Box className="innerBox" w="43%">
                    <Image height={720} className='lgImage' src={prodData.image} alt="NA" />
                </Box>
                <Box className="innerBox scroolDiv" w="40%">
                    <Stack spacing={6}>
                        <Text fontSize={20}>{prodData.title}</Text>
                        <Text fontSize={20}>$ {prodData.price}</Text>
                        <hr className="hr"></hr>
                        <Box>
                        </Box>
                        <Box textAlign={"center"} border={"1px"}>
                            <Button disabled={disable} w="100%" onClick={() => { addtoCart(prodData._id) }} >{disable ? 'Already Added' : 'Add To Cart'}</Button>
                        </Box>
                        <Box textAlign={"center"} border={"1px"} bgColor={"#5a31f4"}>
                            <Flex justifyContent={"center"} alignItems={"center"} py={1.5}>
                                <Text color={"white"} fontSize={"sm"}>
                                    Buy with
                                </Text>
                                <Text
                                    mx={2}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Shop
                                </Text>
                                <Button onClick={() => { navigate('/payment') }} size={"xs"}>Pay</Button>
                            </Flex>
                        </Box>
                        <Box textAlign={"center"}>
                            <Link fontSize={"sm"}>More payment options</Link>
                        </Box>
                        <Box>
                            <Text fontSize={'2xl'} fontWeight={'bold'}>Stock Online</Text>
                            <Box
                                cursor={"pointer"}
                                textAlign={"center"}
                                py="2"
                                border={"1px"}
                            >
                                <Text>CHECK STORE AVAILABILITY</Text>
                            </Box>
                        </Box>
                        <Flex justifyContent={"space-around"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <FaFacebookF />
                                <Text>Share</Text>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                                <FaPinterestP />
                                <Text>Pin it</Text>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                                <FaTwitter />
                                <Text>Tweet</Text>
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>
        </div>
    )
}

export default ProductDetails
