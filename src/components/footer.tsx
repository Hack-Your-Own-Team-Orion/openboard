import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Colors from "../colors.global";
import { Thread } from "../interface";
import { colorFromUsername } from "../localFunctions/UsernameFunctions";
import { v4 as uuidv4 } from "uuid";
import { addThread } from "../dataFunctions";

type FooterProps = {
    userHash: string,
    page: string,
    requestRefresh: Function
}
type FooterState = {
    currentInput: string,
    currentTitleInput: string
}

export default class Footer extends Component<FooterProps, FooterState> {

    constructor(props: FooterProps) {
        super(props);

        this.state = {
            currentInput: "",
            currentTitleInput: ""
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

    async handleSubmit(): Promise<void> {
        let newThread: Thread = {
            id: uuidv4(),
            title: this.state.currentTitleInput,
            content: this.state.currentInput,
            userhash: this.props.userHash,
            color: colorFromUsername(this.props.userHash),
            replies: [],
            level: 1,
        }
        await addThread(this.props.page, newThread);
        this.props.requestRefresh();
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.root)}>
                <div className={css(styles.inputs)}>
                    <input
                        type="text"
                        name="currentTitleInput"
                        id="currentTitleInput"
                        className={css(styles.titleInput)}
                        placeholder="Write a new Thread - Title"
                        onChange={this.onInputChange}
                    />
                    <textarea
                        name="currentInput"
                        id="currentInput"
                        autoCorrect="false"
                        className={css(styles.textArea)}
                        placeholder="New Thread's content"
                        onChange={this.onInputChange}
                    ></textarea>
                </div>
                <button className={css(styles.button)} onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#F2F2F2",
        position: "fixed",
        bottom: "0",
        width: "100vw",
        textAlign: "center",
        height: "80px",
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
        borderRadius: 5,
        border: `1px solid ${"#BABABA"}`,
        whiteSpace: "normal",
        width: "100%",
        flex: 1,
        fontFamily: "'Open Sans'",
    },

    inputs: {
        height: "80%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },

    titleInput: {
        borderRadius: 5,
        border: `1px solid ${"#BABABA"}`,
        width: "100%",
        fontFamily: "'Open Sans'",
        marginBottom: "5px"
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