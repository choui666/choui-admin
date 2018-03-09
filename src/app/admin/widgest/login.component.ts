import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { UserService } from '../service/user.service';


@Component({
    selector: 'app-login',
    template: `
        <div>
            <nz-input [(ngModel)]="name" [nzPlaceHolder]="'请输入账号'"></nz-input>
            <nz-input [(ngModel)]="password" [nzPlaceHolder]="'请输入密码'"></nz-input>
            <div class="customize-footer">
                <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside()">
                    登录
                </button>
                <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel()">
                    取消
                </button>
            </div>
        </div>
    `,
    styles: [
            `
            :host ::ng-deep .customize-footer {
                border-top: 1px solid #e9e9e9;
                padding: 10px 18px 0 10px;
                text-align: right;
                border-radius: 0 0 0px 0px;
                margin: 15px -16px -5px -16px;
            }
        `
    ]
})
export class LoginComponent {

    name = '';
    password = '';

    constructor(private subject: NzModalSubject, private userSrv: UserService, private _message: NzMessageService, ) {

    }

    emitDataOutside() {
        this.userSrv.login(this.name, this.password);
        if (this.userSrv.isLogin) {
            this.subject.destroy('onOk');
        } else {
            this._message.warning('账号或密码错误！');
        }
    }

    handleCancel() {
        this.subject.destroy('onCancel');
    }

}
