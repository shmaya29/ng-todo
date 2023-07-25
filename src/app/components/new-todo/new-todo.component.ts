import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatEndDate } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ITodo } from 'src/app/modules/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor(public dialog: MatDialog, private todoService: TodoService) {}
  ngOnInit(): void {}

  public onNewTodoSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.form.value;

      const newTodo: ITodo = {
        id: uuidv4(),
        title: formValue.title,
        description: formValue.description,
        isCompleted: false,
        isArchived: false,
        endDate: formValue.Date,
        selected: false,
      };

      this.todoService.addNewTodo(newTodo);
      this.dialog.closeAll();
    }
  }
}
