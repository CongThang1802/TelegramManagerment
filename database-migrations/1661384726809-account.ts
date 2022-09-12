import { MigrationInterface, QueryRunner } from "typeorm";

export class account1661384726809 implements MigrationInterface {
    name = 'account1661384726809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_36034b22cee2803dc9a510dce0\` ON \`accounts\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_36034b22cee2803dc9a510dce0\` ON \`accounts\` (\`phoneNumber\`)`);
    }

}
