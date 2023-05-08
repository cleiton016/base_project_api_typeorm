import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./database/data-source"
import { Routes } from "./routes"
import { AccountEntity } from "./database/entity/account.entity"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    const teste = AppDataSource.getRepository('AccountEntity')
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(AccountEntity, {
    //         name: "DEVELOP",
    //         email: "dev@gmail.com",
    //         password: "$2a$10$TR4UjgmXQmLHlQh3Ypbhze4.sJiCnZ2KYxSVKMMhnNEp3G7Iy1fre",
    //         roles: "sasdasd",
    //         enable: true,
    //         lastUpdatedByUser: '123',
    //         expireCodeAt: new Date(),
    //         forgetCode: '65a4sd654'
    //     })
    // )

    const conta2:any = {}
    conta2.name = ''
    conta2.email = ''
    conta2.password = ''
    conta2.roles = ''
    conta2.enable = true
    conta2.lastUpdatedByUser = ''
    conta2.expireCodeAt = new Date()
    conta2.forgetCode = ''
    teste.save(conta2)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
