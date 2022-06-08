import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ZEvolutionRanks1654548976562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "zevolution_ranks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "exp",
                    type: "int",
                    default: 0
                },
                {
                    name: "data",
                    type: "varchar",
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zevolution_ranks")
    }

}
