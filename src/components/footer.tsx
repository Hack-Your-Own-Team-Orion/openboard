import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Colors from "../colors.global";
import { Thread } from "../interface";
import { colorFromUsername } from "../localFunctions/UsernameFunctions";
import { v4 as uuidv4 } from "uuid";
import { addThread } from "../dataFunctions";

interface FooterProps {
    userHash: string;
    page: string;
    requestRefresh: () => void;
}
interface FooterState {
    currentInput: string;
    currentTitleInput: string;
}

export default class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);

        this.state = {
            currentInput: "",
            currentTitleInput: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e: any): void {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    async handleSubmit(): Promise<void> {
        const newThread: Thread = {
            id: uuidv4(),
            title: this.state.currentTitleInput,
            content: this.state.currentInput,
            userhash: this.props.userHash,
            color: colorFromUsername(this.props.userHash),
            replies: [],
            level: 1,
        };
        await addThread(this.props.page, newThread);
        await this.props.requestRefresh();
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.rootContainer)}>
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
                        />
                    </div>
                    <div className={css(styles.buttons)}>
                        <button className={css(styles.button)} onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        position: "fixed",
        bottom: "0",
        left: "0",
        borderTop: `3px solid ${Colors.green}`,
        backgroundColor: "#F2F2F2",
        height: "110px",
        transition: "height .1s ease-in-out",

        ":hover": {
            height: "180px",
        },

        ":active": {
            height: "180px",
        },
        width: "100%",
    },

    root: {
        margin: "0 auto",
        maxWidth: "1140px",
        width: "100%",
        textAlign: "center",
        height: "100%",
        transition: "all .1s ease-in-out",
        fontFamily: "'Ubuntu', sans-serif",
        display: "flex",
    },

    textArea: {
        padding: "4px",
        resize: "none",
        borderRadius: 5,
        border: `1px solid ${"#BABABA"}`,
        whiteSpace: "normal",
        flex: "1 0 auto",
        fontFamily: "'Open Sans'",
    },

    inputs: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 auto",
        padding: "16px",
    },

    titleInput: {
        padding: "4px",
        borderRadius: 5,
        border: `1px solid ${"#BABABA"}`,
        fontFamily: "'Open Sans'",
        marginBottom: "5px",
    },

    buttons: {
        height: "100%",
        paddingRight: "16px",
        display: "flex",
        alignItems: "center",
    },

    button: {
        border: `2px solid ${Colors.green}`,
        color: Colors.green,
        cursor: "pointer",
        borderRadius: 5,
        padding: "5px 10px",
        transition: "all .1s ease-in-out",

        ":hover": {
            transform: "translateY(-2px) scale(1.05)",
            scale: "scale(1.1)",
        },
    },
});
