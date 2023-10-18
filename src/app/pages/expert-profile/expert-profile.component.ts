import { Component, OnInit } from '@angular/core';
import { ExpertService, UserService } from 'src/app/_services';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.scss']
})
export class ExpertProfileComponent implements OnInit {
  selectedNews = 0;
  selectedEvent = 0;
  public separatorKeysCodes = [ENTER, COMMA];
  public emailList = [];
  removable = true;
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
  pref: any[] = [];
  dummy: any = '';
  myProfile:any = {
    userId: this.userService.loggedInUser._id,
    "fname": "",
    "lname": "",
    "title": "",
    "location": "",
    "quote": "",
    "biography": "",
    "video": "",
    "orgPic":"",
    "preferences": this.pref,
    "availability": "",
    "skills": [],
    "interest": [],
    "email": "",
    "phone": "",
    "website": ""
  }
  preferences = [
    {
      title: 'I am interested in job opportunities in Africa',
      value: 'Jobs in Africa',
    },
    {
      title: 'I am interested in providing consulting services',
      value: 'Consulting',
    },
    {
      title: 'I am interested in networking',
      value: 'Networking',
    }
  ]
  typeOfEmployement = [
    'Full-time', ' Part-time', 'Independent', 'Freelance', 'Fixed-term contract', ' Internship'
  ]

  education = [{
    "userId": this.userService.loggedInUser._id,
    "school": '',
    "degree": "",
    "field": "",
    "start": this.dummy,
    "end": this.dummy
  }];

  professionalExp = [{
    "userId": this.userService.loggedInUser._id,
    "title": "",
    "description": "",
    "companyName": "",
    "location": "",
    "sector": "",
    "employmentType": "",
    "start": this.dummy,
    "end": this.dummy
  }]

  language = [{
    "userId": this.userService.loggedInUser._id,
    "languageName": "",
    "languageLevel": ""
  }]

  travelMap = [{
    "userId": this.userService.loggedInUser._id,
    "arrival": this.dummy,
    "departure": this.dummy,
    "location": ""
  }]

  profileErrors = {
    profile: false,
    education: false,
    language: false,
    pExp: false,
    travel: false
  }

  profileProgress = 0;
  constructor(
    public userService: UserService,
    public expertService: ExpertService,
    private toastr: ToastrService
  ) {
    this.expertService.getExpert(this.userService.loggedInUser._id).subscribe(
      res => {
        this.previewData = res.data;
        this.setProfile(res);
        this.setEducation(res);
        this.setLanguage(res);
        this.setTravel(res);
        // this.setProfile(res);
        this.setProgress();
      },
      err => {
        console.log('err', err)
      }
    )
   }
  setProgress() {
    this.profileProgress = 0;
    let profile = 0;

    // Check Profile rogress
    for (let key in this.myProfile) {
      if (this.myProfile[key] !== null && this.myProfile[key] != "") {
        profile++;
      }
    }
    const profPer = (profile / Object.keys(this.myProfile).length) * 100;
    if (profPer > 0 && profPer <= 30) {
      this.profileProgress = 15
    }
    if (profPer > 30 && profPer <= 60) {
      this.profileProgress = 25
    }
    if (profPer > 60 && profPer <= 85) {
      this.profileProgress = 35
    }
    if (profPer > 85 ) {
      this.profileProgress = 50
    }

    if (this.education[0].school) {
      this.profileProgress = this.profileProgress + 25;
    }
    if (this.travelMap[0].location) {
      this.profileProgress = this.profileProgress + 15;
    }
    if (this.language[0].languageName) {
      this.profileProgress = this.profileProgress + 10;
    }

  }

  ngOnInit() {
  }

  // Education
  setEducation(res:any) {
    if (res.data.education.length) {
      res.data.education.forEach((val: any, key: any) => {
        console.log(val, key)
        // this.education[key].userId = val.userId;
        if (!this.education[key]) {
          this.addEducation();
        }
        this.education[key].school = val?.school;
        this.education[key].degree = val?.degree;
        this.education[key].start = this.returnFormattedDate(val.start);
        this.education[key].end = this.returnFormattedDate(val.end);
        this.education[key].field = val?.field
      });
    }
  }

  // Language
  setLanguage(res: any) {
    if (res.data.language.length) {
      res.data.language.forEach((val: any, key: any) => {
        console.log(val, key)
        if (!this.language[key]) {
          this.addLang();
        }
        this.language[key].languageName = val?.languageName;
        this.language[key].languageLevel = val?.languageLevel;

      });
    }
  }

  // Travel Map
  setTravel(res: any) {
    if (res.data.travel.length) {
      res.data.travel.forEach((val: any, key: any) => {
        console.log(val, key)
        if (!this.travelMap[key]) {
          this.addTravel();
        }
        this.travelMap[key].location = val?.location;
        this.travelMap[key].arrival = this.returnFormattedDate(val.arrival);
        this.travelMap[key].departure = this.returnFormattedDate(val.departure);

      });
    }
  }

  // Professional Experience
  setProfessional(res: any) {
    if (res.data.experience.length) {
      res.data.experience.forEach((val: any, key: any) => {
        console.log(val, key)
        // this.education[key].userId = val.userId;
        if (!this.professionalExp[key]) {
          this.addProfession();
        }
        this.professionalExp[key].description = val?.description;
        this.professionalExp[key].title = val?.title;
        this.professionalExp[key].start = this.returnFormattedDate(val.start);
        this.professionalExp[key].end = this.returnFormattedDate(val.end);
        this.professionalExp[key].companyName = val?.companyName;
        this.professionalExp[key].location = val?.location;
        this.professionalExp[key].sector = val?.sector;
        this.professionalExp[key].employmentType = val?.employmentType
      });
    }
  }

  // Set Profile
  setProfile(res: any) {
    this.myProfile.fname = res.data.profile.fname;
    this.myProfile.lname = res.data.profile.lname;
    this.myProfile.quote = res.data.profile.quote;
    this.myProfile.title = res.data.profile.title;
    this.myProfile.video = res.data.profile.video;
    this.myProfile.location = res.data.profile.location;
    this.myProfile.biography = res.data.profile.biography;
    this.myProfile.availability = res.data.profile.availability;
    this.myProfile.preferences = res.data.preferences;
    this.myProfile.skills = res.data.skills;
    this.myProfile.interest = res.data.interest;
    this.myProfile.email = res.data.contact.email;
    this.myProfile.phone = res.data.contact.phone;
    this.myProfile.website = res.data.contact.website;
  }
  addProfession() {
    this.professionalExp.push({
      "userId": this.userService.loggedInUser._id,
      "title": "",
      "description": "",
      "companyName": "",
      "location": "",
      "sector": "",
      "employmentType": "",
      "start": new Date(),
      "end": new Date()
    });
  }

  addEducation() {
    this.education.push({
      "userId": this.userService.loggedInUser._id,
      "school": '',
      "degree": "",
      "field": "",
      "start": new Date(),
      "end": new Date()
    });
  }

  add(event: any): void {
    console.log(event.value)
    if (event.value) {
      this.myProfile.skills.push(event.value as never);
    }
    if (event.input) {
      event.input.value = '';
    }
  }
  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.myProfile.skills.indexOf(data as never) >= 0) {
      this.myProfile.skills.splice(this.myProfile.skills.indexOf(data as never), 1);
    }
  }

  addInterest(event: any): void {
    console.log(event.value)
    if (event.value) {
      this.myProfile.interest.push(event.value as never);
    }
    if (event.input) {
      event.input.value = '';
    }
  }
  removeInterest(data: any): void {
    console.log('Removing ' + data)
    if (this.myProfile.interest.indexOf(data as never) >= 0) {
      this.myProfile.interest.splice(this.myProfile.interest.indexOf(data as never), 1);
    }
  }

  addLang() {
    this.language.push({
      "userId": this.userService.loggedInUser._id,
      "languageName": "",
      "languageLevel": ""
    })
  }

  addTravel() {
    this.travelMap.push({
      "userId": this.userService.loggedInUser._id,
      "arrival": new Date() ,
      "departure": new Date(),
      "location": ""
    })
  }

  saveProfile() {
    console.log('profile Data', this.myProfile, this.education, this.professionalExp, this.language, this.travelMap)
    // check profile
    this.saveProfileData();
    // Check Education
    this.saveEducation();
    // Check Professional Exp
    this.saveProfessionalExp();
    // Check Lang
    this.saveLanguage();
    // Check Travel Map
    this.saveTravel()

  }

  returnFormattedDate(date: any) {
    if (!date) {
      return new Date();
    }
    let mydate = date;
    if (date.includes('/')) {
      const parts = date.split('/'); // Assumig format - '20/03/2022'
      // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
      // January - 0, February - 1, etc.
      mydate = new Date(parts[2], parts[1] - 1, parts[0]);
    }

    return mydate;
  }

  saveEducation() {
    console.log('this.education', this.education);
    let exists = this.education.filter(function (o) {
      console.log('o', o, o.school)
      return o.school;
      // return o.hasOwnProperty(val);
    });

    if (exists.length === this.education.length) {
      console.log('exists', exists);
      this.profileErrors.education = false;
      this.expertService.addEducation(this.education).subscribe(
        res => {
          console.log('add edu', res)
        },
        err => {
          this.toastr.error('Error while saving education', 'Error!', {
            enableHtml: true,
            toastClass: 'job-success error-j',
            // closeButton: true,
            // disableTimeOut: true,
            positionClass: 'toast-bottom-right'
          });
        }
      )
    } else {
      console.log('does not exist', exists);
      this.profileErrors.education = true;
    }
  }

  saveTravel() {
    console.log('this.travel', this.travelMap);
    this.expertService.addTravel(this.travelMap).subscribe(
      res => {
        console.log('add travel', res)
      },
      err => {
        this.toastr.error('Error while saving Travel Map', 'Error!', {
          enableHtml: true,
          toastClass: 'job-success error-j',
          // closeButton: true,
          // disableTimeOut: true,
          positionClass: 'toast-bottom-right'
        });
      }
    )
  }

  saveProfessionalExp() {
    console.log('this.professional exp', this.professionalExp);
    let exists = this.professionalExp.filter(function (o) {
      console.log('o', o, o.companyName, o.title, o.sector)
      return (o.companyName && o.title && o.sector);
      // return o.hasOwnProperty(val);
    });

    if (exists.length === this.professionalExp.length) {
      console.log('exists', exists);
      this.profileErrors.pExp = false;
      this.expertService.addExperience(this.professionalExp).subscribe(
        res => {
          console.log('add professionalExp', res)
        }
      )
    } else {
      console.log('does not exist', exists);
      this.profileErrors.pExp = true;
    }
  }

  saveLanguage() {
    this.expertService.addLanguage(this.language).subscribe(
      res => {
        console.log('add lang', res)
      },
      err => {
        this.toastr.error('Error while saving Language', 'Error!', {
          enableHtml: true,
          toastClass: 'job-success error-j',
          // closeButton: true,
          // disableTimeOut: true,
          positionClass: 'toast-bottom-right'
        });
      }
    )
  }

  saveProfileData() {
    console.log('this.professional exp', this.myProfile);

    if (!this.myProfile.fname || !this.myProfile.lname || !this.myProfile.title || !this.myProfile.location) {
      this.profileErrors.profile = true;

    } else {
      this.profileErrors.profile = false;
      console.log(this.myProfile);
      this.expertService.updateProfile(this.myProfile).subscribe(
        res => {
          console.log('add myProfile', res);
          this.previewData = res.data;
          this.setProfile(res);
        },
        err => {
          this.toastr.error('Error while saving Profile', 'Error!', {
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

  checkPrefrence(index:any, event:any) {
    console.log(index, event, event.target.checked);
    if (event.target.checked) {
      this.myProfile.preferences.push(this.preferences[index].value);
    } else {
      const i = this.myProfile.preferences.indexOf(this.preferences[index].value);
      console.log(this.myProfile.preferences.indexOf(this.preferences[index].value))
      this.myProfile.preferences.splice(i, 1);
    }
    console.log(this.myProfile.preferences);
  }

}
