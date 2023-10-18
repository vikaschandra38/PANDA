import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/_models';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent implements OnInit {
  @Input() announcement!: Announcement;
  
  constructor() {}

  ngOnInit(): void {
  }

}
