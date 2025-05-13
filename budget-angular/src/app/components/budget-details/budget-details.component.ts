import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClientDataInt } from '../../models/budget.interface';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.scss',
})
export class BudgetDetailsComponent {
  budget: ClientDataInt | undefined;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.budget = id ? this.budgetService.getBudgetById(id) : undefined;
  }
}
