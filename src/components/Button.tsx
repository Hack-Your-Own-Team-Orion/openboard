import React from "react";

import { css, StyleSheet } from "aphrodite";

import Colors from "../colors.global";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    loading: boolean;
    error: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { loading, error, text, className, ...rest } = props;

    return (
        <button className={`${css(styles.button, loading && styles.loading, error && styles.error)} ${className}`} {...rest}>
            {loading ? "Loading" : <span>{text}</span>}
        </button>
    );
};

const styles = StyleSheet.create({
    button: {
        outline: "0",
        border: `2px solid ${Colors.green}`,
        color: Colors.green,
        cursor: "pointer",
        borderRadius: 5,
        padding: "5px 10px",
        transition: "all .1s ease-in-out",

        ":hover": {
            transform: "translateY(-2px) scale(1.05)",
            scale: "scale(1.1)",
        },
    },
    loading: {
        cursor: "wait",
    },
    error: {
        borderColor: "red",
        color: "red",
    },
});

export default Button;
