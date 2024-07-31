import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsenceComponent } from './absence.component';

describe('AbsenceComponent', () => {
  let component: AbsenceComponent;
  let fixture: ComponentFixture<AbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbsenceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch absences on init', () => {
    spyOn(component, 'fetchabsences');
    component.ngOnInit();
    expect(component.fetchabsences).toHaveBeenCalled();
  });

  it('should handle fetch error', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject('API is down'));
    component.fetchabsences();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('An error occurred while fetching the data.');
  });
});
