import { isAuthenticated } from "../../middleware/is-autenticated";
import { Router } from 'express';
import { RoleController } from "./role.controller";

const RoleRouters: Router = Router()
RoleRouters.use(isAuthenticated)
RoleRouters.get('/', new RoleController().all )
RoleRouters.post('/', new RoleController().save )
RoleRouters.delete('/:id', new RoleController().remove )

export { RoleRouters }