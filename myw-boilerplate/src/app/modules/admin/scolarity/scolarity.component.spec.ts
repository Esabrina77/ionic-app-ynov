import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarityComponent } from './scolarity.component';

describe('ScolarityComponent', () => {
  let component: ScolarityComponent;
  let fixture: ComponentFixture<ScolarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolarityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScolarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
