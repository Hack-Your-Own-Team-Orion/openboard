/**
 *
 * Title:
 * Userhash:
 * Content:
 * Color:
 * Replies:
 * Level:   Calculated here. What sub-level reply is in. Used to determine
 *          left margin && possible cutoff when level > X. (too big for screen)
 * ID:
 */

export interface Message {
    title?: string;
    userhash: string;
    content: string;
    color: string;
    replies?: Message[];
    id: string;
    level?: number;
}
