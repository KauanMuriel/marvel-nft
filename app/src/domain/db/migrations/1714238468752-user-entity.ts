import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserEntity1714238468752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: "id", type: "uuid", isPrimary: true },
                { name: "username", type: "varchar", isUnique: true },
                { name: "email", type: "varchar", isUnique: true },
                { name: "password", type: "varchar"},
                { name: "balance", type: "numeric", default: 0.0 }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
