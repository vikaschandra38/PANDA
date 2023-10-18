import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/_models';

@Component({
  selector: 'app-job-offer-card',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.scss']
})
export class JobOfferCardComponent implements OnInit {
  @Input() jobOffer!: JobOffer;

  constructor() { }

  ngOnInit(): void {
  }

}
