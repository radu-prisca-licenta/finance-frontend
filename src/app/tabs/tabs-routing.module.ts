import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'card',
        loadChildren: () =>
          import('../pages/card/card.module').then((m) => m.CardPageModule),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('../pages/transaction/transaction.module').then(
            (m) => m.TransactionPageModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('../pages/setting/setting.module').then(
            (m) => m.SettingPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
