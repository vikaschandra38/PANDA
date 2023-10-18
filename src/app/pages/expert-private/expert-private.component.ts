import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExpertService, UserService } from 'src/app/_services';

@Component({
  selector: 'app-expert-private',
  templateUrl: './expert-private.component.html',
  styleUrls: ['./expert-private.component.scss']
})
export class ExpertPrivateComponent implements OnInit {
  myJobs: any;
  selectedNews = 0;
  selectedEvent = 0;
  previewData: any;
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
      title: 'Today we have open a new Subsidiary in Dakar!',
      date: '10/07/22',
      location: 'Dakar',
      image: './../../../assets/images/home/event.png',
      description: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.'
    },
    {
      title: 'Today we have open a new Subsidiary in Dakar!',
      date: '10/07/22',
      location: 'Dakar',
      image: './../../../assets/images/home/event.png',
      description: 'Risus, sed venenatis sed morbi lectus nunc tincidunt quam. Eget volutpat elementum cum turpis feugiat imperdiet auctor accumsan. Ut pulvinar orci.'
    }
  ]
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
    public expertService: ExpertService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.expertService.getExpert(this.userService.loggedInUser._id).subscribe(
      res => {
        console.log('rs', res);
        if (res.success) {
          this.expertService.expertProfile = res.data;
          if (res.data.events && res.data.events.length > 0) {
            this.myEvents = res.data.events;
          }
        }
      }
    )
  }

  getAllPublishedJobs() {
    this.expertService.getAllPublishedJobs(this.jobNumber).subscribe(
      res => {
        console.log('jobs', res);
      }
    )
  }
  // For File Upload
  onClick(type: any) {
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
      this.expertService.saveEvent(this.eventData).subscribe(
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
        }
      )
    }
  }

  saveJob() {
    throw new Error('Method not implemented.');
  }
  publishJob() {
    throw new Error('Method not implemented.');
  }
  publishNews() {
    throw new Error('Method not implemented.');
  }

  jobAction(job:any, action:any) {

  }
}
