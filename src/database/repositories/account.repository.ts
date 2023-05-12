import { AppDataSource } from "../data-source";
import { AccountEntity } from "../entity/account.entity";


export const AccountRepository = AppDataSource.getRepository(AccountEntity)