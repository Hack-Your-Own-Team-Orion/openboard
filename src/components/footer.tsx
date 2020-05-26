import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Colors from "../colors.global";

type FooterProps = {}
type FooterState = {
    currentInput: string
}

export default class Footer extends Component<FooterProps, FooterState> {

    constructor(props: FooterProps) {
        super(props);

        this.state = {
            currentInput: ""
        };

        this.handleSubmit  = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e: any): void {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }


    handleSubmit(): void {
        alert("Attempted submit:\n" + JSON.stringify(this.state))
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.root)}>
                <textarea
                    name="currentInput"
                    id="currentInput"
                    autoCorrect="false"
                    className={css(styles.textArea)}
                    placeholder={"Write a Comment"}
                    onChange={this.onInputChange}
                ></textarea>
                <button className={css(styles.button)} onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: "fixed",
        bottom: "0",
        width: "100vw",
        textAlign: "center",
        height: "60px",
        borderTop: `3px solid ${Colors.green}`,
        transition: "all .1s ease-in-out",
        fontFamily: "'Ubuntu', sans-serif",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        ":hover": {
            height: "180px"
        },

        ":active": {
            height: "180px"
        }
    },

    textArea: {
        resize: "none",
        height: "75%",
        borderRadius: 5,
        border: `1px solid ${"#BABABA"}`,
        width: "90%",
        whiteSpace: "normal",
    },

    button: {
        border: `2px solid ${Colors.green}`,
        color: Colors.green,
        marginLeft: "10px",
        cursor: "pointer",
        borderRadius: 5,
        padding: "5px 10px",
        transition: "all .1s ease-in-out",

        ":hover": {
            transform: "translateY(-2px) scale(1.05)",
            scale: "scale(1.1)"
        },
    }
});