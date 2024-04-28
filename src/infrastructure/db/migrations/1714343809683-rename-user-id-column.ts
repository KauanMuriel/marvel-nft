import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserIdColumn1714343809683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('user', 'id', 'uuid');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('user', 'uuid', 'id');
    }
}