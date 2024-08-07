import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProducComponent } from './table-produc.component';

describe('TableProducComponent', () => {
  let component: TableProducComponent;
  let fixture: ComponentFixture<TableProducComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProducComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableProducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
