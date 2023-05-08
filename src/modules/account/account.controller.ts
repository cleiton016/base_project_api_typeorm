import { NextFunction, Request, Response } from "express"
import { AccountEntity } from "../../database/entity/account.entity"
import { AppDataSource } from "../../database/data-source"
import { hash } from 'bcrypt'

export class AccountController {

    private accountRepository = AppDataSource.getRepository(AccountEntity)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.accountRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id


        const account = await this.accountRepository.findOne({
            where: { id }
        })

        if (!account) {
            return "unregistered account"
        }
        return account
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, email, password, roles } = request.body;
        const passwordEncrypt = await hash(password, 10)
        const account =  {
            name,
            email,
            password: passwordEncrypt,
            roles
        }

        return this.accountRepository.save(account)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        let accountToRemove = await this.accountRepository.findOneBy({ id })

        if (!accountToRemove) {
            return "this account not exist"
        }

        await this.accountRepository.remove(accountToRemove)

        return "account has been removed"
    }

}