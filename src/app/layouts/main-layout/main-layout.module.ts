import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './main-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {MapComponent} from '../../map/map.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TransactionComponent} from '../../blockchain/transaction/transaction.component';
import {BlockComponent} from '../../blockchain/block/block.component';
import {CacheLocalStorageModule, CacheModule, MemoryCacheModule} from '@dagonmetric/ng-cache';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {TimeagoModule} from 'ngx-timeago';
import {ComponentsModule} from '../../components/components.module';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        NgxChartsModule,
        NgbModule,
        CacheModule,
        CacheLocalStorageModule,
        MemoryCacheModule,
        MatPaginatorModule,
        MatCardModule,
        TimeagoModule.forRoot(),
        ToastrModule.forRoot(),
        ComponentsModule,
        ScrollingModule,
    ],
    declarations: [
        DashboardComponent,
        TransactionComponent,
        BlockComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapComponent,
        NotificationsComponent,
    ]
})

export class MainLayoutModule {
}
