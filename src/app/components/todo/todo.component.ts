import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from 'src/app/modules/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() set todo(todo: ITodo) {
    this._todo = todo;
  }

  get todo() {
    return this._todo;
  }

  private _todo: ITodo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  public onCompleteTodo(todo: ITodo): void {
    todo.isCompleted = true;
    this.todoService.onTodoAction(todo.id, 'is completed');
  }

  public OnArchivedTodo(): void {
    this.todo.isArchived = true;
    this.todoService.onTodoAction(this.todo.id, 'is Archived');
  }
}
