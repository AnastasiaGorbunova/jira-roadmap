import firebase from 'firebase/app';
import 'firebase/firestore';

export interface Issue {
    id?: string;
    name?: string;
    description?: string;
    project_id?: string;
    creator_id?: string;
    assignee_id?: string;
    status?: IssueStatus;
    type?: IssueType;
    issue_id?: string;
	date_created?: firebase.firestore.Timestamp;
	date_updated?: firebase.firestore.Timestamp;
}

export enum IssueType {
    Task = 'task',
    SubTask = 'subtask',
    Bug = 'bug'
}

export const issueTypes = [IssueType.Task, IssueType.SubTask, IssueType.Bug];

export const issueTypesSet = {
    [IssueType.Task]: 'Task',
    [IssueType.SubTask]: 'Subtask',
    [IssueType.Bug]: 'Bug'
}

export enum IssueStatus {
    ToDo = 'todo',
    InProgress = 'in_progress',
    Done = 'done'
}

export const issueStatuses = [IssueStatus.ToDo, IssueStatus.InProgress, IssueStatus.Done];

export const issueStatusesSet = {
    [IssueStatus.ToDo]: 'ToDo',
    [IssueStatus.InProgress]: 'In Progress',
    [IssueStatus.Done]: 'Done'
}
