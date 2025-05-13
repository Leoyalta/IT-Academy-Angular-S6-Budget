import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { BudgetDetailsComponent } from './components/budget-details/budget-details.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'wellcome', component: WellcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'budgetList', component: BudgetsListComponent },
  { path: 'budget/:id', component: BudgetDetailsComponent },
  { path: '**', component: NotFoundPageComponent },
];
