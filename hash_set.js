class HashSet {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }
    hash(key) {
        //Accumulative
        let hashCode = 0;

        let primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            //Math
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }
    set(key) {
        //Get index and check
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        //"Overwrite"
        if (this.has(key)) return;

        //Create node
        const node = {
            key: key,
            next: null,
        }

        //Empty list
        if (!this.buckets[index]) {
            this.buckets[index] = {
                head: node,
            }
            this.grow();
            return;
        }

        //Reference
        let current = this.buckets[index].head;

        //Reach tail
        while (current.next !== null) {
            current = current.next;
        }

        //Add new node
        current.next = node;
        this.grow();
        return;
    }
    has(key) {
        //Index and check
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        //Empty list and reference
        if (!this.buckets[index]) return false;
        let current = this.buckets[index].head;

        //Loop over list
        while (current !== null) {
            if (current.key === key) return true;
            current = current.next;
        }

        return false;
    }
    remove(key) {
        //Index and check
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        //Empty list and reference
        if (!this.buckets[index]) return false;
        let current = this.buckets[index].head;

        //First node
        if (current.key === key) {
            if (current.next === null) {
                this.buckets[index].head = undefined;
                return true;
            }
            this.buckets[index].head = current.next;
            return true;
        }

        //Not first node
        while (current.next !== null) {
            if (current.next.key === key) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }   
}