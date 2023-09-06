import { Routes } from '@angular/router';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TodayComponent } from './components/today/today.component';
const routeConfig: Routes = [
  {
    path: '',
    component: TodoContainerComponent,
    title: 'Home page',
  },
  {
    path: 'archive',
    component: ArchiveComponent,
    title: 'Archive Page',
  },
  {
    path: 'today',
    component: TodayComponent,
    title: 'Today Page'
  },
];

export default routeConfig;
