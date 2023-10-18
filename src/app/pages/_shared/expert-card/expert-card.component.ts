import { Component, Input, OnInit } from '@angular/core';
import { Expert } from 'src/app/_models';

@Component({
  selector: 'app-expert-card',
  templateUrl: './expert-card.component.html',
  styleUrls: ['./expert-card.component.scss']
})
export class ExpertCardComponent implements OnInit {
  @Input() expert: any;

  constructor() { }

  ngOnInit(): void {
  }

}
