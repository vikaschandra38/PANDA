import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  profileProgress = 0;
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
  cType = [
    { title: 'Private company', status: false },
    { title: 'Public company', status: false },
    { title: 'Non-Profit organization', status: false },
    { title: 'Educational institution', status: false },
  ];
  cSize = [
    { title: '10', status: false },
    { title: '50', status: false },
    { title: '250', status: false },
    { title: '250', status: false },
  ];
  pref: any = '';
  prefT: any = '';
  myOrganization = {
    orgName: '',
    orgProfile: '',
    orgPic: this.prefT,
    vidLink: '',
    sector: '',
    specialization: '',
    type: '',
    foundingDate: '',
    size: '',
    tagline: '',
    orgLogo: this.pref,
    contactDetails: {
      email: '',
      phone: '',
      website: '',
      location: {
        street: '',
        postal: '',
        city: '',
        province: '',
        country: ''
      }
    },
    userId: this.userService.loggedInUser._id
  }
  // Org Logo
  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef;

  // Org Pic
  @ViewChild("fileUploadP", { static: false })
  fileUploadP!: ElementRef;
  slectedFile!: File;

  constructor(
    public userService: UserService,
    public companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCompanyDetails();
  }

  getCompanyDetails() {
    this.companyService.getCompany(this.userService.loggedInUser._id).subscribe(
      res => {
        console.log('rs', res);
        if (res.success) {
          this.setProfile(res.data.profile);
          this.setContact(res.data.contact);
          this.companyService.companyProfile = res.data;
        }
      }
    )
  }

  saveProfile() {
    console.log('orgData', this.myOrganization)
    if (!this.myOrganization.orgName || !this.myOrganization.orgProfile || !this.myOrganization.sector || !this.myOrganization.specialization
      || !this.myOrganization.type || !this.myOrganization.foundingDate || !this.myOrganization.size || !this.myOrganization.contactDetails.email
      || !this.myOrganization.contactDetails.location.street || !this.myOrganization.contactDetails.location.city || !this.myOrganization.contactDetails.location.country
    ) {
      alert('Please fill required fields');
    } else {
      this.saveProfileData();
    }

  }

  // For File Upload
  onClick(type:any) {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const reader = new FileReader();
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        if (type == 'logo') {
          this.myOrganization.orgLogo = file as File;
          // reader.readAsDataURL(this.slectedFile);
          // reader.onload = (event: any) => {
          //   this.myOrganization.orgLogo = event.target.result;
          // };
        }
        if (type == 'org') {
          this.myOrganization.orgPic = file as File;
          // reader.readAsDataURL(this.slectedFile);
          // reader.onload = (event: any) => {
          //   // this.myOrganization.orgPic = event.target.result;
          // };
        }
      }
      this.fileUpload.nativeElement.value = '';
    };
    fileUpload.click();
    console.log('file', this.myOrganization.orgLogo);
  }

  saveProfileData() {
    this.companyService.updateProfile(this.myOrganization).subscribe(
      res => {
        console.log('res', res);
        if (res.success) {
          this.setProfile(res.data)
        }
        this.companyService.updateContact(this.myOrganization).subscribe(
          dt => {
            console.log('dt', dt);
            if (dt.success) {
              this.toastr.success('Profile data saved.', 'Success!', {
                enableHtml: true,
                toastClass: 'job-success',
                // closeButton: true,
                // disableTimeOut: true,
                positionClass: 'toast-bottom-right'
              });
              this.setContact(dt.data);
              this.getCompanyDetails();
            }
          }
        )
      }
    )
  }

  setProfile(profile: any) {
    console.log('profile', profile, this.myOrganization);
    this.myOrganization.orgName = profile.name;
    this.myOrganization.size = profile.companySize;
    this.myOrganization.type = profile.companyType;
    this.myOrganization.foundingDate = profile.foundedIn;
    this.myOrganization.orgLogo = profile.logo;
    this.myOrganization.orgPic = profile.photo;
    this.myOrganization.orgProfile = profile.presentation;
    this.myOrganization.tagline = profile.quote;
    this.myOrganization.sector = profile.sector;
    this.myOrganization.specialization = profile.specialization;
    this.myOrganization.vidLink = profile.video;
  }

  setContact(contact: any) {
    this.myOrganization.contactDetails.email = contact.email;
    this.myOrganization.contactDetails.phone = contact.phone;
    this.myOrganization.contactDetails.website = contact.website;
    this.myOrganization.contactDetails.location.city = contact.headoffice;
    if (this.myOrganization.orgName) {
      this.profileProgress = 10;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector) {
      this.profileProgress = 20;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization) {
      this.profileProgress = 30;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type) {
      this.profileProgress = 40;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate) {
      this.profileProgress = 50;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate && this.myOrganization.size) {
      this.profileProgress = 60;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate && this.myOrganization.size && this.myOrganization.contactDetails.email) {
      this.profileProgress = 70;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate && this.myOrganization.size && this.myOrganization.contactDetails.email && this.myOrganization.contactDetails.phone) {
      this.profileProgress = 80;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate && this.myOrganization.size && this.myOrganization.contactDetails.email && this.myOrganization.contactDetails.phone && this.myOrganization.contactDetails.location.city) {
      this.profileProgress = 90;
    }
    if (this.myOrganization.orgName && this.myOrganization.sector && this.myOrganization.specialization && this.myOrganization.type && this.myOrganization.foundingDate && this.myOrganization.size && this.myOrganization.tagline && this.myOrganization.contactDetails.email && this.myOrganization.contactDetails.phone && this.myOrganization.contactDetails.location.city) {
      this.profileProgress = 100;
    }
  }

}
