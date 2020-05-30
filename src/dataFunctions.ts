import firebase from "./firebase";
import { Reply, Thread } from "./interface";
import Queue from "./queue";

const firestore = firebase.firestore();

export async function addThread(page: string, threadData: Reply | Thread): Promise<void> {
    const doc = firestore.doc(page);
    const currentData = (await doc.get()).data();
    console.log(currentData);
    const newThreads = [
        ...currentData.threads,
        threadData,
    ];

    doc.update({
        threads: newThreads,
    });
}

interface ThreadData {
    threads: Reply[];
}

function addCommentToThread(page: any, insertAt: string, newReply: Reply): ThreadData {
    const threads = page.threads;
    const q = new Queue();
    for (const thread of threads) {
        q.enqueue(thread);
    }

    while (!q.isEmpty()) {
        const current: Reply = q.dequeue();

        if (current.id === insertAt) {
            if (!current.hasOwnProperty("replies")) {
                current.replies = [];
            }
            current.replies.push(newReply);
            alert(`Broke @ ${current.id}, should have inserted :)`);
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

export async function addReply(page: string, id: string, newReply: Reply): Promise<void> {
    const doc = firestore.doc(page);
    const currentData = (await doc.get()).data();
    const newData = addCommentToThread(currentData, id, newReply);

    await doc.set({
        threads: newData.threads,
    });
}
