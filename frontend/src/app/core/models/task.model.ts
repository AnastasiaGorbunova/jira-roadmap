import firebase from 'firebase/app';
import 'firebase/firestore';

export interface Task {
    id?: string;
    name: string;
    description?: string;
    creator_id?: string;
    assigned_user_id?: string;
    status: TaskStatus;
	date_created?: firebase.firestore.Timestamp;
	date_updated?: firebase.firestore.Timestamp;
}

export enum TaskStatus {
    ToDo = 'TODO',
    InProgress = 'IN_PROGRESS',
    Done = 'DONE'
}
