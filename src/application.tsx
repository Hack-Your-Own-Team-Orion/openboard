import React, { Component } from "react";
import Navbar from "./components/navbar";

import Page from "./components/Page";
import { usernameFromIp } from "./localFunctions/UsernameFunctions";

interface ApplicationProps {}
interface ApplicationState {
    userHash: string;
}

export default class Application extends Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);

        this.state = {
            userHash: "<user_hash>",
        };
    }

    async componentDidMount(): Promise<void> {
        const req = new XMLHttpRequest();
        req.addEventListener("load", (): void => {
            const lines = req.responseText.split("\n");
            const ip = lines[2].slice(3);
            this.setState({
                userHash: usernameFromIp(ip),
            });
        });
        req.open("GET", "https://www.cloudflare.com/cdn-cgi/trace");
        req.send();
    }

    render(): React.ReactNode {
        return (
            <>
                <Navbar />
                <Page collection="pages/main" userHash={this.state.userHash} />
            </>
        );
    }
}
