import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

interface WebForm {
  numOfPages: FormControl<number>;
  numOfLangs: FormControl<number>;
}
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  @Output() webPriceChange = new EventEmitter<number>();

  webForm = new FormGroup<WebForm>({
    numOfPages: new FormControl<number>(1, { nonNullable: true }),
    numOfLangs: new FormControl<number>(1, { nonNullable: true }),
  });

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
    this.webForm.valueChanges.subscribe((value) => {
      const price = this.budgetService.getWebPrice(
        value.numOfPages || 1,
        value.numOfLangs || 1
      );
      this.webPriceChange.emit(price);
    });
  }

  openModal() {
    this.dialog.open(ModalComponent);
  }
  increment(field: keyof WebForm) {
    const value = this.webForm.get(field)?.value ?? 1;
    this.webForm.get(field)?.setValue(value + 1);
  }

  decrement(field: keyof WebForm) {
    const value = this.webForm.get(field)?.value ?? 1;
    if (value > 1) this.webForm.get(field)?.setValue(value - 1);
  }
}
