import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    },
    { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', redirectTo: 'admin' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
