import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private dbReference = this.db.collection<TodoModel>('todos');
  private todos: Observable<TodoModel[]>;

  constructor(private db: AngularFirestore) {
    this.todos = this.db
      .collection<TodoModel>('todos', ref => ref.where('isDeleted', '==', false).orderBy('order', 'asc'))
      .snapshotChanges()
      .pipe(
        map((rawResponse: any[]) => {
          return rawResponse.map(reponseModel => {
            const data = reponseModel.payload.doc.data() as TodoModel;
            const id = reponseModel.payload.doc.id;

            return { id, ...data } as TodoModel;
          });
        })
      );
  }

  public getTodosList(): Observable<TodoModel[]> {
    return this.todos;
  }

  public create(todo: TodoModel): Promise<DocumentReference> {
    return this.dbReference.add({ ...todo });
  }

  public update(model: TodoModel): Promise<void> {
    const { id, ...modelWithoutId } = model;

    return this.dbReference.doc(id).update(modelWithoutId);
  }

  public delete(model: TodoModel): Promise<void> {
    const { id, ...modelWithoutId } = model;
    modelWithoutId.isDeleted = true;

    return this.dbReference.doc(id).update(modelWithoutId);
  }
}
