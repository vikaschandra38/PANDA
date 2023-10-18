import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPrivateComponent } from './organization-private.component';

describe('OrganizationPrivateComponent', () => {
  let component: OrganizationPrivateComponent;
  let fixture: ComponentFixture<OrganizationPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
