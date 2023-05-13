import { NextFunction, Request, Response } from "express"
import { AccountRepository } from "../../database/repositories/account.repository"
import { hash } from 'bcrypt'
import { constants } from "../../utils/constants"
import { BadRequestError, NotFoundError } from "../../utils/api-error"
import { Account } from "./account.model"

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
                },
                createdAt: true,
                updatedAt: true
            },
            relations:{
                roles: {
                    permissions: true
                }
            },
            where: { enable: true }

        })
        const accounts: Account.Account[] = []
        for (let index = 0; index < data.length; index++) {
            const permissions: string[] = [], newRoles: any = []
             
            for (let role of data[index].roles){
                for (const permission of role.permissions){
                    permissions.push(permission.name)
                }
    
                const {permissions: _, ...newRole} = role
                newRoles.push(newRole)
            }
            data[index].roles = newRoles
            accounts.push({...data[index], permissions})

        }

        return res.json(accounts)
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id


        const account = await AccountRepository.findOne({
            where: { id , enable: true}
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

        const accountToRemove = await AccountRepository.findOneBy({ id , enable: true})

        if (!accountToRemove) {
            throw new NotFoundError("Conta não registrada")
        }

        await AccountRepository.update(accountToRemove.id, { enable: false })

        return res.json({message:"Conta removida"})
    }

}
