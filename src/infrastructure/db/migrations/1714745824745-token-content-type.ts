import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenContentType1714745824745 implements MigrationInterface {
    name = 'TokenContentType1714745824745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."token_contenttype_enum" RENAME TO "token_contenttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."token_contenttype_enum" AS ENUM('Character', 'Creator', 'Comics')`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "contentType" TYPE "public"."token_contenttype_enum" USING "contentType"::"text"::"public"."token_contenttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."token_contenttype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."token_contenttype_enum_old" AS ENUM('Character', 'Creator', 'Comic')`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "contentType" TYPE "public"."token_contenttype_enum_old" USING "contentType"::"text"::"public"."token_contenttype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."token_contenttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."token_contenttype_enum_old" RENAME TO "token_contenttype_enum"`);
    }

}
