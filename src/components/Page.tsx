import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Footer from "./footer";
import LoadingScreen from "./loadingScreen";
import Colors from "../colors.global";
import { Reply } from "../interface";
import firebase from "../firebase";
import Comment from "./Comment";

interface PageProps {
    collection: string;
    userHash: string;
}

interface PageState {
    hasFinishedLoading: boolean;
    data: Reply[];
}

const firestore = firebase.firestore();

export default class Page extends Component<PageProps, PageState> {

    constructor(props: PageProps) {
        super(props);

        this.state = {
            hasFinishedLoading: false,
            data: Array<Reply>(),
        };

        this.finishLoading  = this.finishLoading.bind(this);
        this.requestRefresh = this.requestRefresh.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.requestRefresh();
        this.finishLoading();
    }

    async requestRefresh(): Promise<void> {
        const document = firestore.doc(this.props.collection);
        const data = (await document.get()).data();
        const threads: Reply[] = data.threads;
        this.setState({
            data: threads,
        });
    }

    finishLoading(): void {
        setTimeout((): void => {
            this.setState({
                hasFinishedLoading: true,
            });
        }, 100);
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingScreen shouldFadeOut={this.state.hasFinishedLoading} />

                <div className={css(styles.title)}>
                    <h1>Welcome to /{this.props.collection.slice(6)}, &lt;{this.props.userHash}&gt;</h1>
                    {JSON.stringify(this.state.data) === "[]" && (
                        <h3 className={css(styles.subtitle)}>
                            This page is empty. Fill the void by starting a thread at the bottom of the page!
                        </h3>
                    )}
                </div>

                <div className={css(styles.internalContent)}>
                    {this.state.data.map((reply: Reply): React.ReactNode => {
                        return <Comment
                            id={reply.id}
                            title={reply.title}
                            color={reply.color}
                            content={reply.content}
                            userhash={reply.userhash}
                            replies={reply.replies}
                            key={reply.id}
                            level={1} />;
                    })}
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
        margin: "40px 0 40px 10%",
    },
    internalContent: {
        width: "80%",
        marginLeft: "10%",
        marginBottom: "100px",
    },

    subtitle: {
        marginTop: "20px",
    },
});
