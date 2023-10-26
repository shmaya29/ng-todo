import { Routes } from '@angular/router';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TodayComponent } from './components/today/today.component';
import { SearchComponent } from './components/search/search.component';
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
    title: 'Today Page',
  },
  {
    path: 'search',
    component: SearchComponent,
    title: 'Search Page',
  },
];

export default routeConfig;
