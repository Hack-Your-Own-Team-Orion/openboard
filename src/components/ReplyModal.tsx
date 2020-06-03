import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";

import Colors from "../colors.global";
import { Message } from "../interface";
import { v4 as uuidv4 } from "uuid";
import { colorFromUsername } from "../localFunctions/UsernameFunctions";
import { addReply } from "../dataFunctions";
import Button from "./Button";

interface ReplyModalProps {
    userhash: string;
    _key: string;
    title: string;
    level: number;
    hideSelf: () => void;
    requestRefresh: () => Promise<void>;
}
interface ReplyModalState {
    loading: boolean;
    error: boolean;
    replyInput: string;
}

export default class ReplyModal extends Component<ReplyModalProps, ReplyModalState> {
    constructor(props: ReplyModalProps) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            replyInput: "",
        };

        this.hideSelf = this.hideSelf.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideSelf(): void {
        this.props.hideSelf();
    }

    async handleSubmit(): Promise<void> {
        this.setState({ loading: true });

        if (this.state.replyInput === "" || this.state.replyInput === null) {
            this.setState({
                loading: false,
                error: true,
            }, (): void => alert("Please fill out the reply field!"));
        } else {
            const newReply: Message = {
                id: uuidv4(),
                content: this.state.replyInput,
                userhash: this.props.userhash,
                color: colorFromUsername(this.props.userhash),
                replies: [],
                level: this.props.level + 1,
            };

            try {
                await addReply("/pages/main", this.props._key, newReply);
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

            try {
                await this.props.requestRefresh();
            } catch (error) {
                window.location.reload(true);
            }

            this.setState({ loading: false, error: false });
            this.hideSelf();
        }
    }

    onInputChange(e: any): void {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.rootContainer)}>
                <div className={css(styles.root)}>
                    <div className={css(styles.topBar)}>
                        <h3>
                            Reply to "<i>{this.props.title}</i>"
                        </h3>
                        <button className={css(styles.closeButton)} onClick={this.hideSelf}>
                            Close
                        </button>
                    </div>
                    <div className={css(styles.textareaContainer)}>
                        <textarea
                            placeholder="Reply content"
                            name="replyInput"
                            id="replyInput"
                            className={css(styles.textArea)}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <Button text="Post Reply" loading={this.state.loading} error={this.state.error} onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        zIndex: 100,
        position: "fixed",
        top: "50%",
        padding: "0 16px",
        transform: "translate(0, -50%)",
        left: 0,
        right: 0,
    },
    root: {
        maxWidth: "1140px",
        width: "100%",
        height: "300px",
        margin: "0 auto",

        backgroundColor: "#F2F2F2",

        borderRadius: 5,
        padding: "20px",
        border: `2px solid ${Colors.green}`,

        fontFamily: "'Ubuntu', sans-serif",
        display: "flex",
        flexDirection: "column",
    },

    topBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    closeButton: {
        textDecoration: "underline",
        cursor: "pointer",
        borderRadius: 5,
    },

    textareaContainer: {
        flex: "1 0 auto",
        padding: "20px 0",
    },

    textArea: {
        resize: "none",
        borderRadius: 5,
        padding: "10px",
        width: "100%",
        height: "100%",
        border: `1px solid ${"#BABABA"}`,
        whiteSpace: "normal",
    },
});
