import { Box, Button, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CSS/PaymentPage.css"
const PaymetSuccess = () => {
  const navigation = useNavigate()
  useEffect(() => {
    scrollToTop();
    setTimeout(() => {
      navigation('/')
    }, 5000);

  }, [])
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };
  return (
    <div style={{ textAlign: "center", gap: "50px" }} className="success">
      <Center>
        <Box>
          <img style={{ width: "600px", height: "270px" }} src='https://i.pinimg.com/originals/69/94/87/699487bb246152a16ccedd1a18814b4e.gif' />
          <Heading color={"#1e656c"} m="10px" fontSize={"5xl"}>Payment Successful</Heading>
          <p>Thankyou for choosing <span style={{ color: "black", fontSize: "19px", fontWeight: "bolder" }}>All In One</span></p>
          <Button bg={"none"} border="1px solid #1e656c" color="#1e656c" p={"30px"} m={"30px"} fontSize="2xl">Continue Shopping</Button>
        </Box>
      </Center>
    </div>
  )
}

export default PaymetSuccess