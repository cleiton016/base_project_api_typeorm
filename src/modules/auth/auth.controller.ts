import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction, response } from "express";
import { TokenData } from '../../utils/types/token-data.type';
import { constants } from '../../utils/constants';
import { AccountRepository } from '../../database/repositories/account.repository';
import { compare } from 'bcrypt';
import { BadRequestError } from '../../utils/api-error';
import { RoleEntity } from '../../database/entity/role.entity';

export class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body

        const [account] = await AccountRepository.find(
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    roles: {
                        id: true,
                        name: true,
                        permissions: {
                            name: true
                        }
                    }
                },
                where: {
                    email,
                    enable: true
                },
                relations: {
                    roles: {
                        permissions: true
                    }
                }
            }
        )
        if (!account) {
            throw new BadRequestError("Conta não registrada")
        }

        if (!await compare(password, account.password)) {
            throw new BadRequestError("Senha invalida")
        }

        const permissions: string[] = []
        const newRoles: any = []
        for (let role of account.roles){
            for (const permission of role.permissions){
                permissions.push(permission.name)
            }

            const {permissions: _, ...newRole} = role
            newRoles.push(newRole)
        }
        account.roles = newRoles
        
        const tokenData: TokenData = {
            accountId: account.id,
            nome: account.name,
            email: account.email,
            permissions
        }
        return res.json(
            {
                refreshToken: jwt.sign(
                    tokenData,
                    constants.jwt.private_key!,
                    {
                        expiresIn: constants.jwt.refresh_token_exp_in_sec,

                    }
                ),
                token: jwt.sign(tokenData,
                    constants.jwt.private_key!,
                    {
                        expiresIn: constants.jwt.access_token_exp_in_sec,

                    },
                ),
                account:  {...account,  permissions}
            }
        )
    }
}