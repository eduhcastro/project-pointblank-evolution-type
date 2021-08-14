import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PlayersItems1628979468289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "player_items",
            columns: [
                { name: "object_id", type: "int", isGenerated: true, isNullable: false },
                { name: "owner_id", type: "int", default: 0 },
                { name: "item_id", type: "int", default: 0 },
                { name: "item_name", type: "text" },
                { name: "count", type: "int", default: 0 },
                { name: "category", type: "int", default: 0 },
                { name: "equip", type: "int", default: 0 }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
