import firebase from "./firebase";
import { Message } from "./interface";
import Queue from "./queue";

const firestore = firebase.firestore();

export async function addThread(page: string, threadData: Message): Promise<void> {
    const doc = firestore.doc(page);
    const currentData = (await doc.get()).data();
    const newThreads = [...currentData.threads, threadData];

    doc.update({
        threads: newThreads,
    });
}

interface ThreadData {
    threads: Message[];
}

function addCommentToThread(page: any, insertAt: string, newReply: Message): ThreadData {
    const threads = page.threads;
    const q = new Queue();
    for (const thread of threads) {
        q.enqueue(thread);
    }

    while (!q.isEmpty()) {
        const current: Message = q.dequeue();

        if (current.id === insertAt) {
            if (!current.hasOwnProperty("replies")) {
                current.replies = [];
            }
            current.replies.push(newReply);
            break;
        } else {
            if (current.hasOwnProperty("replies")) {
                for (const reply of current.replies) {
                    q.enqueue(reply);
                }
            }
        }
    }
    return {
        threads,
    };
}

export async function addReply(page: string, id: string, newReply: Message): Promise<void> {
    const doc = firestore.doc(page);
    const currentData = (await doc.get()).data();
    const newData = addCommentToThread(currentData, id, newReply);

    await doc.set({
        threads: newData.threads,
    });
}
