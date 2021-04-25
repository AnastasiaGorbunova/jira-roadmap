import OrderByDirection = firebase.firestore.OrderByDirection;
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  CollectionReference,
  DocumentReference,
  DocumentData,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

export interface FanOutWrite {
  path: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  get deleteField() {
    return firebase.firestore.FieldValue.delete();
  }

  get firestoreRef(): AngularFirestore {
    return this.firestore;
  }

  async deleteDocument<T>(
    collectionPath: string,
    documentId: string
  ): Promise<any> {
    return await this.firestore.collection(collectionPath)
      .doc(documentId)
      .delete();
  }

  get timestamp(): firebase.firestore.FieldValue {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  delete(ref: string): Promise<void> {
    return this.firestore.doc(ref).delete();
  }

  getPushId(): string {
    return this.firestore.createId();
  }

  handleError(error: any): Observable<any> {
    return of(error);
  }

  arrayUnion(value: any): firebase.firestore.FieldValue {
    return firebase.firestore.FieldValue.arrayUnion(value);
  }

  runTransaction<T>(
    updateFunction: (transaction: any) => Promise<T>
  ): Promise<T> {
    return this.firestore.firestore.runTransaction(updateFunction);
  }

  createBatch() {
    return this.firestore.firestore.batch();
  }

  dateToFirestoreTimestamp(date: Date): firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.fromDate(date);
  }

  async addDocument<T>(collectionPath: string, data: T): Promise<string> {
    return (await this.firestore.collection<T>(collectionPath).add(data)).id;
  }

  addDocumentWithId<T>(
    collectionPath: string,
    id: string,
    data: T
  ): Promise<void> {
    return this.set(`${collectionPath}/${id}`, data);
  }

  getDocumentById<T>(collectionPath: string, id: string): Observable<T | null> {
    return this.firestore
      .doc<T>(`${collectionPath}/${id}`)
      .snapshotChanges()
      .pipe(
        map((snapshot: any) => {
          return snapshot.payload.exists
            ? {
                ...(snapshot.payload.data() as T),
                id: snapshot.payload.id,
              }
            : null;
        })
      );
  }

  getDocumentsByProperty<T>(
    path: string,
    property: string,
    value: any
  ): Observable<T[]> {
    return this.firestore
      .collection<T>(path, (ref) => ref.where(property, '==', value))
      .snapshotChanges()
      .pipe(map(this.mapKeysToCollectionObjects));
  }

  getDocumentsBySeveralProperties<T extends DocumentData>(
    path: string,
    property: string,
    value: any,
    additionalProperty: string,
    additionalValue: any
  ): Observable<T[]> {
    return this.firestore
      .collection<T>(path, (ref) =>
        ref
          .where(property, '==', value)
          .where(additionalProperty, '==', additionalValue)
      )
      .snapshotChanges()
      .pipe(map(this.mapKeysToCollectionObjects));
  }

  getDocumentsByArrayContains<T>(
    path: string,
    property: string,
    value: any
  ): Observable<T[]> {
    return this.firestore
      .collection<T>(path, (ref) =>
        ref.where(property, 'array-contains', value)
      )
      .snapshotChanges()
      .pipe(map(this.mapKeysToCollectionObjects), catchError(this.handleError));
  }

  getCollectionRef<T>(ref: string): CollectionReference {
    return this.firestore.collection<T>(ref).ref;
  }

  getCollection<T>(
    ref: string,
    sortByField?: string,
    sortDirection: OrderByDirection = 'asc'
  ): Observable<T[]> {
    const collectionRef = !!sortByField
      ? this.firestore.collection<T>(ref, (ref) =>
          ref.orderBy(sortByField, sortDirection)
        )
      : this.firestore.collection<T>(ref);
    return collectionRef
      .snapshotChanges()
      .pipe(map(this.mapKeysToCollectionObjects));
  }

  getDocumentRef<T>(ref: string): DocumentReference {
    return this.firestore.doc<T>(ref).ref;
  }

  getDocument<T>(ref: string): Observable<T | null> {
    return this.firestore
      .doc<T>(ref)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.payload.exists
            ? {
                ...(snapshot.payload.data() as T),
                id: snapshot.payload.id,
              }
            : null;
        }),
        catchError(this.handleError)
      );
  }

  update<T>(ref: string, data: T): Promise<void> {
    return this.firestore.doc(ref).set(data, { merge: true });
  }

  updateDocument<T>(ref: string, data: T): Promise<void> {
    return this.firestore.doc(ref).update(data);
  }

  async upsert<T>(ref: string, data: T): Promise<void> {
    const existingDocument = await this.firestore
      .doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();
    return existingDocument.payload.exists
      ? this.update(ref, data)
      : this.set(ref, data);
  }

  writeBatch(fanOutWrites: FanOutWrite[]): Promise<void> {
    const batch = this.createBatch();
    fanOutWrites.forEach((fanOutWrite) => {
      batch.set(
        this.firestore.firestore.doc(fanOutWrite.path),
        fanOutWrite.data,
        { merge: true }
      );
    });
    return batch.commit();
  }

  deleteBatch(fanOutDeletes: FanOutWrite[]): Promise<void> {
    const batch = this.createBatch();
    fanOutDeletes.forEach((fanOutDelete) => {
      if (!!fanOutDelete.data) {
        const propertyToDelete = { [fanOutDelete.data]: this.deleteField };
        batch.update(
          this.firestore.firestore.doc(fanOutDelete.path),
          propertyToDelete
        );
      } else {
        batch.delete(this.firestore.firestore.doc(fanOutDelete.path));
      }
    });
    return batch.commit();
  }

  private mapKeysToCollectionObjects<T>(
    actions: DocumentChangeAction<T>[]
  ): T[] {
    return actions.map((action: DocumentChangeAction<T>) => {
      const data = action.payload.doc.data() as T;
      const id = action.payload.doc.id;
      return {
        ...data,
        id,
      };
    });
  }

  private set<T>(ref: string, data: T): Promise<void> {
    return this.firestore.doc(ref).set(data);
  }
}
