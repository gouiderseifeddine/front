import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllBackComponent } from './Back/all-back/all-back.component';
import { SidebarComponent } from './Back/sidebar/sidebar.component';
import { NavbarComponent } from './Back/navbar/navbar.component';
import { SettingsSidebarComponent } from './Back/settings-sidebar/settings-sidebar.component';
import { FooterComponent } from './Back/footer/footer.component';
import { HomebackComponent } from './Back/homeback/homeback.component';
import { UsersComponent } from './Back/users/users.component';
import { TablesComponent } from './Back/tables/tables.component';
import { EventsComponent } from './Back/events/events.component';
import { InscriptionsComponent } from './Back/inscriptions/inscriptions.component';
import { PostsComponent } from './Back/posts/posts.component';
import { CommentsComponent } from './Back/comments/comments.component';
import { RendezvousComponent } from './Back/rendezvous/rendezvous.component';
import { GroupesComponent } from './Back/groupes/groupes.component';
import { CategoriesGroupeComponent } from './Back/categories-groupe/categories-groupe.component';
import { MessagesComponent } from './Back/messages/messages.component';
import { AllFrontComponent } from './Front/all-front/all-front.component';
import { HeaderComponent } from './Front/header/header.component';
import { HomeComponent } from './Front/home/home.component';
import { FooterFrontComponent } from './Front/footer-front/footer-front.component';
import { BlogComponent } from './Front/blog/blog.component';
import { BlogDetailsComponent } from './Front/blog-details/blog-details.component';
import { RendezvousFrontComponent } from './Front/rendezvous-front/rendezvous-front.component';
import { AboutComponent } from './Front/about/about.component';
import { ContactComponent } from './Front/contact/contact.component';
import { FillformComponent } from './fillform/fillform.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpertComponent } from './expert/expert.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './etudiant/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AllBackComponent,
    SidebarComponent,
    NavbarComponent,
    SettingsSidebarComponent,
    FooterComponent,
    HomebackComponent,
    UsersComponent,
    TablesComponent,
    EventsComponent,
    InscriptionsComponent,
    PostsComponent,
    CommentsComponent,
    RendezvousComponent,
    GroupesComponent,
    CategoriesGroupeComponent,
    MessagesComponent,
    AllFrontComponent,
    HeaderComponent,
    HomeComponent,
    FooterFrontComponent,
    BlogComponent,
    BlogDetailsComponent,
    RendezvousFrontComponent,
    AboutComponent,
    ContactComponent,
    FillformComponent,
    ExpertComponent,
    EtudiantComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
