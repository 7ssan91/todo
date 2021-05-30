
export class EventModule {
    id: string;
    eventName: string;
    dueDate: Date;
    tasks: TaskModule[] = [];
}
export class TaskModule {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    priority: string;

}
