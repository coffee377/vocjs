declare class Chained<Parent> {
    name: string;
    protected parent: Parent;
    constructor(parent: Parent);
    end(): Parent;
    batch(handler: (obj: this) => void): this;
}
export default Chained;
