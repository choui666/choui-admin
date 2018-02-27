import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../share/share.module';
import { AdminComponents } from './pages/indnex';
import { IndexService } from './service/index.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from './Util/loading-interceptor.service';
import { ErroInterceptorService } from './Util/erro-interceptor.service';
import { MarkdownModule } from 'angular2-markdown';

@NgModule({
    imports: [
        AdminRoutingModule,
        SharedModule,
        MarkdownModule
    ],
    declarations: AdminComponents,
    providers: [IndexService, {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptorService,
        multi: true,
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: ErroInterceptorService,
        multi: true,
    }]
})
export class AdminModule {
}
