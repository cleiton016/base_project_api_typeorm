import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683674542690 implements MigrationInterface {
    name = 'Default1683674542690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contas" ALTER COLUMN "data_expiracao_codigo" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contas" ALTER COLUMN "data_expiracao_codigo" SET DEFAULT '2023-05-09 23:21:23.280874+00'`);
    }

}
