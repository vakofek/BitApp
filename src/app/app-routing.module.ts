import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  { path: 'contact/:id/edit', component: ContactEditComponent, resolve: { contact: ContactResolverService } },
  { path: 'edit', component: ContactEditComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'contact/:id', component: ContactDetailsComponent, resolve: { contact: ContactResolverService } },
  { path: 'chart', component: ChartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
