import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/_models';

@Component({
  selector: 'app-organization-private',
  templateUrl: './organization-private.component.html',
  styleUrls: ['./organization-private.component.scss']
})
export class OrganizationPrivateComponent implements OnInit {
  // jobOffers: JobOffer[] = [
  //   { jobTitle: 'Commercial Offer Manager', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_1.png', organizationName: 'Tubik Studio', postedOn: '1 day ago', sourceLink: '' },
  //   { jobTitle: 'Web Developer', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_2.png', organizationName: 'Bubba Gump', postedOn: '1 day ago', sourceLink: '' }
  // ]
  constructor() { }

  ngOnInit(): void {
  }

}
