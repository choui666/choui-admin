import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from '../widgest/login.component';
/**
 * Created by admin on 2018/3/6.
 */
@Injectable()
export class CanAdminProvide implements CanActivate {

    constructor(private userSrv: UserService, private msg: NzMessageService,
                private modalService: NzModalService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Observable((observer) => {
            // 拥有 `admin` 角色
            if (this.userSrv.isLogin) {
                observer.next(true);
                observer.complete();
                return;
            }else {
                const modal = this.modalService.open({
                    title   : '请先登录',
                    content : LoginComponent,
                    closable: false,
                    showConfirmLoading: true,
                    onOk() {
                        observer.next(true);
                        observer.complete();
                    },
                    onCancel() {
                        observer.next(false);
                        observer.complete();
                    },
                    footer: false
                });
            }
        });
    }

}