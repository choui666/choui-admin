import { Component, OnInit } from '@angular/core';
import { IndexService } from './service/index.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

    menus: { name: string, icon: string, url: string }[] = [];
    isCollapsed = false;
    _isSpinning = false;

    constructor(private service: IndexService) {
        this.service.spinner.subscribe((isShow: boolean) => {
            this._isSpinning = isShow;
        });
    }

    ngOnInit() {
        this.service.getMenus().subscribe(result => {
            this.menus = result as { name: string, icon: string, url: string }[];
        });
    }

}
