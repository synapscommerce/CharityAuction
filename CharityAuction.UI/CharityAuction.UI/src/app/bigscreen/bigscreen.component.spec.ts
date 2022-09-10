import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigscreenComponent } from './bigscreen.component';

describe('BigscreenComponent', () => {
  let component: BigscreenComponent;
  let fixture: ComponentFixture<BigscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
