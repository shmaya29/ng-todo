import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private todoService: TodoService) {}

  public deleteAll(): void {
    if (confirm('are you sure you want to delete all???'))
       this.todoService.deleteAllTodoList();
    //localStorage.clear();
  }
  public openArchiveList(): void {
    this.router.navigate(['/archive']);
  }

  public openHome(): void {
    this.router.navigate(['']);
  }

  public openToday(): void {
    this.router.navigate(['/today']);
  }
}
