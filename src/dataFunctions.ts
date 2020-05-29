import firebase from "./firebase";
import { Reply, Thread } from "./interface";

const firestore = firebase.firestore();

export async function addThread(page: string, threadData: Reply | Thread): Promise<void> {
    let doc = firestore.doc(page);
    let currentData = (await doc.get()).data();
    let newThreads = [
        ...currentData.threads,
        threadData
    ]

    doc.update({
        threads: newThreads
    });
}
