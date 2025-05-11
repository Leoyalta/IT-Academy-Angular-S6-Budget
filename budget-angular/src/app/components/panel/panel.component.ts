import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { BudgetService } from '../../services/budget.service';

export interface WebDetails {
  pages: number;
  languages: number;
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
  @Output() webDetailsChange = new EventEmitter<WebDetails>();

  webForm = new FormGroup({
    pages: new FormControl(1, { nonNullable: true }),
    languages: new FormControl(1, { nonNullable: true }),
  });

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
    this.webForm.valueChanges.subscribe(() => this.emitWebData());
  }

  emitWebData(): void {
    const value = this.webForm.getRawValue();
    const price = this.budgetService.getWebPrice(value.pages, value.languages);
    this.webPriceChange.emit(price);
    this.webDetailsChange.emit(value);
  }

  openModal(): void {
    this.dialog.open(ModalComponent);
  }

  increment(field: keyof WebDetails): void {
    const value = this.webForm.get(field)?.value ?? 1;
    this.webForm.get(field)?.setValue(value + 1);
  }

  decrement(field: keyof WebDetails): void {
    const value = this.webForm.get(field)?.value ?? 1;
    if (value > 1) {
      this.webForm.get(field)?.setValue(value - 1);
    }
  }
}
