import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {ExplorerService} from './explorer.service';
import {Functions} from './functions';
import {CacheLocalStorageModule, CacheModule, MemoryCacheModule} from '@dagonmetric/ng-cache';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        CacheModule,
        CacheLocalStorageModule,
        MemoryCacheModule,
        NgbModule,
        ScrollingModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        MainLayoutComponent,
    ],
    providers: [ExplorerService, Functions],
    bootstrap: [AppComponent]
})
export class AppModule {
}
