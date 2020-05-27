import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Footer from "./footer";
import Comment from "./Comment";
import LoadingScreen from "./loadingScreen";
import Colors from "../colors.global";

type PageProps = {
    collection: string,
    userHash: string
}

type PageState = {
    hasFinishedLoading: boolean
}

const mockData = [
    {
        userhash: "e27fh138hfs8198de27fh138hfs8198d",
        title: "test title!",
        content: "First level text #1!",
        color: "#1abc9c",
        level: 1,
        id: "12",
        replies: [
            {
                userhash: "34j9asd34a084efa34j9asd34a084efa",
                content: "Second level text #1!",
                color: "#bdc3c7",
                level: 2,
                id: "27",
                replies: [
                    {
                        userhash: "34j9asd34a084efa34j9asd34a084efa",
                        content: "Third level text #1!",
                        color: "#000000",
                        level: 3,
                        id: "29",
                    }
                ],
            },
        ],
    },
    {
        userhash: "e27fh138hfs8198de27fh138hfs8198d",
        title: "test title!",
        content: "First level text #1!",
        color: "#1abc9c",
        level: 1,
        id: "12",
        replies: [
            {
                userhash: "34j9asd34a084efa34j9asd34a084efa",
                content: "Second level text #1!",
                color: "#bdc3c7",
                level: 2,
                id: "27",
                replies: [
                    {
                        userhash: "34j9asd34a084efa34j9asd34a084efa",
                        content: "Third level text #1!",
                        color: "#000000",
                        level: 3,
                        id: "29",
                    }
                ],
            },
        ],
    },
    {
        userhash: "e27fh138hfs8198de27fh138hfs8198d",
        title: "test title!",
        content: "First level text #1!",
        color: "#1abc9c",
        level: 1,
        id: "12",
        replies: [
            {
                userhash: "34j9asd34a084efa34j9asd34a084efa",
                content: "Second level text #1!",
                color: "#bdc3c7",
                level: 2,
                id: "27",
                replies: [
                    {
                        userhash: "34j9asd34a084efa34j9asd34a084efa",
                        content: "Third level text #1!",
                        color: "#000000",
                        level: 3,
                        id: "29",
                    }
                ],
            },
        ],
    },
    {
        userhash: "e27fh138hfs8198de27fh138hfs8198d",
        title: "test title!",
        content: "First level text #1!",
        color: "#1abc9c",
        level: 1,
        id: "12",
        replies: [
            {
                userhash: "34j9asd34a084efa34j9asd34a084efa",
                content: "Second level text #1!",
                color: "#bdc3c7",
                level: 2,
                id: "27",
                replies: [
                    {
                        userhash: "34j9asd34a084efa34j9asd34a084efa",
                        content: "Third level text #1!",
                        color: "#000000",
                        level: 3,
                        id: "29",
                    }
                ],
            },
        ],
    },
    {
        userhash: "fa87ah72g21sash2fa87ah72g21sash2",
        content: "First level text #2!",
        color: "#27ae60",
        level: 1,
        id: "13",
    },
];

export default class Page extends Component<PageProps, PageState> {

    constructor(props: PageProps) {
        super(props);

        this.state = {
            hasFinishedLoading: false
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                hasFinishedLoading: true
            })
        }, 250);
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingScreen shouldFadeOut={this.state.hasFinishedLoading} />

                <div className={css(styles.title)}>
                    <h1>Welcome to /{this.props.collection}, &lt;{this.props.userHash}&gt;</h1>
                </div>


                <div className={css(styles.internalContent)}>
                    {mockData.map((reply) => {
                        return <Comment
                            id={reply.id}
                            title={reply.title}
                            color={reply.color}
                            content={reply.content}
                            userhash={reply.userhash}
                            replies={reply.replies}
                            key={reply.id}
                            level={1} />
                    })}
                </div>
                <Footer />
            </>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: Colors.green,
        fontFamily: "'Ubuntu', sans-serif",
        margin: "40px 0 40px 10%"
    },
    internalContent: {
        width: "80%",
        marginLeft: "10%"
    }
});