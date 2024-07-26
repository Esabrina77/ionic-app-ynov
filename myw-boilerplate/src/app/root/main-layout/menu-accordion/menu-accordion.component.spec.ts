import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccordionComponent } from './menu-accordion.component';

describe('MenuAccordionComponent', () => {
  let component: MenuAccordionComponent;
  let fixture: ComponentFixture<MenuAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAccordionComponent]
    });
    fixture = TestBed.createComponent(MenuAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
