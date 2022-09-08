import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditauctionComponent } from './editauction.component';

describe('EditauctionComponent', () => {
  let component: EditauctionComponent;
  let fixture: ComponentFixture<EditauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
