import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
