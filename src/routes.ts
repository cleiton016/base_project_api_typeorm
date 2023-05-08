import { AccountController } from "./modules/account/account.controller"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: AccountController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: AccountController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: AccountController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: AccountController,
    action: "remove"
}]