import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopbarComponent } from './components/topbar/topbar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CurrenciesEffects } from './store/currencies/currencies.effects';
import { currenciesReducer } from './store/currencies/currencies.reducer';
import { differencesReducer } from './store/differences/differences.reducer';
import { DifferencesEffects } from './store/differences/differences.effects';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    TopbarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forRoot({ 
      currencies: currenciesReducer,
      differences: differencesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([CurrenciesEffects, DifferencesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
