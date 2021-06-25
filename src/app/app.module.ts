import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// primeng
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { SummonerDetailsComponent } from './summoner-details/summoner-details.component';
import {TabViewModule} from 'primeng/tabview';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'details', component: SummonerDetailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
      DashboardComponent,
      SummonerDetailsComponent
   ],
  imports: [
    TabViewModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextareaModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
