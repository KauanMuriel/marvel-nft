import { MigrationInterface, QueryRunner } from "typeorm";

export class Tokens1714736388350 implements MigrationInterface {
    name = 'Tokens1714736388350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "contentType" "public"."token_contenttype_enum" NOT NULL, "contentData" json NOT NULL, "ownerUuid" uuid, CONSTRAINT "REL_4676c87cc0924a902e4683c0f8" UNIQUE ("ownerUuid"), CONSTRAINT "PK_a9a66098c2fb758dff713f8d838" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_4676c87cc0924a902e4683c0f8d" FOREIGN KEY ("ownerUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_4676c87cc0924a902e4683c0f8d"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
