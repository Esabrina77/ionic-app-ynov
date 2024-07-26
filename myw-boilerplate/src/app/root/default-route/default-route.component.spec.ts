import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRouteComponent } from './default-route.component';

describe('DefaultRouteComponent', () => {
  let component: DefaultRouteComponent;
  let fixture: ComponentFixture<DefaultRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
