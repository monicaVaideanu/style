import React, {useEffect, useState} from 'react';

const BooksTableH = () => {
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
        )
} 
export default BooksTableH;