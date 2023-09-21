import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from '../modules/todo.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiURL = 'http://localhost:5141/api/Todos';
  constructor(private http: HttpClient) {}

  private todos: Array<ITodo> = [];

  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(
    this.todos
  );

  private _singleTodoSubject: BehaviorSubject<ITodo> = new BehaviorSubject(
    this.todos.length ? this.todos[0] : null
  );

  public async getTodos(): Promise<Observable<ITodo[]>> {
    if (!this._todoSubject.value.length) {
      try {
        const todosFromApi: Array<ITodo> = await firstValueFrom(
          this.http.get<Array<ITodo>>(this.apiURL)
        );
        if (todosFromApi && todosFromApi.length) {
          todosFromApi[0].selected = true;
          this._todoSubject.next(todosFromApi);
          this._singleTodoSubject.next(todosFromApi[0]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    return this._todoSubject.pipe(
      map((todos) => todos.filter((item) => item.isArchived === false))
    );
  }

  public async getArchiveTodos(): Promise<Observable<ITodo[]>> {
    if (!this._todoSubject.value.length) {
      try {
        const todosFromApi: Array<ITodo> = await firstValueFrom(
          this.http.get<Array<ITodo>>(this.apiURL)
        );
        if (todosFromApi && todosFromApi.length) {
          todosFromApi[0].selected = true;
          this._todoSubject.next(todosFromApi);
          this._singleTodoSubject.next(todosFromApi[0]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    return this._todoSubject.pipe(
      map((todos) => todos.filter((item) => item.isArchived === true))
    );
  }

  public async getTodayTodos(): Promise<Observable<ITodo[]>> {
    if (!this._todoSubject.value.length) {
      try {
        const todosFromApi: Array<ITodo> = await firstValueFrom(
          this.http.get<Array<ITodo>>(this.apiURL)
        );
        if (todosFromApi && todosFromApi.length) {
          todosFromApi[0].selected = true;
          this._todoSubject.next(todosFromApi);
          this._singleTodoSubject.next(todosFromApi[0]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    const currentDate = new Date();
    return this._todoSubject.pipe(
      map((todos) =>
        todos.filter((item) => {
          const endDate = new Date(item.endDate);
          return (
            endDate.getDate() === currentDate.getDate() &&
            endDate.getMonth() === currentDate.getMonth() &&
            endDate.getFullYear() === currentDate.getFullYear()
          );
        })
      )
    );
  }

  public addNewTodo(newTodo: ITodo): void {
    this.http.post(this.apiURL, newTodo).subscribe();
  }

  
  public getSelectedTodo(): Observable<ITodo> {
    return this._singleTodoSubject.asObservable();
  }

  public setSelectedTodo(todo: ITodo): void {
    this._singleTodoSubject.next(todo);
  }


  public async onTodoAction(todoId: string, action: string): Promise<void> {
    const existingTodo = this._todoSubject.value.find(
      (todo) => todo.id === todoId
    );
    if (!existingTodo) {
      console.error('Todo not found for id:', todoId);
      return;
    }
    const updatedTodo = { ...existingTodo, [action]: true };
    try {
      // Using the HttpClient with await
      await this.http.put(`${this.apiURL}/${todoId}`, updatedTodo).subscribe();
      // If the above line succeeds, then update the local state.
      const updatedTodos = this._todoSubject.value.map((todo) =>
        todo.id === todoId ? updatedTodo : todo
      );
      this._todoSubject.next(updatedTodos);
      console.log('Todo updated successfully');
    } catch (error) {
      console.error(todoId, error);
    }
  }

  
  public deleteTodoById(todoId: string): void {
    const existingTodos: Array<ITodo> = this._todoSubject.value;
    const todoIndex = existingTodos.findIndex(
      (singleTodo) => singleTodo.id === todoId
    );
    if (todoIndex !== -1) {
      existingTodos.splice(todoIndex, 1);
      this.http.delete(`${this.apiURL}/${todoId}`).subscribe(
        (response) => {
          // Upon successful update on the server, update the local state.
          this._todoSubject.next(existingTodos);
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    }
  }

  public deleteAllTodoList(): void {
    this.http.delete(this.apiURL + '/DeleteAll').subscribe();
  }
}
