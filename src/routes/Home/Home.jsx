import { useNavigate } from "react-router-dom";
import classes from "./Home.module.scss";
import React, { useState } from "react";

const Home = ({ numberOfBooks, setNumberOfBooks }) => {
    const navigate = useNavigate();
    return (
        <div className={classes.container}>
            <form
            autoComplete="off"
                className={classes.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (Number(numberOfBooks)) navigate("/data-entry");
                }}
            >
                <div className={classes.title}>Hi Sir!</div>
                <div className={classes.subtitle}>
                    How many books you wanna add?
                </div>
                <div
                    className={[classes.inputContainer, classes.ic2].join(" ")}
                >
                    <input
                        id="Number Of Books"
                        className={classes.input}
                        type="text"
                        placeholder=" "
                        onChange={(e) => setNumberOfBooks(e.target.value)}
                        onKeyDown={(e) => {
                            if (isNaN(e.key) && e.key !== "Backspace")
                                e.preventDefault();
                        }}
                        maxLength={2}
                    />
                    <div className={classes.cut}></div>
                    <label
                        htmlFor="Number Of Books"
                        className={classes.placeholder}
                    >
                        Number Of Books
                    </label>
                </div>

                <button type="text" className={classes.submit}>
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default Home;
