import { AppDataSource } from "../data-source";
import { RoleEntity } from "../entity/role.entity";


export const RoleRepository = AppDataSource.getRepository(RoleEntity)