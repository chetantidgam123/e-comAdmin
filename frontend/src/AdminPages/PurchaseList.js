import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getPurchaseList } from '../service'

const PurchaseList = () => {
    const [list, setlist] = useState([])
    useEffect(() => {
        getlist()
    }, [])
    const getlist = async () => {
        await getPurchaseList()
            .then((res) => {
                setlist(res.data.data)
            })
    }

    return (
        <div>
            <TableContainer w={'80%'} m={'auto'}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Purchased Product List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Sr No</Th>
                            <Th>Name</Th>
                            <Th>email</Th>
                            <Th>Product list</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            list?.map((ele, i) => {
                                return (
                                    <Tr key={ele._id}>
                                        <Td>{i + 1}</Td>
                                        <Td>{ele.user.name}</Td>
                                        <Td>{ele.user.email}</Td>
                                        <Td >
                                            <ul>
                                                {
                                                    ele?.purchesItem.map((e, j) => {
                                                        return (
                                                            <>
                                                                <li key={j}>{e.title}</li>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Td>
                                    </Tr>
                                )
                            })


                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PurchaseList
