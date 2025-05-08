import { Injectable } from '@angular/core';
import { budgetInerface } from '../models/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  getWebPrice(pages: number, langs: number): number {
    const webPrice = pages * langs * 30;
    return webPrice;
  }
}
