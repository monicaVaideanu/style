import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, Button} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const BooksMaterialTable = () => {
    const apiURL = "https://fakerapi.it/api/v1/books?_quantity=15";
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectImage, setSelectImage] = useState();

    useEffect(()=> {
        async function getData(){
             const response = await fetch(apiURL);
             const data = await response.json();
             setBooks(data.data);
            }
        getData();
        }, []);

    const handleOpen = (e) => {
        e.stopPropagation();
        setSelectImage("https://s26162.pcdn.co/wp-content/uploads/sites/2/2022/05/Book.jpg");
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const deleteRow = (id, e) =>{
        e.stopPropagation();
        let updatedBooks = books.filter(book => book.id !== id);
        updatedBooks = updatedBooks.map((book, index) => ({ ...book, id: index + 1 }));
        setBooks(updatedBooks);
    }

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
                    <TableCell>ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}
                                onClick={handleOpen}
                                style = {{backgroundColor: book.id % 2 === 0 ? '#f5ea98' : '#edaa7e',
                                cursor: 'pointer',
                                }}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={(e)=> deleteRow(book.id,e)}
                                    > DELETE ROW
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <Modal
                open = {open}
                onClose = {handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >    
                <Box sx={style}>
                {selectImage && <img src={selectImage} alt="Book Cover" style={{ width: '100%' }} />}
                </Box>
            </Modal>
            </Table>
        </TableContainer>
    )

}

export default BooksMaterialTable;