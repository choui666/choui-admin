import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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

}
