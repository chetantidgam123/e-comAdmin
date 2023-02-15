import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '../CSS/navbar.css';
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../Context/AuthProvider';
import { getUserCart, updateQty } from '../service';
const Navbar = () => {
    const { user } = AuthState()
    const navigate = useNavigate()
    const [name, setName] = useState('User')
    const [cart, setCart] = useState([])
    var [total, settotal] = useState(0)


    useEffect(() => {
        setName(user?.name)
        getUserCartItem()
    }, [user])

    const  getUserCartItem = async ()=>{
        if(user){
           await  getUserCart()
            .then((res)=>{
                setCart(res.data.cartItem)
                totalCal(res.data.cartItem)
            })
        }else{
            setCart([])
        }
    }
const totalCal =async (arr)=>{
    console.log(arr);
   let total1 = 0
   await arr.map((ele)=>{
    total1 += (ele.Qty*ele.price) 
    return ele
   })
    settotal(total1)
}
    const updateItem = async (type,id,qty)=>{
        if(type=='inc'){
            let Qty = qty+1
            await updateQty(id,{"Qty": Qty})
            .then((res)=>{
                getUserCartItem()
            })
        }
        if(type=='dec'){
            let Qty = qty-1
            await updateQty(id,{"Qty": Qty})
            .then((res)=>{
                getUserCartItem()
            })
        }
        if(type=='rem'){
            await updateQty(id,{"Qty": qty})
            .then((res)=>{
                getUserCartItem()
            })
        }
    }

    return (
        <>
            <Box className='navbar'>
                <Box>
                    <Button onClick={() => { navigate('/') }}>
                        <FaHome></FaHome>
                    </Button>
                </Box>
                <Box>
                    <Menu className='menulist'>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} me={1}>
                            {name}
                        </MenuButton>
                        <MenuList >
                            {user ? <MenuItem>Logout</MenuItem> : <MenuItem onClick={() => { navigate('/login') }}>Login</MenuItem>}
                        </MenuList>
                    </Menu>
                    <Button onClick={getUserCartItem} className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <FaShoppingCart></FaShoppingCart>
                    </Button>
                </Box>
                <div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Cart Items</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                            <Box>
                            {
                              cart.map((el, index) => {
                                return (
                                <Box key={index} className="cartList d-flex">
                                    <Image src={el.image} w={'25%'} h={'60px'} me={2} />
                                     <Box w={'65%'} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: '14px' }}>
                                            <p style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif", fontWeight: 500 ,textWrap:"wrap" }}> {el.title}</p>
                                        <Box style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>  
                                             <span><b>Price</b>  : $ {(Number(el.Qty) * Number(el.price))}</span>
                                        </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                      <Box display="flex" gap="7px" borderRadius="6px" alignItems="center" fontSize="21px" border="none" w="73px" color="black" justifyContent="space-around" >
                                        <button className='CartButton' onClick={() => {updateItem('dec',el.cartId,el.Qty) }} style={{ border: "none", fontSize: "23px", width: "26px", height: "32px", textAlign: "center" }} > -</button>
                                        <span style={{ border: "none", fontSize: "18px", color: "black", paddingTop: "4px" }}> {el.Qty} </span> 
                                        <button className='CartButton' onClick={() => {updateItem('inc',el.cartId,el.Qty) }} style={{ fontSize: "23px", width: "26px", height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>+</button> 
                                        </Box>
                                      <Button className='removebtn' style={{ borderRadius: "2px", padding: '1px', fontSize: "14px" }} onClick={() => {updateItem('rem',el.cartId,0)  }}>REMOVE</Button> </Box>
                                      </Box>
                                </Box>
                                )
                              })
                            }
                          </Box>
                          <Box display={'flex'} justifyContent="space-around">
                            <Text fontSize={25} fontWeight='bold'>Total</Text>
                            <Text fontSize={25} fontWeight='bold'>{total}</Text>
                          </Box>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Navbar
