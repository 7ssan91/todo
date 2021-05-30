export enum ServerMode {
    Local,
    Beta,
    Live
}
export class StorageWTime<T> {
    public Data: T;
    public expireDate: Date;
    public HasValue: boolean = false;
}