import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { ClientDataInt } from '../../models/budget.interface';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  budgetHistory: Signal<ClientDataInt[]>;

  constructor(private budgetService: BudgetService) {
    this.budgetHistory = this.budgetService.budgets;
  }

  orderBudgets(by: 'date' | 'price' | 'name') {
    this.budgetService.sortBudgets(by);
  }

  searchByName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.budgetService.filterBudgetsByName(value);
  }
}
