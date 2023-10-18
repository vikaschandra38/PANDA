import { ExpertService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { Organization, JobOffer, Event, Announcement } from 'src/app/_models';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {
  companyPage = 1;
  totalCompany = 1;
  totalPages:any = [];
  organizations: any

  jobOffers: JobOffer[] = [
    { jobTitle: 'Lead Software Engineer', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_1.png', organizationName: 'Tubik Studio', postedOn: ' 1 day ago', sourceLink: '' },
    { jobTitle: 'Risk Analyst', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_2.png', organizationName: 'Bubba Gump', postedOn: ' 1 day ago', sourceLink: '' },
    { jobTitle: 'Distribution Executive', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_3.png', organizationName: 'Hooli', postedOn: ' 1 day ago', sourceLink: '' },
    { jobTitle: 'Financial Analyst', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_4.png', organizationName: 'SP-holding', postedOn: ' 1 day ago', sourceLink: '' },
    { jobTitle: 'Data Engineer', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_5.png', organizationName: 'Vehement Capital Partners', postedOn: ' 1 day ago', sourceLink: '' },
    { jobTitle: 'Commercial Offer Manager', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/experts/job_6.png', organizationName: 'J-Texon', postedOn: ' 1 day ago', sourceLink: '' }
  ]

  events: Event[] = [
    { userName: 'Pablo Diahuno', profileImg: '../../../assets/images/organizations/event-avatar-1.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-1.png', sourceLink: '' },
    { userName: 'Maria Odobescu', profileImg: '../../../assets/images/organizations/event-avatar-2.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-2.png', sourceLink: '' },
    { userName: 'African actor', profileImg: '../../../assets/images/organizations/event-avatar-3.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-3.png', sourceLink: '' },
    { userName: 'Artur Pirajkov', profileImg: '../../../assets/images/organizations/event-avatar-4.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-4.png', sourceLink: '' }
  ]

  announcements: Announcement[] = [
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' }
  ]

  constructor(
    public expertService: ExpertService
  ) {
    this.getCompanies(this.companyPage);
   }

  ngOnInit(): void {
  }

  getCompanies(companyPage: number) {
    this.expertService.getAllOrganizations(companyPage).subscribe(
      res => {
        console.log('com list->', res);
        if (res.success) {
          this.organizations = res.data.company;
          this.totalCompany = res.data.total;
          const itemsPerPage = 6;
          const numberOfPages = Math.ceil(this.totalCompany / itemsPerPage);
          console.log(numberOfPages);
          this.totalPages = new Array(this.totalPages);
          console.log(new Array(this.totalPages))
        }
      }
    )
  }

  changePage(page: any) {
    this.getCompanies(page);
  }

}
