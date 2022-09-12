import { MigrationInterface, QueryRunner } from "typeorm";

export class session1661399722460 implements MigrationInterface {
    name = 'session1661399722460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`botToken\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`session\` varchar(1000) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`session\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`botToken\` varchar(255) NOT NULL`);
    }

}
