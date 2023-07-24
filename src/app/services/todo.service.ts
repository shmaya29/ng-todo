import { Injectable } from '@angular/core';
import { ITodo } from '../modules/todo.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private mock: ITodo[] = [
    {
      title: 'Lion, mountain',
      description: 'Felis concolor',
      isCompleted: false,
      isArchived: false,
      endDate: '11/19/2022',
      selected: true
    },
    {
      title: 'Kelp gull',
      description: 'Larus dominicanus',
      isCompleted: false,
      isArchived: false,
      endDate: '5/24/2023',
      selected: false
    },
    {
      title: 'Golden-mantled ground squirrel',
      description: 'Spermophilus lateralis',
      isCompleted: false,
      isArchived: true,
      endDate: '8/12/2022',
      selected: false
    },
    {
      title: 'Savanna fox',
      description: 'Dusicyon thous',
      isCompleted: false,
      isArchived: false,
      endDate: '6/14/2023',
      selected: false
    },
    {
      title: 'Lion, mountain',
      description: 'Felis concolor',
      isCompleted: false,
      isArchived: false,
      endDate: '11/19/2022',
      selected: false
    },
    {
      title: 'Kelp gull',
      description: 'Larus dominicanus',
      isCompleted: false,
      isArchived: false,
      endDate: '5/24/2023',
      selected: false
    },
    {
      title: 'Golden-mantled ground squirrel',
      description: 'Spermophilus lateralis',
      isCompleted: false,
      isArchived: true,
      endDate: '8/12/2022',
      selected: false
    },
    {
      title: 'Savanna fox',
      description: 'Dusicyon thous',
      isCompleted: false,
      isArchived: false,
      endDate: '6/14/2023',
      selected: false
    },
  ];
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(this.mock);

  private _singleTodoSubject: BehaviorSubject<ITodo> = new BehaviorSubject(this.mock[0])

  constructor() {}

  public getTodos(): Observable<Array<ITodo>>{
    return this._todoSubject.asObservable()
  }

  public getSelectedTodo():Observable<ITodo>{
     return this._singleTodoSubject.asObservable()
  }

  public setSelectedTodo(todo:ITodo){
    this._singleTodoSubject.next(todo)
  }
}
