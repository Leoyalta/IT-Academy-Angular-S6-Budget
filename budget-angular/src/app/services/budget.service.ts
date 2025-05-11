import { Injectable, signal } from '@angular/core';
import { ClientDataInt } from '../models/budget.interface';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly _budgets = signal<ClientDataInt[]>([]);

  get budgets() {
    return this._budgets.asReadonly();
  }

  getWebPrice(pages: number, langs: number): number {
    return pages * langs * 30;
  }

  addClientBudget(budget: ClientDataInt): void {
    this._budgets.update((prev) => [...prev, budget]);
  }

  getBudgetById(id: string): ClientDataInt | undefined {
    return this._budgets().find((b) => b.id === id);
  }
}
