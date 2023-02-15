import React, { useState } from 'react'
import "../CSS/PaymentPage.css"
import '../CSS/navbar.css';
import { useFormik } from 'formik'
import { Box, Button, Center, Heading, Image, Input, Link, Select, Text } from "@chakra-ui/react"
import { signUpSchema } from './Auth/schemas'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

} from '@chakra-ui/react'
import { useEffect } from 'react'
import Carddetails from './Carddetails'
import { AuthState } from '../Context/AuthProvider'
import { getUserCart, updateQty } from '../service';
const Payment = () => {
    const [cart, setCart] = useState([])
    var [total, settotal] = useState(0)
    const { user } = AuthState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const Formik = useFormik({

        initialValues: {
            email: "",
            country: "",
            first_name: "",
            last_name: "",
            comapany: "",
            appartment: "",
            address: "",
            city: "",
            region: "",
            Zip: "",
            phone: ""
        },
        validationSchema: signUpSchema,
        onSubmit: values => {
            onOpen()
        }
    })
    useEffect(() => {
        getUserCartItem()
    }, [])

    const getUserCartItem = async () => {
        if (user) {
            await getUserCart()
                .then((res) => {
                    setCart(res.data.cartItem)
                    totalCal(res.data.cartItem)
                })
        } else {
            setCart([])
        }
    }
    const totalCal = async (arr) => {
        let total1 = 0
        await arr.map((ele) => {
            total1 += (ele.Qty * ele.price)
            return ele
        })
        settotal(total1)
    }
    const updateItem = async (type, id, qty) => {
        if (type == 'inc') {
            let Qty = qty + 1
            await updateQty(id, { "Qty": Qty })
                .then((res) => {
                    getUserCartItem()
                })
        }
        if (type == 'dec') {
            let Qty = qty - 1
            await updateQty(id, { "Qty": Qty })
                .then((res) => {
                    getUserCartItem()
                })
        }
        if (type == 'rem') {
            await updateQty(id, { "Qty": qty })
                .then((res) => {
                    getUserCartItem()
                })
        }
    }
    return (
        <div className='payment_div'>
            <Box className='left_box'>
                <form onSubmit={Formik.handleSubmit}>
                    <Center pt="17px"> <Heading fontSize={"25px"} fontWeight="500"  >Shipping Address Details</Heading></Center>
                    <Center> <p style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}>  Thankyou for choosing the Shopdress .Here the payment page  where you <br />have to fill some details for confirming your order</p></Center>
                    <hr />
                    <Box className='Input_papa_box'>
                        <div className='contact_info_box'>
                            <h6>Contact information</h6>
                            <p> Already have an account?<span><Link>Log in</Link></span></p>
                        </div>

                        <Input placeholder='* Email' className='input' focusBorderColor={"blue"} size='lg' name='email' value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                        {Formik.errors.email && Formik.touched.email ? <p className='errors'>{Formik.errors.email}</p> : null}
                        <br />
                        <br />
                        <label>Shipping address</label>
                        <Select placeholder='Country/region' size='lg' m={"10px"} name='country' value={Formik.values.country} onChange={Formik.handleChange}>
                            <option value='option1'>India</option>
                            <option value='option2'>China</option>
                            <option value='option3'>Usa</option>
                        </Select>
                        {Formik.errors.country && Formik.touched.country ? <p className='errors'>{Formik.errors.country}</p> : null}
                        <Box className='input_flex_boxes'>
                            <Input placeholder='*First Name' size='lg' name='first_name' value={Formik.values.first_name} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                            <Input placeholder='Last Name' size='lg' name='last_name' value={Formik.values.last_name} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                        </Box >
                        <Box className='input_flex_boxes'>
                            {Formik.errors.first_name && Formik.touched.first_name ? <p className='errors'>{Formik.errors.first_name}</p> : null}
                            {Formik.errors.last_name && Formik.touched.last_name ? <p className='errors'>{Formik.errors.last_name}</p> : null}
                        </Box>
                        <Input placeholder='Company(optional)' className='input' size='lg' name='comapany' value={Formik.values.comapany} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                        {Formik.errors.comapany && Formik.touched.comapany ? <p className='errors'>{Formik.errors.comapany}</p> : null}
                        <Input placeholder='*Address' className='input' size='lg' name='address' value={Formik.values.address} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                        {Formik.errors.address && Formik.touched.address ? <p className='errors'>{Formik.errors.address}</p> : null}
                        <Input placeholder='Appartment,suite,etc(optional)' className='input' size='lg' name='appartment' value={Formik.values.appartment} onChange={Formik.handleChange} onBlur={Formik.onBlur} />
                        {Formik.errors.appartment && Formik.touched.appartment ? <p className='errors'>{Formik.errors.appartment}</p> : null}
                        <Box className='input_flex_boxes'>
                            <Input placeholder='*City' size='lg' name='city' value={Formik.values.city} onBlur={Formik.onBlur} onChange={Formik.handleChange} />
                            <Select placeholder='Country/region' size='lg' name='region' value={Formik.values.region} onBlur={Formik.onBlur} onChange={Formik.handleChange}>
                                <option value='option1'>India</option>
                                <option value='option2'>China</option>
                                <option value='option3'>Usa</option>
                            </Select>
                            <Input placeholder='*ZIP code' size='lg' type="number" name='Zip' value={Formik.values.Zip} onBlur={Formik.onBlur} onChange={Formik.handleChange} />
                        </Box>
                        <Box className='input_flex_boxes'>
                            {Formik.errors.city && Formik.touched.city ? <p className='errors'>{Formik.errors.city}</p> : null}
                            {Formik.errors.region && Formik.touched.region ? <p className='errors'>{Formik.errors.region}</p> : null}
                            {Formik.errors.Zip && Formik.touched.Zip ? <p className='errors'>{Formik.errors.Zip}</p> : null}
                        </Box>
                        <Input placeholder='*Phone' className='input' size='lg' name='phone' type="number  " value={Formik.values.phone} onBlur={Formik.onBlur} onChange={Formik.handleChange} />
                        {Formik.errors.phone && Formik.touched.phone ? <p className='errors'>{Formik.errors.phone}</p> : null}
                    </Box>
                    <Box className='last_box'>
                        <Button bg={"black"} color="white" width={"190px"} m={3} p={7} type="submit">Continue</Button>
                    </Box>
                </form>
                <Button display={"none"} onClick={onOpen}></Button>

                <Modal isOpen={isOpen} onClose={onClose} size={''}>
                    <ModalOverlay />
                    <ModalContent width={"600px"} maxHeight={"500px"}>
                        <ModalCloseButton />
                        <ModalBody height={"800px"}>
                            <Carddetails w={500} m="auto" />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>











            {/* right box */}
            <Box className='right_box' w="26%" marginTop="12px" p={2}>
                {
                    cart.map((el, index) => {
                        return (
                            <Box key={index} className="cartList d-flex">
                                <Image src={el.image} w={'25%'} h={'60px'} me={2} />
                                <Box w={'65%'} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: '14px' }}>
                                    <p style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif", fontWeight: 500, textWrap: "wrap" }}> {el.title}</p>
                                    <Box style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                                        <span><b>Price</b>  : $ {(Number(el.Qty) * Number(el.price))}</span>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" gap="7px" borderRadius="6px" alignItems="center" fontSize="21px" border="none" w="73px" color="black" justifyContent="space-around" >
                                            <button className='CartButton' onClick={() => { updateItem('dec', el.cartId, el.Qty) }} style={{ border: "none", fontSize: "23px", width: "26px", height: "32px", textAlign: "center" }} > -</button>
                                            <span style={{ border: "none", fontSize: "18px", color: "black", paddingTop: "4px" }}> {el.Qty} </span>
                                            <button className='CartButton' onClick={() => { updateItem('inc', el.cartId, el.Qty) }} style={{ fontSize: "23px", width: "26px", height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>+</button>
                                        </Box>
                                        <Button className='removebtn' style={{ borderRadius: "2px", padding: '1px', fontSize: "14px" }} onClick={() => { updateItem('rem', el.cartId, 0) }}>REMOVE</Button> </Box>
                                </Box>
                            </Box>

                        )
                    })
                }
                <Box display={'flex'} justifyContent="space-around">
                    <Text fontSize={25} fontWeight='bold'>Total</Text>
                    <Text fontSize={25} fontWeight='bold'>${total}</Text>
                </Box>
            </Box>
        </div>
    )
}

export default Payment
