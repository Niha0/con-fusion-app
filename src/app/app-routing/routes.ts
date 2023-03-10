import { Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';
import { ContractComponent } from '../contract/contract.component';

export const routes: Routes=[
    {path:'home',component:HomeComponent},
    {path:'menu',component:MenuComponent},
    {path:'contactus',component:ContractComponent},
    {path:'about',component:AboutComponent},
    {path: 'dishdetail/:id', component: DishdetailComponent },
    {path:'',redirectTo:'/home',pathMatch:'full'}
  
];