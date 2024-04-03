import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMockDataTableRowActionsComponent } from './home-mock-data-table-row-actions.component';

describe('HomeMockDataTableRowActionsComponent', () => {
  let component: HomeMockDataTableRowActionsComponent;
  let fixture: ComponentFixture<HomeMockDataTableRowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMockDataTableRowActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMockDataTableRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
