import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCompanyComponent } from './service-company.component';

describe('ServiceCompanyComponent', () => {
  let component: ServiceCompanyComponent;
  let fixture: ComponentFixture<ServiceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
