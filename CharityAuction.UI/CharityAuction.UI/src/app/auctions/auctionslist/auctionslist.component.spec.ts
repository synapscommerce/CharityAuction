import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionslistComponent } from './auctionslist.component';

describe('AuctionslistComponent', () => {
  let component: AuctionslistComponent;
  let fixture: ComponentFixture<AuctionslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
