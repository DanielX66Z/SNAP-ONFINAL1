import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCardPage } from './list-card';

@NgModule({
  declarations: [
    ListCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCardPage),
  ],
})
export class ListCardPageModule {}
