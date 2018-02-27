import { NgModule } from '@angular/core';
import {SharedModule} from '../share/share.module';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponents} from './pages/index';

@NgModule({
  imports: [
    SharedModule,
    BlogRoutingModule
  ],
  declarations: BlogComponents
})
export class BlogModule { }
