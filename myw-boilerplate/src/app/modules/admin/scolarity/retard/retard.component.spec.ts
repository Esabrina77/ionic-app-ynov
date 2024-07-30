import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetardComponent } from './retard.component';

describe('RetardComponent', () => {
  let component: RetardComponent;
  let fixture: ComponentFixture<RetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch retards on init', () => {
    spyOn(component, 'fetchRetards');
    component.ngOnInit();
    expect(component.fetchRetards).toHaveBeenCalled();
  });

  it('should handle fetch error', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject('API is down'));
    component.fetchRetards();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('An error occurred while fetching the data.');
  });
});
