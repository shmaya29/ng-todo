import { Injectable } from '@angular/core';
import { ITodo } from '../modules/todo.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private mock: ITodo[] = [
    {
      title: 'Lion, mountain',
      description: 'Felis concolor',
      isCompleted: true,
      isArchived: false,
      endDate: '11/19/2022',
    },
    {
      title: 'Kelp gull',
      description: 'Larus dominicanus',
      isCompleted: false,
      isArchived: false,
      endDate: '5/24/2023',
    },
    {
      title: 'Golden-mantled ground squirrel',
      description: 'Spermophilus lateralis',
      isCompleted: false,
      isArchived: true,
      endDate: '8/12/2022',
    },
    {
      title: 'Savanna fox',
      description: 'Dusicyon thous',
      isCompleted: false,
      isArchived: false,
      endDate: '6/14/2023',
    },
  ];
  private _todoSubject: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(this.mock);
  constructor() {}

  public getTodos(): Observable<Array<ITodo>>{
    return this._todoSubject.asObservable()
  }
}
