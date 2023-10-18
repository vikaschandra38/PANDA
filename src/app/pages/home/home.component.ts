import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Announcement, JobOffer } from 'src/app/_models';
import { UserService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activeImg = 'left';
  endIndex = 2;
  startIndex = 0;
  startIndexExp = 0;
  arr = [
    {
      title: 'Mon rêve était d’aller vivre en Afrique. j\'ai postulé à une offre d\'emploi pour le poste de web developer publiée sur PANDA et le mois suivant je commençais à travailler à Dakar!',
      author: 'Abdoulaye',
      img: './../../assets/images/home/s2-2.png'
    },
    {
      title: 'PANDA gives us access to the best talents in their field of activity and real prospects for collaboration!',
      author: 'Panda',
      img: './../../assets/images/home/s2-3.png'
    },
    {
      title: 'My dream was to go back to Africa. I applied for the job of web developer published on PANDA and the next month I started working in Dakar!',
      author: 'Omar Ndiaye',
      img: './../../assets/images/home/s2-1.png'
    }
  ]

  experts = [
    {
      title: 'PANDA gives us access to the best talents in their field of activity and real prospects for collaboration!',
      author: 'Abdoulaye',
      img: './../../assets/images/home/organization-lg.png'
    },
    {
      title: 'PANDA gives us access to the best talents in their field of activity and real prospects for collaboration!',
      author: 'Panda',
      img: './../../assets/images/home/organization-md.png'
    },
    {
      title: 'My dream was to go back to Africa. I applied for the job of web developer published on PANDA and the next month I started working in Dakar!',
      author: 'Omar Ndiaye',
      img: './../../assets/images/home/organization-sm.png'
    }
  ]

  businessArr = [
    {
      title: 'Renewable energy',
      img: './../../assets/images/home/agri.png'
    },
    {
      title: 'Agri-food',
      img: './../../assets/images/home/energ.png'
    },
    {
      title: 'Technology',
      img: './../../assets/images/home/sol.png'
    },
    {
      title: 'E-commerce',
      img: './../../assets/images/home/shopping-cart.png'
    },
    {
      title: 'Payment solutions',
      img: './../../assets/images/home/tech.png'
    }
  ]
  activeB = 0

  jobOffers: JobOffer[] = [
    { jobTitle: 'Lead Software Engineer', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_1.png', organizationName: 'Tubik Studio', postedOn: '1 day ago', sourceLink: '' },
    { jobTitle: 'Risk Analyst', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_2.png', organizationName: 'Bubba Gump', postedOn: '1 day ago', sourceLink: '' },
    { jobTitle: 'Financial Analyst', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_3.png', organizationName: 'SP-holding', postedOn: '1 day ago', sourceLink: '' },
    { jobTitle: 'Data Engineer', location: 'Madagascar', jobType: 'Full-time', profileImg: '../../../assets/images/home/job_4.png', organizationName: 'Vehement Capital Partners', postedOn: '1 day ago', sourceLink: '' }
  ]

  travelMapFilter = {
    startDate: '',
    endDate: '',
    selectedCountry: '',
    selectedSector: ''
  }

  countries = [{
    name: 'India',
    id: 'INR'
  }, {
    name: 'South Africa',
    id: 'SF'
  }, {
    name: 'Australia',
    id: 'Aus'
  }];

  sectors = [{
    name: 'India',
    id: 'INR'
  }, {
    name: 'South Africa',
    id: 'SF'
  }, {
    name: 'Australia',
    id: 'Aus'
  }];

  announcements: Announcement[] = [
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' },
    { profileImg: 'announcement-avatar', organizationName: 'Pablo Diahuno', jobTitle: 'PROJECT MANAGER', country: 'Morocco', sectors: [{ sectorName: 'Agri-food' }, { sectorName: 'Energy' }], postedOn: '1 day ago', announcementTitle: 'Looking for a co-founder for a hydroponics startup', announcementDescription: 'Tomorrow we will practice making different coffee recipes. It is important that you wear close-toed shoes. Please message me if you have any questions!', sourceLink: '#' }
  ]

  isMobile = false;

  constructor (
    public sharedService: SharedService,
    private userService: UserService,
    private router: Router
  ) {
    if (window.screen.width < 576) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    if (this.userService.checkLoggedIn()) {
      this.userService.getUser();
      if(this.userService.loggedInUser.type === 'company'){
        this.router.navigate(['/', 'organizations'])
      }else if(this.userService.loggedInUser.type === 'expert'){
        this.router.navigate(['/', 'experts']);
      }
    }
  }

  select(index: any) {
    this.startIndex = this.arr.findIndex(item => item === index);
  }

  selectExp(index: any) {
    this.startIndexExp = this.experts.findIndex(item => item === index);
  }

  selectBusiness(l: any) {
    this.activeB = l;
  }

  // Scroll to Section
  scrollToSection(sectionName: string): void {
    const firstElementWithError = document.querySelector('#' + sectionName);
    this.scrollTo(<Element>firstElementWithError);
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  streamOpened() { }
}
