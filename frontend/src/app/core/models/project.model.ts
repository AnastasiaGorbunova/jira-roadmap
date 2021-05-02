import firebase from 'firebase/app';
import 'firebase/firestore';

export interface Project {
	id?: string;
	name: string;
	description?: string;
	creator_id?: string;
	date_created?: firebase.firestore.Timestamp;
	date_updated?: firebase.firestore.Timestamp;
}
