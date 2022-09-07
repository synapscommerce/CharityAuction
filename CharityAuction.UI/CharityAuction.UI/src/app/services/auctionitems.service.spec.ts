import { TestBed } from '@angular/core/testing';

import { AuctionitemsService } from './auctionitems.service';

describe('AuctionitemsService', () => {
  let service: AuctionitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
