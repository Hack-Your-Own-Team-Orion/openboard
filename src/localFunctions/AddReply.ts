var data = '[{"color":"#222f3e","userhash":"e27fh138hfs8198de27fh138hfs8198d","title":"test title!","replies":[{"color":"#bdc3c7","userhash":"34j9asd34a084efa34j9asd34a084efa","id":"27","replies":[{"color":"#000000","id":"29","userhash":"34j9asd34a084efa34j9asd34a084efa","content":"Third level text #1!","level":3}],"content":"Second level text #1!","level":2}],"id":"12","content":"First level text #1!","level":1},{"title":"test title!","replies":[{"userhash":"34j9asd34a084efa34j9asd34a084efa","color":"#bdc3c7","replies":[{"color":"#000000","id":"29","userhash":"34j9asd34a084efa34j9asd34a084efa","content":"Third level text #1!","level":3}],"id":"27","content":"Second level text #1!","level":2}],"id":"12","content":"First level text #1!","level":1,"userhash":"e27fh138hfs8198de27fh138hfs8198d","color":"#1abc9c"},{"replies":[{"replies":[{"color":"#000000","id":"29","userhash":"34j9asd34a084efa34j9asd34a084efa","content":"Third level text #1!","level":3}],"id":"27","content":"Second level text #1!","level":2,"userhash":"34j9asd34a084efa34j9asd34a084efa","color":"#bdc3c7"}],"id":"12","content":"First level text #1!","level":1,"color":"#1abc9c","userhash":"e27fh138hfs8198de27fh138hfs8198d","title":"test title!"},{"title":"test title!","id":"12","replies":[{"userhash":"34j9asd34a084efa34j9asd34a084efa","color":"#bdc3c7","replies":[{"color":"#000000","id":"29","userhash":"34j9asd34a084efa34j9asd34a084efa","content":"Third level text #1!","level":3}],"id":"27","content":"Second level text #1!","level":2}],"content":"First level text #1!","level":1,"color":"#1abc9c","userhash":"e27fh138hfs8198de27fh138hfs8198d"},{"color":"#27ae60","id":"13","userhash":"fa87ah72g21sash2fa87ah72g21sash2","content":"First level text #2!","level":1},{"userhash":"TEST<>","color":"#F3F3F3","title":"TEST_CONTENT_TITLE!","id":"TEST_ID!","replies":[],"content":"TEST_CONTENT_ADD","level":1}]';

class Queue {
	a: any[];
	b: number;
	constructor() {
		this.a = [];
		this.b = 0;
	}
	getLength() {
		return this.a.length-this.b;
	}
	isEmpty() {
		return 0==this.a.length;
	}
	enqueue(b: any) {
		this.a.push(b);
	}
	dequeue() {
		if (0!=this.a.length){
			var c=this.a[this.b];
			2*++this.b>=this.a.length&&(this.a=this.a.slice(this.b),this.b=0);
			return c;
		}
	}
	peek() {
		return 0<this.a.length?this.a[this.b]:void 0;
	}
}

export interface Reply {
    title?: string,
    userhash: string,
    content: string,
    color: string,
    replies?: ReadonlyArray<Reply>,
    id: string,
    level?: number
}

function addReply(data: string, id: string, newReply: Reply): string {
	var obj = JSON.parse(data)
	var queue = new Queue();
	for (var i = 0; i < obj.length; i++) {
		queue.enqueue(obj[i]);
	}
	while (!(queue.isEmpty())) {
		var current = queue.dequeue();
		if (current.hasOwnProperty("id") && current.id === id){
			if (!current.hasOwnProperty("replies")) {
				current["replies"] = [];
			}
			current["replies"].push(newReply);
			break;
		}
		if (current.hasOwnProperty("replies")) {
			for (var i = 0; i < current["replies"].length; i++) {
				queue.enqueue(current["replies"][i])
			}
		}
	}
	return JSON.stringify(obj);
}

console.log(addReply(data, "29", JSON.parse('{"color":"#000000","id":"69","userhash":"GRRRRRRRRRRR","content":"AAAAAAAAAAAAAAAAA","level":3}')))