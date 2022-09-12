import { MigrationInterface, QueryRunner } from "typeorm";

export class code1661306858451 implements MigrationInterface {
    name = 'code1661306858451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_490319656e54a7957dc1fed027\` ON \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f7a2b11e29b1422a2622beab3\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`code\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1f7a2b11e29b1422a2622beab3\` ON \`users\` (\`code\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_490319656e54a7957dc1fed027\` ON \`accounts\` (\`code\`)`);
    }

}
