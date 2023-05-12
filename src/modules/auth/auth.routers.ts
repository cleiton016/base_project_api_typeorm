import { Router } from 'express';
import { router } from '../../utils/types/router.type';
import { AuthController } from './auth.controller';

export const AuthRouters: router[] = [
    
    {
        method: "post",
        route: "/login",
        middleware: [],
        controller: AuthController,
        action: "login"
    },

]

const authUser: Router = Router()

authUser.post('/login', new AuthController().login )

export { authUser }