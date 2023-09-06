import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  public deleteAllTodoList():void{
    if(confirm("are you sure you want to delete all???"))
    localStorage.clear();
  }
  public openArchiveList():void{
    this.router.navigate(['/archive']);
  }

  public openHome():void{
    this.router.navigate(['']);
  }

  public openToday():void{
    this.router.navigate(['/today']);
  }
}
