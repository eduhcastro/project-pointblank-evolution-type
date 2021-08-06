import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Accounts1628260292355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                {
                    name: "player_id",
                    type: "int",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "player_name",
                    type: "varchar",
                },
                {
                    name: "rank",
                    type: "int",
                },
                {
                    name: "gp",
                    type: "int",
                },
                {
                    name: "money",
                    type: "int",
                },
                {
                    name: "online",
                    type: "bool",
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts")
    }

}
