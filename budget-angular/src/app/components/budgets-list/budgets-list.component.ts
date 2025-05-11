import { Component, Signal, computed } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { ClientDataInt } from '../../models/budget.interface';

@Component({
  selector: 'app-budgets-list',
  imports: [CommonModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  budgetHistory: Signal<ClientDataInt[]>;

  constructor(private budgetService: BudgetService) {
    this.budgetHistory = this.budgetService.budgets;
  }
}
