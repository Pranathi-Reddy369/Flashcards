import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlashcardViewerComponent } from './components/flashcard-viewer/flashcard-viewer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlashcardFormComponent } from './components/flashcard-form/flashcard-form.component';
import { validSetGuard } from './guards/valid-set.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ReferComponent } from './components/refer/refer.component';
import { DeletedSetsComponent } from './components/deleted-sets/deleted-sets.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { authGuard } from './guards/auth.guard';



  export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [authGuard] },
  { path: 'feedback-form', component: FeedbackFormComponent, canActivate: [authGuard] },
  { path: 'create', component: FlashcardFormComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'edit/:id',
    component: FlashcardFormComponent,
    canActivate: [authGuard, validSetGuard] // both guards applied
  },
  {
    path: 'view/:id',
    component: FlashcardViewerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'refer',
    component: ReferComponent,
    canActivate: [authGuard]
  },
  {
    path: 'deleted-sets',
    component: DeletedSetsComponent,
    canActivate: [authGuard]
  },

  { path: '**', component: NotFoundComponent }
];

