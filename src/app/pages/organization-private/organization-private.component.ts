import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobOffer } from 'src/app/_models';
import { CompanyService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';

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
  myJobs: any = [];
  selectedNews = 0;
  selectedEvent = 0;
  myNews = [
    {
      newsTitle: 'Today we have open a new Subsidiary in Dakar!',
      date: '10/07/22',
      location: 'Dakar',
      description: 'The CSS agro-industrial complex was created in 1970. It consists of: a cane crushing entity; a refinery; a distillery for the production of ethanol; and an energy production unit comprising a bagasse boiler producing 150 tons / hour of steam and a 25 megawatt turbo- alternator which has made it possible to obtain from the clean development mechanism(CDM) in Bonn, 40, 000 tons of carbon credits. CSS is one of the most successful sweets in the world.It owes this to its advanced technology, its high quality human resources and an adequate and peaceful working environment.The company offers career prospects for almost all trades.It is autonomous and hardly needs external services to operate, hence the interest in diversified profiles allowing it to be aligned with current and future technologies.There is a real need for skills, in particular engineers and technicians to stay the course.'
    },
    {
      newsTitle: 'Today we have open a new Subsidiary in Dakar!',
      date: '10/07/22',
      location: 'Dakar',
      description: 'The CSS agro-industrial complex was created in 1970. It consists of: a cane crushing entity; a refinery; a distillery for the production of ethanol; and an energy production unit comprising a bagasse boiler producing 150 tons/hour of steam and a 25 megawatt turbo-alternator which has made it possible to obtain from the clean development mechanism (CDM) in Bonn, 40,000 tons of carbon credits.'
    }
  ]

  myEvents = [
    {
      title: '',
      date: '',
      location: '',
      image: '',
      description: ''
    }
  ];
  openJob = false;
  openEvent = false;
  openNews = false;
  pref: any = '';
  jobData = {
    "userId": this.userService.loggedInUser._id,
    "title": "",
    "type": "",
    "description": "",
    "applicationLink": "",
    "emailLink": "",
    'salary': '',
    'sector': '',
    'city': '',
    'country': ''
  }
  eventData = {
    "userId": this.userService.loggedInUser._id,
    "title": "",
    "body": "",
    "location": "",
    "date": "",
    "photo": this.pref,
    'video': '',
    'type': this.userService.loggedInUser.type,
    'city': '',
    'country': ''
  }
  newsData = {
    "userId": this.userService.loggedInUser._id,
    "title": "",
    "body": "",
    "location": "",
    "date": "",
    "photo": this.pref,
    'video': ''
  }

  // Event Photo
  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef;

  // News Photo
  @ViewChild("fileUploadN", { static: false })
  fileUploadN!: ElementRef;

  jobNumber = 1;
  constructor(
    public userService: UserService,
    public companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCompanyDetails();
    this.getUsersJobs();
  }

  getCompanyDetails() {
    this.companyService.getCompany(this.userService.loggedInUser._id).subscribe(
      res => {
        console.log('rs', res);
        if (res.success) {
          this.companyService.companyProfile = res.data;
          if (res.data.events && res.data.events.length > 0) {
            this.myEvents = res.data.events;
          }
        }
      }
    )
  }

  saveJob() {
    console.log('jobData', this.jobData);
    if (!this.jobData.title || !this.jobData.description || !this.jobData.applicationLink || !this.jobData.emailLink || !this.jobData.type) {
      alert('Please fill all required fields!');
    } else {
      this.companyService.saveJob(this.jobData).subscribe(
        res => {
          console.log('save job', res);
          if (res.success) {
            this.openJob = false;
            this.jobData = {
              "userId": this.userService.loggedInUser._id,
              "title": "",
              "type": "",
              "description": "",
              "applicationLink": "",
              "emailLink": "",
              'salary': '',
              'sector': '',
              'city': '',
              'country': ''
            }
            this.getUsersJobs();
            this.toastr.success('Job offer has been successfully saved.!', 'New Job Offer', {
              enableHtml: true,
              toastClass: 'job-success',
              // closeButton: true,
              // disableTimeOut: true,
              positionClass: 'toast-bottom-right'
            });
          }
        }, err => {

        }
      )
    }
  }


  publishJob() {
    console.log('jobData', this.jobData);
    if (!this.jobData.title || !this.jobData.description || !this.jobData.applicationLink || !this.jobData.emailLink || !this.jobData.type) {
      alert('Please fill all required fields!');
    } else {
      this.companyService.publishJob(this.jobData).subscribe(
        res => {
          console.log('publish job', res);
          if (res.success) {
            this.openJob = false;
            this.jobData = {
              "userId": this.userService.loggedInUser._id,
              "title": "",
              "type": "",
              "description": "",
              "applicationLink": "",
              "emailLink": "",
              'salary': '',
              'sector': '',
              'city': '',
              'country': ''
            }
            this.getUsersJobs();
            this.toastr.success('Job offer has been successfully saved.!', 'New Job Offer', {
              enableHtml: true,
              toastClass: 'job-success',
              // closeButton: true,
              // disableTimeOut: true,
              positionClass: 'toast-bottom-right'
            });
          }
        },
        err => {
          this.toastr.error('Error while saving data. Please Try Again.', 'Error!', {
            enableHtml: true,
            toastClass: 'job-success error-j',
            // closeButton: true,
            // disableTimeOut: true,
            positionClass: 'toast-bottom-right'
          });
        }
      )
    }
  }

  getUsersJobs() {
    this.companyService.getJobsByUID(this.userService.loggedInUser._id).subscribe(
      res => {
        console.log('jobs', res);
        if (res.success) {
          this.myJobs = res.data.jobs;
        }
      }
    )

  }

  getAllPublishedJobs() {
    this.companyService.getAllPublishedJobs(this.jobNumber).subscribe(
      res => {
        console.log('jobs', res);
      }
    )
  }
  // For File Upload
  onClick(type:any) {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // const reader = new FileReader();
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        if (type == 'event') {
          this.eventData.photo = file as File;
        }
        if (type == 'news') {
          this.newsData.photo = file as File;
        }
      }
      this.fileUpload.nativeElement.value = '';
      this.fileUploadN.nativeElement.value = '';

    };
    fileUpload.click();
    // console.log('file', this.eventData.photo);
  }

  publishEvent() {
    console.log('jobData', this.eventData);
    if (!this.eventData.title || !this.eventData.body || !this.eventData.photo || !this.eventData.type || !this.eventData.location || !this.eventData.date || !this.eventData.video) {
      alert('Please fill all required fields!');
    } else {
      this.companyService.saveEvent(this.eventData).subscribe(
        res => {
          console.log('publish job', res);
          if (res.success) {
            this.openEvent = false;
            this.eventData = {
              "userId": this.userService.loggedInUser._id,
              "title": "",
              "body": "",
              "location": "",
              "date": "",
              "photo": this.pref,
              'video': '',
              'type': this.userService.loggedInUser.type,
              'city': '',
              'country': ''
            }
            this.toastr.success('Event has been successfully saved.!', 'New Event Added', {
              enableHtml: true,
              toastClass: 'job-success',
              // closeButton: true,
              // disableTimeOut: true,
              positionClass: 'toast-bottom-right'
            });
          }
        },
        err => {
          this.toastr.error('Error while saving data. Please Try Again.', 'Error!', {
            enableHtml: true,
            toastClass: 'job-success error-j',
            // closeButton: true,
            // disableTimeOut: true,
            positionClass: 'toast-bottom-right'
          });
        }
      )
    }
  }

  jobAction(job: any, action: any) {
    console.log(action, job)
    if (action === 'view') {
      this.companyService.getJobById(job._id).subscribe(
        res => {
          console.log('single job', res);
        }
      )
    }
  }

  publishNews() {
    console.log('jobData', this.newsData);
    if (!this.newsData.title || !this.newsData.body || !this.newsData.photo || !this.newsData.location || !this.newsData.date || !this.newsData.video) {
      alert('Please fill all required fields!');
    } else {
      this.companyService.saveNews(this.newsData).subscribe(
        res => {
          console.log('publish News', res);
          if (res.success) {
            this.openNews = false;
            this.newsData = {
              "userId": this.userService.loggedInUser._id,
              "title": "",
              "body": "",
              "location": "",
              "date": "",
              "photo": this.pref,
              'video': ''
            }
            this.toastr.success('News has been successfully saved.!', 'News Added', {
              enableHtml: true,
              toastClass: 'job-success',
              // closeButton: true,
              // disableTimeOut: true,
              positionClass: 'toast-bottom-right'
            });
          }
        },
        err => {
          this.toastr.error('Error while saving data. Please Try Again.', 'Error!', {
            enableHtml: true,
            toastClass: 'job-success error-j',
            // closeButton: true,
            // disableTimeOut: true,
            positionClass: 'toast-bottom-right'
          });
        }
      )
    }
  }
}
