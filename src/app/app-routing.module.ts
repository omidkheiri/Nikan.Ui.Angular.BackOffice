import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './content/content.component';
import { MasterComponent } from './layouts/master/master.component';
import { SingleComponent } from './layouts/single/single.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/content',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MasterComponent,
    children: [{ path: 'content', component: ContentComponent }],
  },

  {
    path: '',
    component: SingleComponent,
    children: [
      {
        path: '',
        component: AuthComponent,
        children: [{ path: 'login', component: LoginComponent }],
      },
    ],
  },
  { path: '**', redirectTo: 'content' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
