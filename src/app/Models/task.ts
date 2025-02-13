export interface Task {
    id:number;
    taskName:string;
    startTime:string | Date ;
    endTime:Date | string;
    completed:string;
}
