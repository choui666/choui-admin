import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

const SHAREFORROOT = [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot()
];

const SHAREFORCHILD = [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
];

@NgModule({
    imports: SHAREFORROOT,
    exports: SHAREFORCHILD,
    declarations: []
})
export class SharedRootModule {
}

@NgModule({
    exports: SHAREFORCHILD
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedRootModule
        };
    }
}
