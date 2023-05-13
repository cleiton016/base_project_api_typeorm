import { NextFunction, Request, Response } from "express"
import { BadRequestError } from "../../utils/api-error"
import { PermissionRepository } from "../../database/repositories/permission.repository"


export class PermissionController {
    async all(req: Request, res: Response, next: NextFunction) { 
        const data = await PermissionRepository.find({
            select:{
                id: true,
                name: true,
                description: true,
            },
            where:{enable: true}
        })

        return res.json(data)
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { name, description, accountLogged } = req.body
        const permissonExist = await PermissionRepository.findOneBy({name})
        if(permissonExist){
            throw new BadRequestError(`Já existe uma permissão com o nome "${name}"`)
        }
        const permisson = PermissionRepository.create({
            name,
            description,
            lastUpdatedByUser: accountLogged
        })

        return res.json(await PermissionRepository.save(permisson,{
            data:{
                id: true,
                name: true,
                description: true
            }
        }))

    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const permisson = await PermissionRepository.findOneBy({id})

        if (!permisson){
            throw new BadRequestError("Permissão não encontrada")            
        }
        await PermissionRepository.update(permisson.id, {enable: false})
        return res.json({message: 'Permissão exluida!'})

    }

}