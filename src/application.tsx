import React, { Component } from "react";
import Navbar from "./components/navbar";

import Page from "./components/Page";
import { usernameFromIp } from "./localFunctions/UsernameFunctions";
import Footer from "./components/footer";
import Comment from "./components/Comment";
import { Reply } from './interface';

type ApplicationProps = {};
type ApplicationState = {
    userHash: string
};

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
            userHash: "<user_hash>"
        }
    }

async componentDidMount() {
        let req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            let lines = req.responseText.split("\n");
            let ip = lines[2].slice(3);
            this.setState({
                userHash: usernameFromIp(ip)
            });
        });
        req.open("GET", "https://www.cloudflare.com/cdn-cgi/trace");
        req.send();
    }

    render(): React.ReactNode {
        return (
            <>
              <Navbar />
              <Page collection="main" userHash={this.state.userHash} />
            </>
        );
    }
}