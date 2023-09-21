import { Component, OnDestroy, OnInit } from '@angular/core';
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

  public todo: ITodo;
  public todos: ITodo[];

  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  async ngOnInit(): Promise<void> {
    this.subscription.add(
      this.todoService.getSelectedTodo().subscribe((data) => {
        this.todo = data;
      })
    );

    this.subscription.add(
      (await this.todoService.getArchiveTodos()).subscribe((data) => {
        this.todos = data;
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
