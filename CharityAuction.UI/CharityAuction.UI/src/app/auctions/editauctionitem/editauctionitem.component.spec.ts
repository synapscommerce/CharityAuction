import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditauctionitemComponent } from './editauctionitem.component';

describe('EditauctionitemComponent', () => {
  let component: EditauctionitemComponent;
  let fixture: ComponentFixture<EditauctionitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditauctionitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditauctionitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
