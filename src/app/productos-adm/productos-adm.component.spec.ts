import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdmComponent } from './productos-adm.component';

describe('ProductosAdmComponent', () => {
  let component: ProductosAdmComponent;
  let fixture: ComponentFixture<ProductosAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
