import { useEffect, useRef, useState } from "react";
import classes from "./DataEntry.module.scss";
import { Book } from "../../classes/book";
import { Author } from "../../classes/author";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

const DataEntry = ({ setBooks, numberOfBooks }) => {
    const [bookName, setBookName] = useState({ value: "", feedBack: null });
    const [bookPrice, setBookPrice] = useState({ value: "", feedBack: null });
    const [authorName, setAuthorName] = useState({ value: "", feedBack: null });
    const [authorEmail, setAuthorEmail] = useState({
        value: "",
        feedBack: null,
    });

    const [currentBook, setCurrentBook] = useState(1);

    const navigate = useNavigate();

    const addBook = () => {
        setBooks((prevBooks) => {
            const booksClone = cloneDeep(prevBooks);
            booksClone.push(
                new Book(
                    bookName.value,
                    bookPrice.value,
                    new Author(authorName.value, authorEmail.value)
                )
            );
            return booksClone;
        });
    };

    const resetForm = () => {
        setBookName({ value: "", feedBack: null });
        setBookPrice({ value: "", feedBack: null });
        setAuthorName({ value: "", feedBack: null });
        setAuthorEmail({ value: "", feedBack: null });
    };

    const validateForm = () => {
        if (!/^[A-Za-z0-9\s-_,.;:()]+$/.test(bookName.value))
            setBookName({ ...bookName, feedBack: "invalid" });
        else setBookName({ ...bookName, feedBack: "" });

        if (!/^(\d*\.\d{2}|\d+)$/.test(bookPrice.value))
            setBookPrice({ ...bookPrice, feedBack: "invalid" });
        else setBookPrice({ ...bookPrice, feedBack: "" });

        if (!/^[A-Za-z\s'-]+$/.test(authorName.value))
            setAuthorName({ ...authorName, feedBack: "invalid" });
        else setAuthorName({ ...authorName, feedBack: "" });

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(authorEmail.value))
            setAuthorEmail({ ...authorEmail, feedBack: "invalid" });
        else setAuthorEmail({ ...authorEmail, feedBack: "" });
    };



    const mount = useRef(true);
    useEffect(() => {
        if (mount.current) mount.current = false;
        else {

            // it makes sure feedback is only set by validateForm() not by resetForm()
            if (currentBook != 1 && bookName.feedBack == null) return;
            ////////////////////////////////////////////////////////////

            let totalFeedBack = !(
                bookName.feedBack +
                bookPrice.feedBack +
                authorName.feedBack +
                authorEmail.feedBack
            );

            if (totalFeedBack) {
                addBook();
                if (currentBook == numberOfBooks) {
                    navigate("/books");
                    return;
                }
                setCurrentBook((prev) => ++prev);
                resetForm();
            }
        }
    }, [
        bookName.feedBack,
        bookPrice.feedBack,
        authorName.feedBack,
        authorEmail.feedBack,
    ]);





    return (
        <div className={classes.container}>
            <form
                autoComplete="off"
                className={classes.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    validateForm();
                }}
            >
                <div className={classes.title}>Hello again!</div>
                <div className={classes.subtitle}>
                    <span>Let's add you a book! </span>
                    <span className={classes.currentBook}>{`${currentBook}/${
                        numberOfBooks ?? 1
                    }`}</span>
                </div>

                <div
                    className={[classes.inputContainer, classes.ic1].join(" ")}
                >
                    <input
                        id="Book Name"
                        className={[
                            classes.input,
                            bookName.feedBack ? classes.invalid : "",
                        ].join(" ")}
                        type="text"
                        placeholder=" "
                        value={bookName.value}
                        onChange={(e) => {
                            setBookName({
                                ...bookName,
                                value: e.target.value,
                            });
                        }}
                    />
                    <div className={classes.cut}></div>
                    <label htmlFor="Book Name" className={classes.placeholder}>
                        Book Name
                    </label>
                    <span className={classes.feedback}></span>
                </div>

                <div
                    className={[classes.inputContainer, classes.ic2].join(" ")}
                >
                    <input
                        id="Book Price"
                        className={[
                            classes.input,
                            bookPrice.feedBack ? classes.invalid : "",
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
                    <div className={classes.cut}></div>
                    <label htmlFor="Book Price" className={classes.placeholder}>
                        Book Price in USD
                    </label>
                    <span className={classes.feedback}></span>
                </div>

                <div
                    className={[classes.inputContainer, classes.ic1].join(" ")}
                >
                    <input
                        id="Author Name"
                        className={[
                            classes.input,
                            authorName.feedBack ? classes.invalid : "",
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
                    <div className={classes.cut}></div>
                    <label
                        htmlFor="Author Name"
                        className={classes.placeholder}
                    >
                        Author Name
                    </label>
                    <span className={classes.feedback}></span>
                </div>

                <div
                    className={[classes.inputContainer, classes.ic2].join(" ")}
                >
                    <input
                        id="Author E-mail"
                        className={[
                            classes.input,
                            authorEmail.feedBack ? classes.invalid : "",
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
                    <div className={classes.cut}></div>
                    <label
                        htmlFor="Author E-mail"
                        className={classes.placeholder}
                    >
                        Author E-mail
                    </label>
                    <span className={classes.feedback}></span>
                </div>

                <button type="text" className={classes.submit}>
                    Add
                </button>
            </form>
        </div>
    );
};

export default DataEntry;
