import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

const BooksTableH = () => {
    const apiURL = "https://fakerapi.it/api/v1/books?_quantity=15";
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectImage, setSelectImage] = useState();

    useEffect(()=> {
        async function getData(){
             const response = await fetch(apiURL);
             const data = await response.json();
             setBooks(data.data);
             console.log(data.data);
            }
        getData();
        }, []);
    
    const handleOpen = () => {
        setSelectImage("https://s26162.pcdn.co/wp-content/uploads/sites/2/2022/05/Book.jpg");
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

        return (
        <div>
            <table id="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>AUTHOR</th>
                        <th>GENRE</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}
                        onClick = {handleOpen}
                        style = {{backgroundColor: book.id % 2 === 0 ? '#f5ea98' : '#edaa7e',
                                cursor: 'pointer',
                                }}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

        </div>
        )
} 
export default BooksTableH;