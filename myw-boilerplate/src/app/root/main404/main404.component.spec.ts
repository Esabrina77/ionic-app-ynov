import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main404Component } from './main404.component';

describe('Main404Component', () => {
  let component: Main404Component;
  let fixture: ComponentFixture<Main404Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Main404Component]
    });
    fixture = TestBed.createComponent(Main404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
