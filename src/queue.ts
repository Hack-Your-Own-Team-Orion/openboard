export default class Queue {
    arr: Array<any>

    constructor() {
        this.arr = [];
    }

    isEmpty() {
        return this.arr.length === 0
    }

    enqueue(b: any) {
        this.arr.push(b);
    }

    dequeue() {
        if (this.arr.length !== 0) {
            return this.arr.pop();
        }
    }
}