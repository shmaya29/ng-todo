import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
