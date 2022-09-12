import { MigrationInterface, QueryRunner } from "typeorm";

export class account1661383691977 implements MigrationInterface {
    name = 'account1661383691977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6dae76df2e7448529daa5bc49e\` ON \`accounts\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6dae76df2e7448529daa5bc49e\` ON \`accounts\` (\`apiId\`)`);
    }

}
