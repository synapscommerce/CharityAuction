import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionitemslistComponent } from './auctionitemslist.component';

describe('AuctionitemslistComponent', () => {
  let component: AuctionitemslistComponent;
  let fixture: ComponentFixture<AuctionitemslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionitemslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionitemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
