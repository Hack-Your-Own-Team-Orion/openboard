import React, { FunctionComponent } from 'react';
import { css, StyleSheet } from "aphrodite"
import {Reply, Thread} from '../interface';
import {condensedUsername} from '../localFunctions/UsernameFunctions';

// TODO Condense subreplies if too many...
// TODO onClickReply() send focus to the textarea || create small input field under thread?

const Comment:FunctionComponent<Reply | Thread> = ({title, userhash, content, color, replies, id, level}) =>  {
    const miniUsername = condensedUsername(userhash);
    const [showReplies, setShowReplies] = React.useState(false);
    const [username, setUsername] = React.useState(miniUsername);

    const styles = StyleSheet.create({
        commentGrid: {
            fontFamily: "'Open Sans', sans-serif",
            display: "grid",
            backgroundColor: "white",
            gridTemplateRows: "auto auto auto",
            borderLeft: `0.3rem solid ${color}`,
            padding: "0rem 0px 0.5rem 0.5rem",
            marginLeft: `calc(${level} * 0.5rem)`,
        },
        title: {
            fontSize: "1.1rem",
            letterSpacing: "0.01rem",
            color: color,
        },
        username: {
            fontSize: "1.1rem",
            letterSpacing: "0.01rem",
            color: color,

        },
        content: {
            color: "#464646",
            fontSize: "1.05rem",
        },
        filledButton: {
            backgroundColor: color,
            borderRadius: "2px",
            border: `2px solid ${color}`,
            fontWeight: 600,
            boxSizing: "border-box",
            color: "white",
            marginRight: "0.2rem",
        },
        unfilledButton: {
            color: "#494949",
            fontWeight: 600,
            opacity: 0.9,
            background: "none",
            fontSize: "1rem"
        }
    });

    return (
        <>
        <div className={css(styles.commentGrid)}>
            <p onMouseEnter={() => setUsername(userhash)} onMouseLeave={() => setUsername(miniUsername)} className={css(styles.title)}> {(title ? `${title} ` : "") + `<${username}>`}</p>
            <div className={css(styles.content)}> {content} </div>
            <div>
                <button className={css(styles.filledButton)} onClick={() => {}}> Reply </button>
                {!replies ? <span> No Replies </span> : (
                    <button className={css(styles.unfilledButton)} onClick={() => setShowReplies(!showReplies)}>{showReplies ? "Hide Replies" : "Show Replies"}</button>
                )}
            </div>
        </div>
        {
            replies && showReplies && (
                <div>
                    {replies.map((reply) => {
                        return <Comment
                            id={reply.id}
                            title={reply.title}
                            color={reply.color}
                            content={reply.content}
                            userhash={reply.userhash}
                            replies={reply.replies as Reply[]}
                            key={reply.id}
                            level={level + 1}/>
                    })}
                </div>
                )
            }
        </>
    );
}

export default Comment;