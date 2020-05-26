import React, { Component } from "react";
import LoadingScreen from "./components/loadingScreen";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Comment from "./components/Comment";
import {Reply} from './interface';

type ApplicationProps = {};
type ApplicationState = {
    fadeOutLoadingScreen: boolean
};

// TODO: Place content IN BETWEEN header? && footer & make that scrollable.

const mockData = [
    {
        userhash: "e27fh138hfs8198de27fh138hfs8198d",
        title: "test title!",
        content: "First level text #1!",
        color: "#1abc9c",
        id:"12",
        replies: [
            {
                userhash: "34j9asd34a084efa34j9asd34a084efa",
                content: "Second level text #1!",
                color: "#bdc3c7",
                id: "27",
                replies: [
                    {
                        userhash: "34j9asd34a084efa34j9asd34a084efa",
                        content: "Third level text #1!",
                        color: "#000000",
                        id: "29",
                    }
                ],
            },
        ],
    },
    {
        userhash: "fa87ah72g21sash2fa87ah72g21sash2",
        content:"First level text #2!",
        color:"#27ae60",
        id:"13",
    },
];

export default class Application extends Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);

        this.state = {
            fadeOutLoadingScreen: false
        }
    }

    // TODO Set loadingscreen based on 500ms + ifCommentsStillFetchingFromDB
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                fadeOutLoadingScreen: true
            })
        }, 500);
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingScreen shouldFadeOut={this.state.fadeOutLoadingScreen} />
                <Navbar />
                {/* <h1>Hack Your Own - Team Orion</h1>
                <p>File Format:</p>
                <ul>
                    <li>src/application.js - application entry point</li>
                    <li>src/components - components</li>
                    <li>src/pages - pages for ReactRouter</li>
                    <li>src/localFunctions - functions that don't require a cloud service</li>
                    <li>functions/ - Firebase Functions</li>
                </ul> */}
                {mockData.map((reply) => {
                    return <Comment
                        id={reply.id}
                        title={reply.title}
                        color={reply.color}
                        content={reply.content}
                        userhash={reply.userhash}
                        replies={reply.replies}
                        key={reply.id}
                        level={1}/>
                })}

                <Footer />
            </>
        );
    }
}