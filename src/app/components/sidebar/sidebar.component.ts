import {Component, OnInit} from '@angular/core';
import {ExplorerService} from '../../explorer.service';
import {Functions} from '../../functions';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: ''},
    {path: '/pools', title: 'Pools', icon: 'design_vector', class: ''},
    {path: '/map', title: 'Map', icon: 'business_globe', class: ''},

//    {path: '/icons', title: 'Icons', icon: 'education_atom', class: ''},

//    {path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: ''},

//    {path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: ''},
//    {path: '/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: ''},
//    {path: '/typography', title: 'Typography', icon: 'text_caps-small', class: ''}

];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    public lastStats: any;
    public blockchainHeight: any;

    constructor(private exSer: ExplorerService,
                private func: Functions) {
        const self = this;

        setInterval(() => {
            self.refresh();
        }, 10 * 1000);
        self.refresh();
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    refresh() {
        const self = this;
        self.getLiveStats();
    }

    getLiveStats() {
        this.exSer.getLiveStats().then((lastStats: any) => {
            this.lastStats = lastStats;
            this.blockchainHeight = lastStats.height;
        });
    }

    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
