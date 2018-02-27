import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {EditComponent} from './pages/edit/edit.component';
import {AdminComponent} from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: 'edit',
                component: EditComponent
            }, {
                path: '**',
                redirectTo: 'index'
            }, {
                path: '',
                redirectTo: 'index'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
