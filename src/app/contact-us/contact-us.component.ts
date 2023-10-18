import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      fName: this.formBuilder.control(null, [Validators.required]),
      lName: this.formBuilder.control(null, [Validators.required]),
      orgName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required]),
      message: this.formBuilder.control(null, [Validators.required]),
    });
  }

  send(): void {
    const { name, email, message } = this.contactForm.value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message} `);
  }
}
