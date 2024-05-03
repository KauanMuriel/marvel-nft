import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialEntities1714668689407 implements MigrationInterface {
    name = 'InitialEntities1714668689407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creator" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "sufix" character varying NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "UQ_d297a227f9558735b9f608f8b24" UNIQUE ("fullName", "sufix"), CONSTRAINT "PK_16af3e8b392f1c2cd86dfbf62dc" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "character" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "thumbnail" character varying NOT NULL, CONSTRAINT "PK_4528cd2ef875750cf078616d4ba" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "comic" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "variantDescription" "public"."comic_variantdescription_enum" NOT NULL, "isbn" character varying NOT NULL, "creatorUuid" uuid, CONSTRAINT "REL_3e0f6bb21071221f6e1a725013" UNIQUE ("creatorUuid"), CONSTRAINT "PK_0e9cf2a084ea77395c9caf4c53f" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" numeric NOT NULL DEFAULT '0', "admin" boolean NOT NULL DEFAULT false, "favoriteCreatorUuid" uuid, "favoriteCharacterUuid" uuid, "favoriteComicUuid" uuid, CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("email", "username"), CONSTRAINT "REL_182e10f496381622c60dcfbcf5" UNIQUE ("favoriteCreatorUuid"), CONSTRAINT "REL_6fa19ab12816cf46151b4596c2" UNIQUE ("favoriteCharacterUuid"), CONSTRAINT "REL_7101aaa8542171b7ac43953864" UNIQUE ("favoriteComicUuid"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "comic" ADD CONSTRAINT "FK_3e0f6bb21071221f6e1a725013d" FOREIGN KEY ("creatorUuid") REFERENCES "creator"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_182e10f496381622c60dcfbcf52" FOREIGN KEY ("favoriteCreatorUuid") REFERENCES "creator"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6fa19ab12816cf46151b4596c25" FOREIGN KEY ("favoriteCharacterUuid") REFERENCES "character"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7101aaa8542171b7ac43953864f" FOREIGN KEY ("favoriteComicUuid") REFERENCES "comic"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7101aaa8542171b7ac43953864f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6fa19ab12816cf46151b4596c25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_182e10f496381622c60dcfbcf52"`);
        await queryRunner.query(`ALTER TABLE "comic" DROP CONSTRAINT "FK_3e0f6bb21071221f6e1a725013d"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comic"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "creator"`);
    }

}
