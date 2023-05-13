import { AppDataSource } from "../data-source";
import { PermissionEntity } from "../entity/permission.entity";


export const PermissionRepository = AppDataSource.getRepository(PermissionEntity)