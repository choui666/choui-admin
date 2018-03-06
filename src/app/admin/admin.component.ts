import { Component, OnInit } from '@angular/core';
import { IndexService } from './service/index.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent {

    menus: { name: string, icon: string, url: string }[] = [];
    isCollapsed = false;
    _isSpinning = false;

    currentUrl: string;

    constructor(private service: IndexService, private router: Router) {
        this.service.spinner.subscribe((isShow: boolean) => {
            setTimeout(() => {
                this._isSpinning = isShow;
            }, 0);
        });

        this.service.getMenus().subscribe(result => {
            this.menus = result as { name: string, icon: string, url: string }[];
        });

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((result: NavigationEnd) => {
                this.currentUrl = result.urlAfterRedirects;
            });
    }


}
