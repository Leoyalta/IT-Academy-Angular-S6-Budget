import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { WebDetails } from '../panel/panel.component';

import { BudgetService } from '../../services/budget.service';
import { ClientDataInt } from '../../models/budget.interface';
import { v4 as uuidv4 } from 'uuid';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelComponent,
    MatSnackBarModule,
    BudgetsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  formOptions = new FormGroup({
    seo: new FormControl(false),
    ads: new FormControl(false),
    web: new FormControl(false),
  });

  userData = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{6,15}$/),
      Validators.minLength(6),
    ]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  totalPrice = 0;
  webPrice = 500;
  webDetails: WebDetails | null = null;
  budgetHistory: Signal<ClientDataInt[]>;

  constructor(
    private budgetService: BudgetService,
    private snackBar: MatSnackBar
  ) {
    this.formOptions.valueChanges.subscribe(() => this.updateTotal());

    this.formOptions.get('web')?.valueChanges.subscribe((isChecked) => {
      if (!isChecked) {
        this.webPrice = 500;
        this.updateTotal();
      }
    });
    this.budgetHistory = this.budgetService.budgets;
  }

  updateTotal() {
    const { seo, ads, web } = this.formOptions.value;
    this.totalPrice = 0;
    if (seo) this.totalPrice += 300;
    if (ads) this.totalPrice += 400;
    if (web) this.totalPrice += this.webPrice;
  }
  updateWebDetails(details: WebDetails) {
    this.webDetails = details;
  }
  isAnyOptionSelected(): boolean {
    const { seo, ads, web } = this.formOptions.value;

    return !!(seo || ads || web);
  }
  updateWebPrice(dynamicPrice: number) {
    this.webPrice = dynamicPrice > 30 ? dynamicPrice + 500 : 500;

    this.updateTotal();
  }

  onDataSubmit() {
    if (
      !this.userName?.value ||
      !this.userPhone?.value ||
      !this.userEmail?.value
    )
      return;

    const budget: ClientDataInt = {
      id: uuidv4(),
      name: this.userName.value,
      phone: this.userPhone.value,
      email: this.userEmail.value,
      budget: this.totalPrice,
      exactTime: new Date(),
      services: {
        web:
          this.formOptions.value.web && this.webDetails
            ? this.webDetails
            : undefined,
        seo: this.formOptions.value.seo || false,
        ads: this.formOptions.value.ads || false,
      },
    };

    this.budgetService.addClientBudget(budget);

    this.snackBar.open('✅ Pressupost guardat correctament!', 'Tancar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.formOptions.reset({ seo: false, ads: false, web: false });
    this.userData.reset();
  }

  get userName() {
    return this.userData.get('userName');
  }
  get userPhone() {
    return this.userData.get('userPhone');
  }
  get userEmail() {
    return this.userData.get('userEmail');
  }
}
