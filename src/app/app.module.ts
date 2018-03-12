import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
