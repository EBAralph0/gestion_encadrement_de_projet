import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjetListeComponent } from './projets/projet-liste/projet-liste.component';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreerProjetComponent } from './projets/creer-projet/creer-projet.component';
import { AcceuilEnseignantComponent } from './acceuil/acceuil-enseignant/acceuil-enseignant.component';
import {MatListModule} from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
import { VueEnseignantComponent } from './vue-enseignant/vue-enseignant.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogFromMenuExampleDialogComponent } from './dialog-from-menu-example-dialog/dialog-from-menu-example-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { DetailProjetComponent } from './projets/detail-projet/detail-projet.component';
import { VueEtudiantComponent } from './vue-etudiant/vue-etudiant.component';
import { MessageEnseignantComponent } from './message-enseignant/message-enseignant.component';
import { MessageEtudiantComponent } from './message-etudiant/message-etudiant.component';


const appRoutes:Routes=[
  {path:'',component:LoginComponent},
  {path:'liste_projet',component:ProjetListeComponent},
  {path:'creer-projet/:id',component:CreerProjetComponent},
  {path:'acceuil-enseignant/:id',component:AcceuilEnseignantComponent},
  {path:'vue-enseignant/:id',component:VueEnseignantComponent},
  {path:'message-enseignant/:id',component:MessageEnseignantComponent},
  {path:'message-etudiant/:id/:id_etudiant',component:MessageEtudiantComponent},
  {path:'vue-etudiant/:id',component:VueEtudiantComponent},
  {path:'detail-projet/:id',component:DetailProjetComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjetListeComponent,
    LoginComponent,
    NavbarComponent,
    CreerProjetComponent,
    AcceuilEnseignantComponent,
    FooterComponent,
    LoginComponent,
    VueEnseignantComponent,
    DialogFromMenuExampleDialogComponent,
    DetailProjetComponent,
    VueEtudiantComponent,
    MessageEnseignantComponent,
    MessageEtudiantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule

  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 