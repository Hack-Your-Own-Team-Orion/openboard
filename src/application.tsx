import React, { Component } from "react";

type ApplicationProps = {};
type ApplicationState = {};

export default class Application extends Component<ApplicationProps, ApplicationState> {
    render(): React.ReactNode {
        return (
            <div>
                <h1>Hack Your Own - Team Orion</h1>
                <p>File Format:</p>
                <ul>
                    <li>src/application.js - application entry point</li>
                    <li>src/components - components</li>
                    <li>src/pages - pages for ReactRouter</li>
                    <li>src/localFunctions - functions that don't require a cloud service</li>
                    <li>functions/ - Firebase Functions</li>
                </ul>
            </div>
        );
    }
}