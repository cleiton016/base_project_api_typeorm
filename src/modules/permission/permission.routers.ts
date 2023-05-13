import { isAuthenticated } from "../../middleware/is-autenticated";
import { Router } from 'express';
import { PermissionController } from "./permission.controller";

const PermissionRouters: Router = Router()
PermissionRouters.use(isAuthenticated)// ! Garante que todas as rotas abaixo estejam autenticadas
PermissionRouters.get('/', new PermissionController().all )
PermissionRouters.post('/', new PermissionController().save )
PermissionRouters.delete('/:id', new PermissionController().remove )

export { PermissionRouters }