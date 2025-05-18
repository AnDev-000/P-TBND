import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWpComponent } from './navbar-wp.component';

describe('NavbarWpComponent', () => {
  let component: NavbarWpComponent;
  let fixture: ComponentFixture<NavbarWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
