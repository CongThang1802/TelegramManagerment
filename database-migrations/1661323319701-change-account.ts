import { MigrationInterface, QueryRunner } from "typeorm";

export class changeAccount1661323319701 implements MigrationInterface {
    name = 'changeAccount1661323319701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`session\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`userId\` \`userId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`userId\` \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`session\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`username\` varchar(255) NOT NULL`);
    }

}
