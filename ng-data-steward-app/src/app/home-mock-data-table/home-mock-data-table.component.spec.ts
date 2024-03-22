import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMockDataTableComponent } from './home-mock-data-table.component';

describe('HomeMockDataTableComponent', () => {
  let component: HomeMockDataTableComponent;
  let fixture: ComponentFixture<HomeMockDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMockDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMockDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
