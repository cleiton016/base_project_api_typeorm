import { NextFunction, Request, Response } from "express"
import { RoleRepository } from "../../database/repositories/role.repository"
import { BadRequestError } from "../../utils/api-error"


export class RoleController {
    async all(req: Request, res: Response, next: NextFunction) { 
        const data = await RoleRepository.find({
            select:{
                id: true,
                name: true,
                description: true,
                permissions: {
                    id: true,
                    name:true
                }
            },
            relations: {
                permissions: true
            },
            where: {enable: true}
        })
        return res.json(data)
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { name, description, permissions, accountLogged } = req.body
        const roleExist = await RoleRepository.findOneBy({name, enable: true})
        if(roleExist){
            throw new BadRequestError(`Já existe role com o nome '${name}'`)
        }
        const role = RoleRepository.create({
            name,
            description,
            permissions,
            lastUpdatedByUser: accountLogged
        })

        return res.status(201).json(await RoleRepository.save(role))

    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const role = await RoleRepository.findOneBy({id, enable: true})

        if (!role){
            throw new BadRequestError("Grupo não encontrado")            
        }

        await RoleRepository.update(role.id, {enable: false})
        return res.json({message: 'Grupo exluido!'})

    }

}