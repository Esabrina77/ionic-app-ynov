import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleModuleComponent } from './example-module.component';

describe('ExampleModuleComponent', () => {
  let component: ExampleModuleComponent;
  let fixture: ComponentFixture<ExampleModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
