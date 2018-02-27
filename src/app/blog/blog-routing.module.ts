import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './blog.component';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            // {
            //     path: 'index',
            //     component: IndexComponent
            // },
            // {
            //     path: 'edit',
            //     component: EditComponent
            // }, {
            //     path: '**',
            //     redirectTo: 'index'
            // }, {
            //     path: '',
            //     redirectTo: 'index'
            // }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BlogRoutingModule {
}
