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
    expect(component.webForm.contains('pages')).toBeTrue();
    expect(component.webForm.contains('pages')).toBeTrue();
  });

  it('should increment and decrement pages', () => {
    const initial = component.webForm.get('pages')!.value || 1;

    component.increment('pages');
    expect(component.webForm.get('pages')!.value).toBe(initial + 1);

    component.decrement('pages');
    expect(component.webForm.get('pages')!.value).toBe(initial);
  });

  it('should increment and decrement languages', () => {
    const initial = component.webForm.get('')!.value || 1;

    component.increment('languages');
    expect(component.webForm.get('languages')!.value).toBe(initial + 1);

    component.decrement('languages');
    expect(component.webForm.get('languages')!.value).toBe(initial);
  });

  it('should call openModal on info icon click', () => {
    spyOn(component, 'openModal');
    const infoIcons = fixture.debugElement.queryAll(By.css('.info'));
    infoIcons[0].nativeElement.click();
    expect(component.openModal).toHaveBeenCalled();
  });
});
