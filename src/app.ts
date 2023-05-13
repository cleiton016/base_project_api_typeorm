
import 'express-async-errors'
import 'reflect-metadata'
import cors from 'cors'
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import { TreatmentError } from './middleware/treatment-error';
import { AccountRouters } from './modules/account/account.routers';
import { authUser } from './modules/auth/auth.routers';
import { RoleRouters } from './modules/role/role.routers';
import { PermissionRouters } from './modules/permission/permission.routers';

export class App {
  public server: express.Application = express();
  corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }

  constructor() {
    this.middleware()
    this.router()
    this.swagger(
      {
        explorer: true
      }
    )
    
  }

  private swagger(options: any) {

    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  }
  private middleware() {
    this.server.use(express.json())
    this.server.use(cors(this.corsOptions))
  }

  private router() {
    this.server.use(authUser)
    this.server.use('/role', RoleRouters)
    this.server.use('/account', AccountRouters)
    this.server.use('/permission', PermissionRouters)
    /*
    * Middleware de tratamento de erro
    ! Deixar sempre como a ultima rota 
    */
    this.server.use(TreatmentError)
  }
}
