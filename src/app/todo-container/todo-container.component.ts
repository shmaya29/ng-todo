import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from '../components/new-todo/new-todo.component';
import { TodoService } from '../services/todo.service';
import { Subscription } from 'rxjs';
import { ITodo } from '../modules/todo.interface';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodoContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public todo: ITodo;
  public todos: ITodo[];

  constructor(public dialog: MatDialog, private todoService: TodoService) {}

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

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewTodoComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
