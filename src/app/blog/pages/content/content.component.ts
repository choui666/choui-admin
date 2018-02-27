import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-blog-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

    contentList: string[] = [];

    constructor() {
    }

    ngOnInit() {
        for (let i = 0; i < 40; i++) {
            this.contentList.push('content' + i);
        }
    }

}
