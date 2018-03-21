import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IndexService } from '../../service/index.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

    _dataSet = [];
    _allChecked = false;
    _displayData = [];
    _indeterminate = false;
    _nzTotal = 0;

    constructor(private service: IndexService, private router: Router) {

    }

    ngOnInit() {

        this.service.getContentList(1).subscribe(result => {
            this._dataSet = result.list;
            this._nzTotal = result.totalCount;
        });
    }

    _displayDataChange($event) {
        this._displayData = $event;
        this._refreshStatus();
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => data.checked = true);
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }

    _refreshStatus(data?: any) {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    pageChange(index: number) {
        this.service.getContentList(index).subscribe(result => {
            this._dataSet = result.list;
            this._nzTotal = result.totalCount;
        });
    }

    gotoEdit(item) {
        window.localStorage.setItem('edit', JSON.stringify(item));
        this.router.navigate(['/admin/edit']);

    }
}
