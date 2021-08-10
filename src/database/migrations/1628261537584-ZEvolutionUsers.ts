import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ZEvolutionUsers1628261537584 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "zevolution_users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "login",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "picture",
                    type: "text",
                    default: "'https://i.ibb.co/ymTbF2J/209302376-626903208702961-696843777548657028-n.jpg'",
                },
                {
                    name: "level",
                    type: "int",
                    default: 0
                }
            ]
        }))

    }




    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zevolution_users")
    }

}
