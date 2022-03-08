import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "./auth-gaurd.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGaurd } from "./servers/edit-server/can-deacivate-gaurd.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersResolve } from "./servers/servers-resolve.service";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "users", component: UsersComponent, children: [
      { path: ":id/:name", component: UserComponent }
    ]},
    { path: "servers", canActivateChild: [AuthGaurd], component: ServersComponent, children: [
      { path: ":id", component: ServerComponent, resolve: {server: ServersResolve} },
      { path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGaurd] }
    ]},
    // { path: "not-found", component: PageNotFoundComponent },
    { path: "not-found", component: ErrorPageComponent, data: {message: "Page not found!"} },
    { path: "**", redirectTo: "/not-found"}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, {useHash: true}) this is used to configure the server and web server will ignore anything after the # and that will be handled by Angular
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}