import { Component, OnInit } from '@angular/core';
import { Expert, Event, Announcement } from 'src/app/_models';
import { CompanyService } from 'src/app/_services';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  experts = [];
  totalPages: number = 0;
  numbersArray: number[] = [];
  announcements: Announcement[] = [
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' }
  ]

  events: Event[] = [
    { userName: 'Pablo Diahuno', profileImg: '../../../assets/images/organizations/event-avatar-1.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-1.png', sourceLink: '' },
    { userName: 'Maria Odobescu', profileImg: '../../../assets/images/organizations/event-avatar-2.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-2.png', sourceLink: '' },
    { userName: 'African actor', profileImg: '../../../assets/images/organizations/event-avatar-3.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-3.png', sourceLink: '' },
    { userName: 'Artur Pirajkov', profileImg: '../../../assets/images/organizations/event-avatar-4.png', eventTitle: `The Nancy party 's`, eventDate: '10/07/22', location: 'Senegal', eventDescription: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.', eventBanner: '../../../assets/images/organizations/event-4.png', sourceLink: '' }
  ]
  expertPage = 1;
  constructor(
    public companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getExperts(this.expertPage);
  }

  getExperts(page: any) {
    this.companyService.getAllExperts(page).subscribe(
      exp => {
        console.log('exp', exp);
        if (exp.success) {
          this.experts = exp.data.experts;
          this.totalPages = exp.data.total;
          this.numbersArray = Array.from({ length: this.totalPages }, (_, index) => index + 1)
        }
      }
    )
  }
}
