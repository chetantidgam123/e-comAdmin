import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
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
const Navbar = () => {

    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    return (
        <>
            <Box className='navbar'>
                <Box>
                    <Button>
                        <FaHome></FaHome>
                    </Button>
                </Box>
                <Box>
                    {/* <Box className="dropdown" me={1}>
                        <Button onClick={myFunction} className="dropbtn">
                            <FaUser onClick={myFunction} size={22} cursor="pointer" />
                        </Button>
                        <Box p={'10px'} textAlign={'center'} id="myDropdown" className="dropdown-content">
                            <Text fontSize={'lg'} color={'green.500'}>Hi</Text>
                        </Box>
                    </Box> */}
                    <Menu className='menulist'>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} me={1}>
                            AMAN
                        </MenuButton>
                        <MenuList >
                            <MenuItem>Login</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button>
                        <FaShoppingCart></FaShoppingCart>
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Navbar
