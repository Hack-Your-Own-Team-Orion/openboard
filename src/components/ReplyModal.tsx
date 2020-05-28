import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Colors from "../colors.global";

type ReplyModalProps = {
    _key: string,
    title: string,
    hideSelf: Function
};
type ReplyModalState = {
    replyInput: string
};

export default class ReplyModal extends Component<ReplyModalProps, ReplyModalState> {

    constructor(props: ReplyModalProps) {
        super(props);

        this.state = {
            replyInput: ""
        }

        this.hideSelf = this.hideSelf.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideSelf(): void {
        this.props.hideSelf();
    }

    handleSubmit(): void {
        let data: Object = {
            key: this.props._key,
            input: {
                ...this.state
            }
        }
        alert("Attempted reply-submit with data:\n"+JSON.stringify(data));
    }

    onInputChange(e: any): void {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.root)}>
                <div className={css(styles.topBar)}>
                    <h3>Reply to "<i>{this.props.title}</i>"</h3>
                    <button className={css(styles.closeButton)} onClick={this.hideSelf}>Close</button>
                </div>

                <textarea
                    name="replyInput"
                    id="replyInput"
                    className={css(styles.textArea)}
                    onChange={this.onInputChange}
                />
                <button className={css(styles.submitButton)} onClick={this.handleSubmit}>Post Reply</button>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        zIndex: 100,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: "80vw",
        height: "300px",

        backgroundColor: "#F2F2F2",

        borderRadius: 5,
        padding: "20px",
        border: `2px solid ${Colors.green}`,

        fontFamily: "'Ubuntu', sans-serif"
    },

    topBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    closeButton: {
        textDecoration: "underline",
        cursor: "pointer"
    },

    submitButton: {
        border: `2px solid ${Colors.green}`,
        color: Colors.green,
        margin: "10px 0 0 2.5%",
        cursor: "pointer",
        borderRadius: 5,
        padding: "5px 10px",
        transition: "all .1s ease-in-out",

        ":hover": {
            transform: "translateY(-2px) scale(1.05)",
            scale: "scale(1.1)"
        }
    },

    textArea: {
        resize: "none",
        width: "95%",
        height: "60%",
        margin: "20px 0 0 2.5%",
        borderRadius: 5,
        padding: "10px",
        border: `1px solid ${"#BABABA"}`,
        whiteSpace: "normal",
    }
});