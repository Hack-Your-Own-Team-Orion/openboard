import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import { v4 as uuidv4 } from "uuid";

import Colors from "../colors.global";
import { Message } from "../interface";
import { colorFromUsername } from "../localFunctions/UsernameFunctions";
import { addThread } from "../dataFunctions";
import Button from "./Button";

interface FooterProps {
    userHash: string;
    page: string;
    requestRefresh: () => void;
}
interface FooterState {
    loading: boolean;
    error: boolean;
    currentInput: string;
    currentTitleInput: string;
}

export default class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);

        this.state = {
            loading: false,
            error: false,
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
        this.setState({ loading: true });

        if (this.state.currentInput === "" || this.state.currentTitleInput === "") {
            this.setState({
                loading: false,
                error: true,
            }, (): void => alert("Please fill out all fields!"));
        } else {
            const newThread: Message = {
                id: uuidv4(),
                title: this.state.currentTitleInput,
                content: this.state.currentInput,
                userhash: this.props.userHash,
                color: colorFromUsername(this.props.userHash),
                replies: [],
                level: 1,
            };

            try {
                await addThread(this.props.page, newThread);
                this.props.requestRefresh();
            } catch (error) {
                console.error(error);
                this.setState({
                    loading: false,
                    error: true,
                });
                setTimeout((): void => {
                    this.setState({ error: false });
                }, 1000);
                return;
            }

            this.setState({
                error: false,
                loading: false,
                currentInput: "",
                currentTitleInput: "",
            });

            // For cross browser
            const body = document.body;
            const html = document.documentElement;
            const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

            window.scrollTo(0, height);
        }
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
                            value={this.state.currentTitleInput}
                            className={css(styles.titleInput)}
                            placeholder="Write a new Thread - Title"
                            onChange={this.onInputChange}
                        />
                        <textarea
                            name="currentInput"
                            id="currentInput"
                            autoCorrect="false"
                            value={this.state.currentInput}
                            className={css(styles.textArea)}
                            placeholder="New Thread's content"
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className={css(styles.buttons)}>
                        <Button onClick={this.handleSubmit} loading={this.state.loading} error={this.state.error} text="Submit" />
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
        right: "0",
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
});
