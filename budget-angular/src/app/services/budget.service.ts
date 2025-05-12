import { Injectable, signal } from '@angular/core';
import { ClientDataInt } from '../models/budget.interface';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly _budgets = signal<ClientDataInt[]>([]);
  private readonly _originalBudgets = signal<ClientDataInt[]>([]);

  get budgets() {
    return this._budgets.asReadonly();
  }

  getWebPrice(pages: number, langs: number): number {
    return pages * langs * 30;
  }

  addClientBudget(budget: ClientDataInt): void {
    this._budgets.update((prev) => {
      const updated = [...prev, budget];
      this._originalBudgets.set(updated);
      return updated;
    });
  }

  getBudgetById(id: string): ClientDataInt | undefined {
    return this._budgets().find((b) => b.id === id);
  }

  sortBudgets(by: 'date' | 'price' | 'name') {
    this._budgets.update((prev) => {
      const sorted = [...prev];

      switch (by) {
        case 'date':
          return sorted.sort(
            (a, b) =>
              new Date(b.exactTime).getTime() - new Date(a.exactTime).getTime()
          );
        case 'price':
          return sorted.sort((a, b) => b.budget - a.budget);
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
          return prev;
      }
    });
  }
  filterBudgetsByName(searchTerm: string) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      this._budgets.set(this._originalBudgets()); // скидання до початкового
      return;
    }

    const filtered = this._originalBudgets().filter((b) =>
      b.name.toLowerCase().includes(term)
    );

    this._budgets.set(filtered);
  }
}
