import { MigrationInterface, QueryRunner } from "typeorm";

export class account1661243792517 implements MigrationInterface {
    name = 'account1661243792517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`code\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`apiId\` int NOT NULL, \`apiHash\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_490319656e54a7957dc1fed027\` (\`code\`), UNIQUE INDEX \`IDX_6dae76df2e7448529daa5bc49e\` (\`apiId\`), UNIQUE INDEX \`IDX_36034b22cee2803dc9a510dce0\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_36034b22cee2803dc9a510dce0\` ON \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_6dae76df2e7448529daa5bc49e\` ON \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_490319656e54a7957dc1fed027\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
