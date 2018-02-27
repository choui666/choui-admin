import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-blog',
    template: `
        <nz-layout>
            <nz-header>
                <app-blog-header></app-blog-header>
            </nz-header>
            <nz-content>
                <app-blog-content></app-blog-content>
            </nz-content>
            <nz-footer>Footer</nz-footer>
        </nz-layout>
    `,
    styles: [
        `
            :host ::ng-deep .ant-layout-header, :host ::ng-deep .ant-layout-footer {
                background: #7dbcea;
                color: #fff;
            }

        `
    ],
    providers: []
})
export class BlogComponent implements OnInit {



    constructor() {

    }

    ngOnInit() {

    }

}
