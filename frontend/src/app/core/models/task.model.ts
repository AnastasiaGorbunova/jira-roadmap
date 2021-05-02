import firebase from 'firebase/app';
import 'firebase/firestore';

export interface Task {
    id?: string;
    name: string;
    description?: string;
    project_id: string;
    creator_id?: string;
    assignee_id?: string;
    status: TaskStatus;
	date_created?: firebase.firestore.Timestamp;
	date_updated?: firebase.firestore.Timestamp;
}

export enum TaskStatus {
    ToDo = 'TODO',
    InProgress = 'IN_PROGRESS',
    Done = 'DONE'
}

export interface TaskStatusMap { 
    [status: string]: Task[]
}

export const taskStatusesSet = {
    [TaskStatus.ToDo]: 'ToDo',
    [TaskStatus.InProgress]: 'In Progress',
    [TaskStatus.Done]: 'Done'
}

export const tasksStatuses = [TaskStatus.ToDo, TaskStatus.InProgress, TaskStatus.Done];
