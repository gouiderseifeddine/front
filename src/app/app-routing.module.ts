import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllBackComponent} from "./Back/all-back/all-back.component";
import {HomebackComponent} from "./Back/homeback/homeback.component";
import {UsersComponent} from "./Back/users/users.component";
import {TablesComponent} from "./Back/tables/tables.component";
import {EventsComponent} from "./Back/events/events.component";
import {InscriptionsComponent} from "./Back/inscriptions/inscriptions.component";
import {PostsComponent} from "./Back/posts/posts.component";
import {CommentsComponent} from "./Back/comments/comments.component";
import {RendezvousComponent} from "./Back/rendezvous/rendezvous.component";
import {GroupesComponent} from "./Back/groupes/groupes.component";
import {CategoriesGroupeComponent} from "./Back/categories-groupe/categories-groupe.component";
import {MessagesComponent} from "./Back/messages/messages.component";
import {AllFrontComponent} from "./Front/all-front/all-front.component";
import {HomeComponent} from "./Front/home/home.component";
import {BlogComponent} from "./Front/blog/blog.component";
import {BlogDetailsComponent} from "./Front/blog-details/blog-details.component";
import {RendezvousFrontComponent} from "./Front/rendezvous-front/rendezvous-front.component";
import {AboutComponent} from "./Front/about/about.component";
import {ContactComponent} from "./Front/contact/contact.component";
import { FillformComponent } from './fillform/fillform.component';
import { ExpertComponent } from './expert/expert.component';
import { EtudiantComponent } from './etudiant/etudiant.component';


const routes: Routes = [
  {
    path: "etudiant",
    component: EtudiantComponent
  },
  {
    path: "filling",
    component: FillformComponent
  },
  {
    path: "expert",
    component: ExpertComponent
  },
  { path: "",
    component: AllFrontComponent,
    children:[
      
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "blog",
        component: BlogComponent
      },
      {
        path: "blogdetails",
        component: BlogDetailsComponent
      },
      {
        path: "rendezvousfront",
        component: RendezvousFrontComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "contact",
        component: ContactComponent
      }
    ]
  },
  {
    path: "admin",
    component: AllBackComponent,
    children: [
      {
        path: "dashboard",
        component: HomebackComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "tables",
        component: TablesComponent
      },
      {
        path: "events",
        component: EventsComponent
      },
      {
        path: "inscriptions",
        component: InscriptionsComponent
      },
      {
        path: "posts",
        component: PostsComponent
      },
      {
        path: "comments",
        component: CommentsComponent
      },
      {
        path: "rendezvous",
        component: RendezvousComponent
      },
      {
        path: "groupes",
        component: GroupesComponent
      },
      {
        path: "categoriegroupes",
        component: CategoriesGroupeComponent
      },
      {
        path: "messages",
        component: MessagesComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
