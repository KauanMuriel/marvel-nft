import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class UserPreferencesEntities1714418076627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'creator',
            columns: [
                { name: 'uuid', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: "uuid" },
                { name: 'fullName', type: 'varchar', isUnique: true },
                { name: 'sufix', type: 'varchar', isUnique: true },
                { name: 'thumbnail', type: 'varchar' }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'character',
            columns: [
                { name: 'uuid', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: "uuid" },
                { name: 'name', type: 'varchar' },
                { name: 'description', type: 'varchar', isNullable: true },
                { name: 'thumbnail', type: 'varchar' }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'comic',
            columns: [
                { name: 'uuid', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: "uuid" },
                { name: 'title', type: 'varchar'},
                { name: 'isbn', type: 'varchar'},
                { name: 'creatorId', type: 'uuid' }
            ]
        }))

        await queryRunner.createForeignKey('comic', new TableForeignKey({
            columnNames: ['creatorId'],
            referencedTableName: 'creator',
            referencedColumnNames: ['uuid']
        }));

        await queryRunner.addColumns('user', [
            new TableColumn({ name: 'creatorId', type: 'uuid' }),
            new TableColumn({ name: 'characterId', type: 'uuid' }),
            new TableColumn({ name: 'comicId', type: 'uuid' })
        ]);

        await queryRunner.createForeignKeys('user', [
            new TableForeignKey({ columnNames: ['creatorId'], referencedTableName: 'creator', referencedColumnNames: ['uuid']}),
            new TableForeignKey({ columnNames: ['characterId'], referencedTableName: 'character', referencedColumnNames: ['uuid']}),
            new TableForeignKey({ columnNames: ['comicId'], referencedTableName: 'comic', referencedColumnNames: ['uuid']})
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('comic', 'creatorId')
        await queryRunner.dropForeignKey('user', 'characterId')
        await queryRunner.dropForeignKey('user', 'creatorId')
        await queryRunner.dropForeignKey('user', 'comicId')
        await queryRunner.dropTable('comic');
        await queryRunner.dropTable('character');
        await queryRunner.dropTable('creator');
    }
}