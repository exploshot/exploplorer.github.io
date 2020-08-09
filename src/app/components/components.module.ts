import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartComponent } from './chart/chart.component';
import { CubesComponent } from './cubes/cubes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        MatSlideToggleModule
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ChartComponent,
    CubesComponent
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CubesComponent
    ]
})
export class ComponentsModule { }
