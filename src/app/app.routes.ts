import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { ContractComponent } from './contract/contract.component';
import { HeaderComponent } from './Base/header/header.component';
import { FooterComponent } from './Base/footer/footer.component';
import { ServiceCompanyComponent } from './service-company/service-company.component';
import { LoginComponent } from './login/login.component';
import { SignUpLoginComponent } from './sign-up-login/sign-up-login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companyRegitration', component: CompanyRegistrationComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'service-company', component: ServiceCompanyComponent },
  { path: 'login', component: LoginComponent },
  {path: 'sign-up-login', component: SignUpLoginComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
