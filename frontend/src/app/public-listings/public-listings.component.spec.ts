import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicListingsComponent } from './public-listings.component';

describe('PublicListingsComponent', () => {
  let component: PublicListingsComponent;
  let fixture: ComponentFixture<PublicListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
