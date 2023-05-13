import { NextFunction, Request, Response } from "express"
import { RoleRepository } from "../../database/repositories/role.repository"
import { BadRequestError } from "../../utils/api-error"


export class RoleController {
    async all(req: Request, res: Response, next: NextFunction) { 
        const data = await RoleRepository.find({
            select:{
                name: true,
                description: true,
                permissions: {
                    name:true
                }
            },
            relations: {
                permissions: true
            }
        })

        return res.json(data)
    }

    async one(req: Request, res: Response, next: NextFunction) {

    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { name, description, accountLogged } = req.body
        const role = RoleRepository.create({
            name,
            description,
            lastUpdatedByUser: accountLogged
        })

        return res.json(await RoleRepository.save(role))

    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const role = await RoleRepository.findOneBy({id})

        if (!role){
            throw new BadRequestError("Grupo não encontrado")            
        }

        return res.json(await RoleRepository.remove(role))

    }

}