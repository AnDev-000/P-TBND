import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainviewWpComponent } from './mainview-wp.component';

describe('MainviewWpComponent', () => {
  let component: MainviewWpComponent;
  let fixture: ComponentFixture<MainviewWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainviewWpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainviewWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
