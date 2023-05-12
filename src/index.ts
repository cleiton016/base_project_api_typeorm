import { App } from "./app"
import { AppDataSource } from "./database/data-source"
import { AccountEntity } from "./database/entity/account.entity"

AppDataSource.initialize().then(async () => {

    // start express server
    new App().server.listen(3000, ()=>{
        console.log("+---------------------------------------------------+")
        console.log("|                     API ONLINE                    |")
        console.log("| Documentação Swagger: http://localhost:3000/docs  |")
        console.log("+---------------------------------------------------+")
    })

    // insert new users for test
    try {
        await AppDataSource.manager.save(
            AppDataSource.manager.create(AccountEntity, {
                name: "DEVELOP",
                email: "dev3@gmail.com",
                password: "$2a$10$TR4UjgmXQmLHlQh3Ypbhze4.sJiCnZ2KYxSVKMMhnNEp3G7Iy1fre",
                enable: true,
                lastUpdatedByUser: '5a122e1e-b6bf-4b8e-bcf2-5a12cce424f8',
                expireCodeAt: new Date(),
                forgetCode: '65a4sd654'
            })
        )
    } catch (error) {
        
    }
    

}).catch(error => console.log(error))
