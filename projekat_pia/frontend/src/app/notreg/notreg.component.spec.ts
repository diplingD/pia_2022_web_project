import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotregComponent } from './notreg.component';

describe('NotregComponent', () => {
  let component: NotregComponent;
  let fixture: ComponentFixture<NotregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
