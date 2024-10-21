import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregardispositivosComponent } from './agregardispositivos.component';

describe('AgregardispositivosComponent', () => {
  let component: AgregardispositivosComponent;
  let fixture: ComponentFixture<AgregardispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardispositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregardispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
