import React, { Component } from 'react'
import { css, StyleSheet } from "aphrodite";
import Colors from "../colors.global";

type NavbarProps = {};
type NavbarState = {};

export default class Navbar extends Component<NavbarProps, NavbarState> {
    render(): React.ReactNode {
        return (
            <nav className={css(styles.root)}>
                <div className={css(styles.inner)}>
                    <img src={process.env.PUBLIC_URL + "/Logo.svg"} alt="OpenBoard" height="32px" className={css(styles.brandLogo)}/>
                    <a href="/" className={css(styles.brandTitle)}><span className={css(styles.brandTitleBolded)}>Open</span>Board</a>
                </div>
            </nav>
        );
    }
}

const styles: any = StyleSheet.create({
    root: {
        zIndex: 5,
        width: "100%",
        height: "60px",
        backgroundColor: Colors.green,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "sticky",
        left: 0,
        top: 0
    },

    inner: {
        width: "calc(100% - 30px)",
        marginLeft: "30px",
        display: "flex",
        alignItems: "center",
    },
    
    brandLogo: {
        display: "block",
        paddingRight: "10px",
    },

    brandTitle: {
        fontFamily: "'Ubuntu', sans-serif",
        textDecoration: "none",
        color: "#FFF",
        fontSize: "1.25em"
    },

    brandTitleBolded: {
        fontWeight: 700
    }
});