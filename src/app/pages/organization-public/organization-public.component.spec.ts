import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPublicComponent } from './organization-public.component';

describe('OrganizationPublicComponent', () => {
  let component: OrganizationPublicComponent;
  let fixture: ComponentFixture<OrganizationPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
