/**
 * 
 * Title:
 * Userhash:
 * Content:
 * Color:
 * Replies:
 * Level:   Calculated here. What sub-level reply is in. Used to determine left margin && possible cutoff when level > X. (too big for screen)
 * ID:
 */


export interface Reply {
    title?: string,
    userhash: string,
    content: string,
    color: string,
    replies?: ReadonlyArray<Reply>,
    id: string,
    level?: number
}

export interface Thread {
    title?: string,
    userhash: string,
    content: string,
    color: string,
    replies?: ReadonlyArray<Reply>,
    id: string,
    level?: number
}