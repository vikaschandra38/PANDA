import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ExpertCardComponent } from './expert-card/expert-card.component';
import { JobOfferCardComponent } from './job-offer-card/job-offer-card.component';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
    declarations: [AnnouncementCardComponent, EventCardComponent, ExpertCardComponent, OrganizationCardComponent, JobOfferCardComponent, TravelMapComponent],
    imports: [
        CommonModule,
        MatSlideToggleModule
    ],
    exports: [AnnouncementCardComponent, EventCardComponent, ExpertCardComponent, OrganizationCardComponent, JobOfferCardComponent, TravelMapComponent]
})
export class SharedModule { }
