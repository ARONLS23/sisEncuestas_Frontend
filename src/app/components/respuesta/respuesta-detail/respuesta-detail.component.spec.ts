import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaDetailComponent } from './respuesta-detail.component';

describe('RespuestaDetailComponent', () => {
  let component: RespuestaDetailComponent;
  let fixture: ComponentFixture<RespuestaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RespuestaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
