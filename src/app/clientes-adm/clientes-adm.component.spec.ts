import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAdmComponent } from './clientes-adm.component';

describe('ClientesAdmComponent', () => {
  let component: ClientesAdmComponent;
  let fixture: ComponentFixture<ClientesAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
