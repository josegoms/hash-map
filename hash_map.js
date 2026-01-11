class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }
    grow() {
        //Check mathematical condition to grow
        if ((this.length / this.capacity) > this.loadFactor) {
            //Store actual nodes
            let oldNodes = this.entries();

            //Double capacity and recreate buckets
            this.capacity *= 2;
            this.buckets = new Array(this.capacity);

            //Reappend previous nodes
            for (let node of oldNodes) {
                this.set(node[0], node[1]);
            }
        }
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
    set(key, value) {
        //Get index and check
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }


        //Create node
        const node = {
            key: key,
            value: value,
            next: null,
        }

        //Empty reference
        if (!this.buckets[index]) {
            this.buckets[index] = {
                head: node,
            }
            this.grow();
            return;
        }

        //Reference
        let current = this.buckets[index].head;

        //Overwrite existent node
        if (this.has(key)) {

            while (current !== null) {

            //Equal keys
            if (current.key === key) {
                current.value = value;
                return;
            }

            current = current.next;
            }
        }

        //Append new node
        while (current !== null) {
            if (current.next === null) {
                current.next = node;
                this.grow();
            }
        }
    }
    get(key) {
        //Index and check
        const index = this.hash(key);
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }


        //Empty list and reference
        if (!this.buckets[index]) return null;
        let current = this.buckets[index].head;

        //Find it
        while (current !== null) {
            if (current.key === key) return current.value;
            current = current.next;
        }

        return null;
    }
    has(key) {
        //Index and check
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        //Empty list and reference
        if (!this.buckets[index]) return null;
        let current = this.buckets[index].head;
        
        //Find it
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
        if (!this.buckets[index]) return null;
        let current = this.buckets[index].head;

        //First node
        if (current.key === key) {
            if (current.next === null) {
                this.buckets[index] = undefined;
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
    length() {
        //Count
        let count = 0;

        //Count nodes
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                
                //Linked list
                let current = this.buckets[i].head;
                while (current !== null) {
                    current = current.next;
                    count++;
                }
            }
        }
        
        return count;
    }
    clear() {
        this.buckets = new Array(this.capacity);
    }
    keys() {
        //Array to store all keys
        let keys = [];

        //Loop over array
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {

                //Linked lists
                let current = this.buckets[i].head;
                while (current !== null) {
                    keys.push(current.key);
                    current = current.next;
                }
            }
        }
        return keys;
    }
    values() {
        //Array to store all values
        let values = [];

        //Loop over array
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {

                //Linked lists
                let current = this.buckets[i].head;
                while (current !== null) {
                    values.push(current.value);
                    current = current.next;
                }
            }
        }
        return values;

    }
    entries() {
        //Array to store entries
        let entries = [];

        //Loop over array
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {

                //Linked lists
                let current = this.buckets[i].head;
                while (current !== null) {
                    entries.push([current.key, current.value]);
                    current = current.next;
                }
            }
        }
        return entries;
    }
}