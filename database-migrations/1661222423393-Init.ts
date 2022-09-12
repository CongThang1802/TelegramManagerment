import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1661222423393 implements MigrationInterface {
    name = 'Init1661222423393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`code\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_1f7a2b11e29b1422a2622beab3\` (\`code\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f7a2b11e29b1422a2622beab3\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
