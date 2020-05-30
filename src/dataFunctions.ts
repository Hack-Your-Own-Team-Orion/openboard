import firebase from "./firebase";
import { Reply, Thread } from "./interface";
import Queue from "./queue";

const firestore = firebase.firestore();

export async function addThread(page: string, threadData: Reply | Thread): Promise<void> {
    let doc = firestore.doc(page);
    let currentData = (await doc.get()).data();
    console.log(currentData);
    let newThreads = [
        ...currentData.threads,
        threadData
    ]

    doc.update({
        threads: newThreads
    });
}

function addCommentToThread(page: any, insertAt: string, newReply: Reply) {
    let threads = page.threads;
    let q = new Queue();
    for (let i = 0; i < threads.length; i++) {
        q.enqueue(threads[i]);
    }

    while (!q.isEmpty()) {
        let current: Reply = q.dequeue();

        if (current.id === insertAt) {
            if (!current.hasOwnProperty("replies")) {
                current.replies = [];
            }
            current.replies.push(newReply);
            alert(`Broke @ ${current.id}, should have inserted :)`)
            break;
        } else {
            if (current.hasOwnProperty("replies")) {
                for (let i = 0; i < current.replies.length; i++) {
                    q.enqueue(current.replies[i]);
                }
            }
        }
    }
    return {
        threads: threads
    }
}

export async function addReply(page: string, id: string, newReply: Reply): Promise<void> {
    let doc = firestore.doc(page);
    let currentData = (await doc.get()).data();
    let newData = addCommentToThread(currentData, id, newReply);

    console.log(newData.threads);
    
    await doc.set({
        threads: newData.threads
    });
}