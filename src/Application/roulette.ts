export default class ListRoulette<T> extends Array<T> {
    constructor(...items: T[])
    {
        super(...items);
    }

    public get(): T{
        const tmp = this.shift();
        this.push(tmp);
        return tmp;
    }
}