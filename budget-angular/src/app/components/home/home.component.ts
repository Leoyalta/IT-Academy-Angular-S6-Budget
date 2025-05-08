import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  formOptions = new FormGroup({
    seo: new FormControl(false),
    ads: new FormControl(false),
    web: new FormControl(false),
  });

  totalPrice = 0;
  webPrice = 500;

  constructor() {
    this.formOptions.valueChanges.subscribe(() => this.updateTotal());

    this.formOptions.get('web')?.valueChanges.subscribe((isChecked) => {
      if (!isChecked) {
        this.webPrice = 500;
        this.updateTotal();
      }
    });
  }

  updateTotal() {
    const { seo, ads, web } = this.formOptions.value;
    this.totalPrice = 0;
    if (seo) this.totalPrice += 300;
    if (ads) this.totalPrice += 400;
    if (web) this.totalPrice += this.webPrice;
  }
  updateWebPrice(dynamicPrice: number) {
    this.webPrice = dynamicPrice > 30 ? dynamicPrice + 500 : 500;

    this.updateTotal();
  }
}
