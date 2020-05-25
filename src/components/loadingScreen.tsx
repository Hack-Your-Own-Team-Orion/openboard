import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite"
import { Spring } from "react-spring/renderprops";
import Colors from "../colors.global";
type LoadingScreenProps = {
    shouldFadeOut: boolean
};
type LoadingScreenState = {
    isFadingOut: boolean
};

export default class LoadingScreen extends Component<LoadingScreenProps, LoadingScreenState> {

    constructor(props: LoadingScreenProps) {
        super(props);

        this.state = {
            isFadingOut: false
        }
    }

    componentDidUpdate(prevProps: LoadingScreenProps): void {
        if (prevProps === this.props) return;
        if (this.props.shouldFadeOut === true) {
            this.setState({
                isFadingOut: true
            });
        }
    }

    render(): React.ReactNode {
        return (
            this.state.isFadingOut ? 
                <Spring
                    from={{ opacity: 1 }}
                    to={{ opacity: 0 }}
                    delay={500}
                >
                    {props =>
                        <div className={css(styles.root)} style={props}>
                            <img src={process.env.PUBLIC_URL + "/Logo.svg"} alt="OpenBoard" height="64px"/>
                            <p className={css(styles.brand)}><span className={css(styles.brandBolded)}>Open</span>Board</p>
                        </div>
                    }
                </Spring>
            :
                <div className={css(styles.root)}>
                    <img src={process.env.PUBLIC_URL + "/Logo.svg"} alt="OpenBoard" height="64px"/>
                    <p className={css(styles.brand)}><span className={css(styles.brandBolded)}>Open</span>Board</p>
                </div>
        );
    }

}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.green,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    brand: {
        color: "#FFF",
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "2.2em"
    },

    brandBolded: {
        fontWeight: 700
    }
});