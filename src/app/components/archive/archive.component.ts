import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/modules/todo.interface';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit, OnDestroy {



  private subscription: Subscription = new Subscription();

  @Input() set todo(todo: ITodo) {
    this._todo = todo;
    console.log(todo.endDate);
  }
  @Input() todos: Array<ITodo> = [];
  get todo() {
    return this._todo;
  }

  private _todo: ITodo;

  constructor(public dialog: MatDialog, private todoService: TodoService,) {
  
  }

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getSelectedTodo().subscribe((data) => {
        this.todo = data;
      })
    );

    this.subscription.add(
      this.todoService.getTodos().subscribe((data) => {
        this.todos = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public OnDeleteTodo(): void {
    if (confirm('are you sure you want to delete this Todo?')) {
      this.todoService.deleteTodoById(this.todo.id);
      this._todo = null;
    }
  }

  public OnTodoClick(todo: ITodo, index: number): void {
    this.todoService.setSelectedTodo(todo);
    this.todos.forEach((todo) => {
      if (todo.selected) {
        todo.selected = false;
      }
    });

    this.todos[index].selected = true;
  }
}
