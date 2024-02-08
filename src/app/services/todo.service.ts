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
          this._todoSubject.next(todosFromApi);
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
          this._todoSubject.next(todosFromApi);
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
          this._todoSubject.next(todosFromApi);
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

  public async getTodosByTitle(title: string): Promise<Observable<ITodo[]>> {
    if (!this._todoSubject.value.length) {
      try {
        const todosFromApi: Array<ITodo> = await firstValueFrom(
          this.http.get<Array<ITodo>>(this.apiURL)
        );
        if (todosFromApi && todosFromApi.length) {
          this._todoSubject.next(todosFromApi);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    return this._todoSubject.pipe(
      map((todos) => todos.filter((item) => item.title.includes(title)))
    );
  }

  public addNewTodo(newTodo: ITodo): void {
    this.http.post<ITodo>(this.apiURL, newTodo).subscribe({
      next: (addedTodo) => {
        const updatedTodos = [...this._todoSubject.value, addedTodo];
        this._todoSubject.next(updatedTodos);
      },
      error: (error) => {
        console.error('Error while adding todo:', error);
      },
    });
  }

  public setSelectedTodo(todo: ITodo): void {
    this._singleTodoSubject.next(todo);
  }

  public getSelectedTodo(): Observable<ITodo> {
    return this._singleTodoSubject.asObservable();
  }

  public async onTodoAction(todoId: string, action: string): Promise<void> {
    const existingTodo = this._todoSubject.value.find(
      (todo) => todo.id === todoId
    );
    if (!existingTodo) {
      console.error('Todo not found for id:', todoId);
      return;
    }
    const updatedTodo = { ...existingTodo, [action]: !existingTodo[action] };

    try {
      await this.http.put(`${this.apiURL}/${todoId}`, updatedTodo).subscribe();
      const updatedTodos = this._todoSubject.value.map((todo) =>
        todo.id === todoId ? updatedTodo : todo
      );
      this._todoSubject.next(updatedTodos);
      this._singleTodoSubject.next(updatedTodo);

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
