import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetsListComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'budget-angular';
}
