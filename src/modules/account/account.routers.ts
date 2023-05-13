import { isAuthenticated } from "../../middleware/is-autenticated";
import { AccountController } from "./account.controller";
import { Router } from 'express';

const AccountRouters: Router = Router()
AccountRouters.use(isAuthenticated)// ! Garante que todas as rotas abaixo estejam autenticadas
AccountRouters.get('/', new AccountController().all )
AccountRouters.get('/:id', new AccountController().one )
AccountRouters.post('/', new AccountController().save )
AccountRouters.delete('/:id', new AccountController().remove )

export { AccountRouters }