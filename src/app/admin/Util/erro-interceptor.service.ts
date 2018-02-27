import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ErroInterceptorService implements HttpInterceptor {

    constructor(private messager: NzMessageService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                if (event.status !== 200) {
                    this.messager.error('网络异常');
                }
                if (event.body && event.body.status && event.body.status !== '0') {
                    this.messager.error(event.body.desc);
                }
            }
        }, error => {
            // here we can show an error message to the user,
            // for example via a service
            this.messager.error('网络异常');
            console.error('error catched', JSON.stringify(error));

        });
    }

}
