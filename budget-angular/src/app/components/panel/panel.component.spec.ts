import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.webForm.contains('numOfPages')).toBeTrue();
    expect(component.webForm.contains('numOfLangs')).toBeTrue();
  });

  it('should increment and decrement numOfPages', () => {
    const initial = component.webForm.get('numOfPages')!.value || 1;

    component.increment('numOfPages');
    expect(component.webForm.get('numOfPages')!.value).toBe(initial + 1);

    component.decrement('numOfPages');
    expect(component.webForm.get('numOfPages')!.value).toBe(initial);
  });

  it('should increment and decrement numOfLangs', () => {
    const initial = component.webForm.get('numOfLangs')!.value || 1;

    component.increment('numOfLangs');
    expect(component.webForm.get('numOfLangs')!.value).toBe(initial + 1);

    component.decrement('numOfLangs');
    expect(component.webForm.get('numOfLangs')!.value).toBe(initial);
  });

  it('should call openModal on info icon click', () => {
    spyOn(component, 'openModal');
    const infoIcons = fixture.debugElement.queryAll(By.css('.info'));
    infoIcons[0].nativeElement.click();
    expect(component.openModal).toHaveBeenCalled();
  });
});
