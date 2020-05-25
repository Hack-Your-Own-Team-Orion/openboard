import React, { Component } from "react";
import LoadingScreen from "./components/loadingScreen";

type ApplicationProps = {};
type ApplicationState = {
    fadeOutLoadingScreen: boolean
};

export default class Application extends Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);

        this.state = {
            fadeOutLoadingScreen: false
        }
    }

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
                <h1>Hack Your Own - Team Orion</h1>
                <p>File Format:</p>
                <ul>
                    <li>src/application.js - application entry point</li>
                    <li>src/components - components</li>
                    <li>src/pages - pages for ReactRouter</li>
                    <li>src/localFunctions - functions that don't require a cloud service</li>
                    <li>functions/ - Firebase Functions</li>
                </ul>
            </>
        );
    }
}