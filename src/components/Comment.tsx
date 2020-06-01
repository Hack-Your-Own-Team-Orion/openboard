import React, { FunctionComponent } from "react";
import { css, StyleSheet } from "aphrodite";
import { Reply, Thread } from "../interface";
import { condensedUsername } from "../localFunctions/UsernameFunctions";
import ReplyModal from "./ReplyModal";

const Comment: FunctionComponent<Reply | Thread> = (props: Reply | Thread): React.ReactElement => {
    const miniUsername = condensedUsername(props.userhash);
    const [showReplies, setShowReplies] = React.useState(props.level < 5 ? true : false);
    const [username, setUsername] = React.useState(miniUsername);
    const [showingReplyModal, setShowingReplyModal] = React.useState(false);

    const styles = StyleSheet.create({
        commentGrid: {
            display: "grid",
            backgroundColor: "white",
            gridTemplateRows: "auto auto auto",
            borderLeft: `0.3rem solid ${props.color}`,
            borderBottom: `1px solid #F2F2F2`,

            padding: "0.5rem",
            marginLeft: `calc(${props.level - 1} * 0.5rem)`, // Subtract 1 from level so root comment doesn't have a margin
        },
        title: {
            fontSize: "1.1rem",
            letterSpacing: "0.01rem",
            color: props.color,
        },
        username: {
            fontSize: "1.1rem",
            letterSpacing: "0.01rem",
            color: props.color,
        },
        content: {
            color: "#464646",
            fontSize: "1.05rem",
        },
        filledButton: {
            backgroundColor: props.color,
            borderRadius: "2px",
            border: `2px solid ${props.color}`,
            fontWeight: 600,
            boxSizing: "border-box",
            color: "white",
            marginRight: "0.2rem",
            cursor: "pointer",
        },

        unfilledButton: {
            color: "#494949",
            fontWeight: 600,
            opacity: 0.9,
            background: "none",
            fontSize: "1rem",
            cursor: "pointer",
        },
    });

    function showReplyModal(): void {
        setShowingReplyModal(true);
    }

    return (
        <>
            <div className={css(styles.commentGrid)}>
                <p
                    onMouseEnter={(): void => setUsername(props.userhash)}
                    onMouseLeave={(): void => setUsername(miniUsername)}
                    className={css(styles.title)}
                >
                    {(props.title ? `${props.title} ` : "") + `<${username}>`}
                </p>
                <div className={css(styles.content)}> {props.content} </div>
                <div>
                    <button className={css(styles.filledButton)} onClick={showReplyModal}>
                        Reply
                    </button>
                    {!props.replies ? (
                        <span> No Replies </span>
                    ) : (
                        <button className={css(styles.unfilledButton)} onClick={(): void => setShowReplies(!showReplies)}>
                            {showReplies ? "Hide Replies" : "Show Replies"}
                        </button>
                    )}
                </div>
            </div>
            {props.replies && showReplies && (
                <div>
                    {props.replies.map(
                        (reply: Reply): React.ReactNode => {
                            return (
                                <Comment
                                    id={reply.id}
                                    title={reply.title}
                                    color={reply.color}
                                    content={reply.content}
                                    userhash={reply.userhash}
                                    replies={reply.replies as Reply[]}
                                    key={reply.id}
                                    level={props.level + 1}
                                />
                            );
                        },
                    )}
                </div>
            )}
            {showingReplyModal && (
                <ReplyModal
                    title={props.title || props.content}
                    hideSelf={(): void => setShowingReplyModal(false)}
                    _key={props.id}
                    level={props.level}
                />
            )}
        </>
    );
};

export default Comment;
