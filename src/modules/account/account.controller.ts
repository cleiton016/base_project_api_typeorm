import { NextFunction, Request, Response } from "express"
import { AccountRepository } from "../../database/repositories/account.repository"
import { hash } from 'bcrypt'
import { constants } from "../../utils/constants"
import { BadRequestError, NotFoundError } from "../../utils/api-error"

export class AccountController {
    async all(req: Request, res: Response, next: NextFunction) { 
        const data = await AccountRepository.find({
            select: {
                id: true,
                name: true,
                email: true,
                roles: {
                    id: true,
                    name: true,
                    permissions: {
                        name: true
                    }
                }
            },
            relations:{
                roles: {
                    permissions: true
                }
            },
            where: { enable: true }

        })

        return res.json(data)
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id


        const account = await AccountRepository.findOne({
            where: { id }
        })

        if (!account) {
            throw new NotFoundError("Conta não registrada")
        }
        return res.json(account)
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const userLogged = req.body.accountLogged
        const { name, email, roles } = req.body;
        const password = await hash(req.body.password, constants.bcrypt.saltOrRounds!)
        const alertExist = await AccountRepository.findOneBy({email})
        if (alertExist) {
            throw new BadRequestError("Email já cadastrado")
        }
        const account = AccountRepository.create({
            name,
            email,
            password,
            roles,
            lastUpdatedByUser: userLogged
        })
        console.log(account);
        
        return res.json(await AccountRepository.save(account))
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        let accountToRemove = await AccountRepository.findOneBy({ id })

        if (!accountToRemove) {
            throw new NotFoundError("Conta não registrada")
        }

        await AccountRepository.remove(accountToRemove)

        return res.json({message:"Conta removida"})
    }

}
