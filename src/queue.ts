export default class Queue {
    arr: any[];

    constructor() {
        this.arr = [];
    }

    isEmpty(): boolean {
        return this.arr.length === 0;
    }

    enqueue(b: any): any {
        this.arr.push(b);
    }

    dequeue(): any | null {
        if (this.arr.length !== 0) {
            return this.arr.pop();
        } else {
            return null;
        }
    }
}
