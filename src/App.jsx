import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import Home from "./routes/Home/Home";
import { Route, Routes } from "react-router-dom";
import DataEntry from "./routes/DataEntry/DataEntry";
import Books from "./routes/Books/Books";
import { cloneDeep } from "lodash";

function App() {
    const [books, setBooks] = useState([]);
    const [numberOfBooks, setNumberOfBooks] = useState();

    const updateBook = (index, bookData) => {
        const booksClone = cloneDeep(books);
        const bookToUpdate = booksClone.find((_, idx) => index === idx);
        bookToUpdate.name = bookData.bookName;
        bookToUpdate.price = bookData.bookPrice;
        bookToUpdate.author.name = bookData.authorName;
        bookToUpdate.author.email = bookData.authorEmail;
        setBooks(booksClone);
    };

    const deleteBook = (index) => {
        const booksClone = cloneDeep(books);
        booksClone.splice(index, 1);
        setBooks(booksClone);
    };

    return (
        <div className={classes.container}>
            <Routes>
                const [numberOfBooks, setNumberOfBooks] = useState();
                <Route
                    path=""
                    element={
                        <Home
                            numberOfBooks={numberOfBooks}
                            setNumberOfBooks={setNumberOfBooks}
                        />
                    }
                />
                <Route
                    path="data-entry"
                    element={
                        <DataEntry
                            setBooks={setBooks}
                            numberOfBooks={numberOfBooks}
                        />
                    }
                />
                <Route
                    path="books"
                    element={
                        <Books
                            books={books}
                            deleteBook={deleteBook}
                            updateBook={updateBook}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
