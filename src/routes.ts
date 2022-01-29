import { CollectionController } from "./controller/CollectionController";
import { SessionController } from "./controller/SessionController";
import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/session",
    controller: SessionController,
    action: "my"
}, {
    method: "post",
    route: "/session",
    controller: SessionController,
    action: "create"
}, {
    method: "delete",
    route: "/session",
    controller: SessionController,
    action: "destroy"
}, {
    method: "get",
    route: "/collections/:id",
    controller: CollectionController,
    action: "one"
}, {
    method: "get",
    route: "/collections",
    controller: CollectionController,
    action: "all"
}, {
    method: "post",
    route: "/collections",
    controller: CollectionController,
    action: "save"
}, {
    method: "delete",
    route: "/collections/:id",
    controller: CollectionController,
    action: "remove"
}];