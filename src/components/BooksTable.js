import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box} from '@mui/material';


const BooksTable = () => {
    const apiURL = "https://fakerapi.it/api/v1/books?_quantity=15";
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        async function getData(){
             const response = await fetch(apiURL);
             const data = await response.json();
             setBooks(data.data);
            }
        getData();
        }, []);


    return (
        <TableContainer>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>TITLE</TableCell>
                    <TableCell>AUTHOR</TableCell>
                    <TableCell>GENRE</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}
                                style = {{backgroundColor: book.id % 2 === 0 ? '#f5ea98' : '#edaa7e',
                                cursor: 'pointer',
                                }}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default BooksTable;