import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'budgetList', component: BudgetsListComponent },
  { path: '**', component: NotFoundPageComponent },
];
