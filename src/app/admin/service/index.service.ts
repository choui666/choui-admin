import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class IndexService {

    spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
    }

    getMenus() {
        return this.http.get('assets/mockData/menus.json');
    }

    showSpinning() {
        this.spinner.next(true);
    }

    hideSpinning() {
        this.spinner.next(false);
    }

    getContentList(pageIndex: number, pageSize = '20') {
        return this.http.get(environment.getUrl('blog/getArticles'), {
            params: {
                pageIndex: pageIndex + '',
                pageSize,
                tag: ''
            }
        })
            .pipe(
                map((item: { status: '1' | '0', data: { list: any[], totalCount: number } }) => {
                    if (item.status === '0') {
                        return {
                            list: item.data.list,
                            totalCount: item.data.totalCount
                        };
                    }
                })
            );
    }


}
