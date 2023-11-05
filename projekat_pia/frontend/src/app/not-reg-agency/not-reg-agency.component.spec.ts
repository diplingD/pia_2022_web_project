import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRegAgencyComponent } from './not-reg-agency.component';

describe('NotRegAgencyComponent', () => {
  let component: NotRegAgencyComponent;
  let fixture: ComponentFixture<NotRegAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotRegAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotRegAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
