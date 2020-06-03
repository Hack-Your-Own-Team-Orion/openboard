import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Footer from "./footer";
import LoadingScreen from "./loadingScreen";
import Colors from "../colors.global";
import { Message } from "../interface";
import firebase from "../firebase";
import Comment from "./Comment";

interface PageProps {
    collection: string;
    userHash: string;
}

interface PageState {
    hasFinishedLoading: boolean;
    data: Message[];
}

const firestore = firebase.firestore();

export default class Page extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);

        this.state = {
            hasFinishedLoading: false,
            data: Array<Message>(),
        };

        this.finishLoading = this.finishLoading.bind(this);
        this.requestRefresh = this.requestRefresh.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.requestRefresh();
        this.finishLoading();
    }

    async requestRefresh(): Promise<void> {
        const document = firestore.doc(this.props.collection);
        const data = (await document.get()).data();
        const threads: Message[] = data.threads;
        this.setState({
            data: threads,
        });
    }

    finishLoading(): void {
        setTimeout((): void => {
            this.setState({
                hasFinishedLoading: true,
            });
        }, 500);
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingScreen shouldFadeOut={this.state.hasFinishedLoading} />
                <h1 className={css(styles.title)}>
                    <div className={css(styles.welcome)}>Welcome to /{this.props.collection.slice(6)},&nbsp;</div>
                    <div className={css(styles.userHashContainer)}>
                        <div className={css(styles.lt)}>&lt;</div>
                        <div className={css(styles.userHash)}>{this.props.userHash}</div>
                        <div className={css(styles.gt)}>&gt;</div>
                    </div>
                </h1>

                <div className={css(styles.internalContent)}>
                    {!this.state.data.length && <h3>This page is empty. Fill the void by starting a thread at the bottom of the page!</h3>}
                    {this.state.data.map(
                        (reply: Message): React.ReactNode => {
                            return (
                                <Comment
                                    requestRefresh={this.requestRefresh}
                                    id={reply.id}
                                    title={reply.title}
                                    color={reply.color}
                                    content={reply.content}
                                    userhash={reply.userhash}
                                    replies={reply.replies}
                                    key={reply.id}
                                    level={1}
                                />
                            );
                        },
                    )}
                </div>
                <Footer userHash={this.props.userHash} page={this.props.collection} requestRefresh={this.requestRefresh} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: Colors.green,
        fontFamily: "'Ubuntu', sans-serif",
        padding: "20px 16px",
        maxWidth: "1140px",
        margin: "0 auto",
        fontSize: "1.75em",
        "@media (min-width: 700px)": {
            fontSize: "2em",
            padding: "40px 16px",
        },
    },
    welcome: {
        display: "block",
        "@media (min-width: 700px)": {
            display: "inline-block",
        },
    },
    userHashContainer: {
        display: "flex",
        "@media (min-width: 700px)": {
            display: "inline-flex",
        },
    },
    lt: {
        width: "20px",
        textAlign: "center",
        display: "inline-block",
    },
    userHash: {
        maxWidth: "calc(100% - 40px)",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    gt: {
        width: "20px",
        textAlign: "center",
        display: "inline-block",
    },
    internalContent: {
        fontFamily: "'Open Sans', sans-serif",
        maxWidth: "1140px",
        width: "100%",
        margin: "0 auto",
        padding: "0 16px 16px",
        marginBottom: "110px",
    },
});
