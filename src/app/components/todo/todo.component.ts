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
  @Input() todos: Array<ITodo> = [];
  get todo() {
    return this._todo;
  }

  private _todo: ITodo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  public onCompleteTodo(todo: ITodo): void {
    todo.isCompleted = !todo.isCompleted;
    if (todo.isCompleted) {
      this.todoService.onTodoAction(this.todo.id, 'is completed');
    } else {
      this.todoService.onTodoAction(this.todo.id, 'is uncompleted');
    }
  }

  public OnArchivedTodo(todo: ITodo): void {
    let archiveAction: String;
    if(todo.isArchived === false){
      archiveAction = "archived"
    } else{
      archiveAction = "unArchived"
    }
    if (confirm(`Are you sure you want to ${archiveAction} this Todo?`)) {
      this.todo.isArchived = !this.todo.isArchived;
      if (todo.isArchived) {
        this.todoService.onTodoAction(this.todo.id, 'is archived');
      } else {
        this.todoService.onTodoAction(this.todo.id, 'is unArchived');
      }
    }
  }

  public OnDeleteTodo(): void {
    if (confirm('are you sure you want to delete this Todo?')) {
      this.todoService.deleteTodoById(this.todo.id);
      this._todo = null;
    }
  }
}
