import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/modules/todo.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public todo: ITodo;
  public todos: ITodo[] = [];
  public todoByTitle: string = '';

  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getSelectedTodo().subscribe((data) => {
       this.todo = data;
      })
    );
  }

  async onSearch(): Promise<void> {
    this.subscription.add(
      (await this.todoService.getTodosByTitle(this.todoByTitle)).subscribe({
        next: (data) => {
          this.todos = data;
        },
        error: (error) => {
          console.error('Error fetching todos by title:', error);
        }
      })
    );
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
