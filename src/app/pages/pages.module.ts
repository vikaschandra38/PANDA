import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './_shared/shared.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PagesRoutingModule, RoutingComponents } from './pages-routing.module';
import { RotatePipe } from '../_helpers/rotate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChip, MatChipsModule } from '@angular/material/chips';

const MY_FORMATS  = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
  }
}

@NgModule({
    declarations: [
      RoutingComponents,
      RotatePipe
    ],
    imports: [
      CommonModule,
      SharedModule,
      CarouselModule,
      NgbCarouselModule,
      PagesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      MatSlideToggleModule,
      MatSelectModule,
      TranslateModule
    ],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },

      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class PagesModule { }
