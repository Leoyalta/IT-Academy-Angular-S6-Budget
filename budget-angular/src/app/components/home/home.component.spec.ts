import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PanelComponent } from '../panel/panel.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPrice correctly when all options are selected', () => {
    component.formOptions.setValue({ seo: true, ads: true, web: true });
    component.updateTotal();
    expect(component.totalPrice).toBe(300 + 400 + 500);
  });

  it('should reset webPrice to 500 when web is unchecked', () => {
    component.updateWebPrice(800);
    component.formOptions.get('web')?.setValue(false);
    expect(component.webPrice).toBe(500);
  });

  it('should set webPrice dynamically based on value', () => {
    component.updateWebPrice(50);
    expect(component.webPrice).toBe(550);

    component.updateWebPrice(10);
    expect(component.webPrice).toBe(500);
  });
});
