import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminLoginComponent } from './header-admin-login.component';

describe('HeaderAdminLoginComponent', () => {
  let component: HeaderAdminLoginComponent;
  let fixture: ComponentFixture<HeaderAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAdminLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
