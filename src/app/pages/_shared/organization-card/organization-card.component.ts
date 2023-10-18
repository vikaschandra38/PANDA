import { Component, Input, OnInit } from '@angular/core';
import { Organization } from 'src/app/_models';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss']
})
export class OrganizationCardComponent implements OnInit {
  @Input() organization!: any;

  constructor() { }

  ngOnInit(): void {
    console.log('organization--', this.organization);
  }

}
