import { useEffect, useState } from "react";
import classes from "./Books.module.scss";
import { BsFillEmojiTearFill } from "react-icons/bs";

const Books = ({ books, deleteBook, updateBook }) => {
    const [bookName, setBookName] = useState({ value: "", feedBack: null });
    const [bookPrice, setBookPrice] = useState({ value: "", feedBack: null });
    const [authorName, setAuthorName] = useState({ value: "", feedBack: null });
    const [authorEmail, setAuthorEmail] = useState({
        value: "",
        feedBack: null,
    });

    const [selected, setSelected] = useState();

    const [inEditMode, setInEditMode] = useState(false);

    return (
        <div className={classes.container}>
            <div className={classes.tableWrapper}>
                <table className={classes.f1Table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Author Name</th>
                            <th>Aurthor E-mail</th>
                            {books.length ? (
                                <>
                                    <th></th>
                                    <th></th>
                                </>
                            ) : null}
                        </tr>
                    </thead>

                    <tbody>
                        {books.length ? (
                            books.map((book, index) => (
                                <tr key={index}>
                                    <td className={classes.customTD}>
                                        {inEditMode && index === selected ? (
                                            <input
                                                id="Book Name"
                                                className={[
                                                    classes.input,
                                                    bookName.feedBack
                                                        ? classes.invalid
                                                        : "",
                                                ].join(" ")}
                                                type="text"
                                                value={bookName.value}
                                                onChange={(e) => {
                                                    setBookName({
                                                        ...bookName,
                                                        value: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            book.name
                                        )}
                                    </td>

                                    <td className={classes.customTD}>
                                        {inEditMode && index === selected ? (
                                            <input
                                                id="Book Price"
                                                className={[
                                                    classes.input,
                                                    bookPrice.feedBack
                                                        ? classes.invalid
                                                        : "",
                                                ].join(" ")}
                                                type="text"
                                                placeholder=" "
                                                value={bookPrice.value}
                                                onChange={(e) => {
                                                    setBookPrice({
                                                        ...bookPrice,
                                                        value: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            book.price
                                        )}
                                    </td>
                                    <td>
                                        {inEditMode && index === selected ? (
                                            <input
                                                id="Author Name"
                                                className={[
                                                    classes.input,
                                                    authorName.feedBack
                                                        ? classes.invalid
                                                        : "",
                                                ].join(" ")}
                                                type="text"
                                                placeholder=" "
                                                value={authorName.value}
                                                onChange={(e) => {
                                                    setAuthorName({
                                                        ...authorName,
                                                        value: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            book.author.name
                                        )}
                                    </td>
                                    <td>
                                        {inEditMode && index === selected ? (
                                            <input
                                                id="Author Email"
                                                className={[
                                                    classes.input,
                                                    authorEmail.feedBack
                                                        ? classes.invalid
                                                        : "",
                                                ].join(" ")}
                                                type="text"
                                                placeholder=" "
                                                value={authorEmail.value}
                                                onChange={(e) => {
                                                    setAuthorEmail({
                                                        ...authorEmail,
                                                        value: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            book.author.email
                                        )}
                                    </td>

                                    {inEditMode && index === selected ? (
                                        <>
                                            <td className={classes.save}>
                                                <button
                                                    onClick={() => {
                                                        setInEditMode(false);
                                                        updateBook(index, {
                                                            bookName:
                                                                bookName.value,
                                                            bookPrice:
                                                                bookPrice.value,
                                                            authorName:
                                                                authorName.value,
                                                            authorEmail:
                                                                authorEmail.value,
                                                        });
                                                    }}
                                                >
                                                    Save
                                                </button>
                                            </td>
                                            <td className={classes.cancel}>
                                                <button
                                                    onClick={() =>
                                                        setInEditMode(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className={classes.edit}>
                                                <button
                                                    onClick={() => {
                                                        setInEditMode(true);
                                                        setSelected(index);
                                                        setBookName({
                                                            ...bookName,
                                                            value: book.name,
                                                        });
                                                        setBookPrice({
                                                            ...bookPrice,
                                                            value: book.price,
                                                        });
                                                        setAuthorName({
                                                            ...authorName,
                                                            value: book.author
                                                                .name,
                                                        });
                                                        setAuthorEmail({
                                                            ...authorEmail,
                                                            value: book.author
                                                                .email,
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className={classes.delete}>
                                                <button
                                                    onClick={() =>
                                                        deleteBook(index)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr className={classes.emptyTable}>
                                <td colSpan={4}>
                                    looks like nothing here
                                    <BsFillEmojiTearFill
                                        className={classes.cry}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Books;
