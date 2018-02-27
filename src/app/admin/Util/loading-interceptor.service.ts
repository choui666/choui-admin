import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { IndexService } from '../service/index.service';

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {

    constructor(private indexService: IndexService) {
    }

    isLoading(req: HttpRequest<any>): boolean {
        if (!req.params.has('loading') || req.params.get('loading')) {
            return true;
        }
        return false;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _isLoading: boolean = this.isLoading(req);
        if (_isLoading) {
            this.indexService.showSpinning();
        }

        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                if (_isLoading) {
                    this.indexService.hideSpinning();
                }
            }
        });
    }

}
