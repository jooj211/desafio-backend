import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1746905868378 implements MigrationInterface {
    name = 'InitSchema1746905868378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usinas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "localizacao" varchar)`);
        await queryRunner.query(`CREATE TABLE "inversores" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "modelo" varchar NOT NULL, "usinaId" integer)`);
        await queryRunner.query(`CREATE TABLE "leituras" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "potencia" float NOT NULL, "temperatura" float NOT NULL, "inversorId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_inversores" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "modelo" varchar NOT NULL, "usinaId" integer, CONSTRAINT "FK_7c28d43fd2111978df42e92e11e" FOREIGN KEY ("usinaId") REFERENCES "usinas" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_inversores"("id", "nome", "modelo", "usinaId") SELECT "id", "nome", "modelo", "usinaId" FROM "inversores"`);
        await queryRunner.query(`DROP TABLE "inversores"`);
        await queryRunner.query(`ALTER TABLE "temporary_inversores" RENAME TO "inversores"`);
        await queryRunner.query(`CREATE TABLE "temporary_leituras" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "potencia" float NOT NULL, "temperatura" float NOT NULL, "inversorId" integer, CONSTRAINT "FK_68a2a6697d71f34d4b6913b0e4f" FOREIGN KEY ("inversorId") REFERENCES "inversores" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_leituras"("id", "timestamp", "potencia", "temperatura", "inversorId") SELECT "id", "timestamp", "potencia", "temperatura", "inversorId" FROM "leituras"`);
        await queryRunner.query(`DROP TABLE "leituras"`);
        await queryRunner.query(`ALTER TABLE "temporary_leituras" RENAME TO "leituras"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leituras" RENAME TO "temporary_leituras"`);
        await queryRunner.query(`CREATE TABLE "leituras" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "potencia" float NOT NULL, "temperatura" float NOT NULL, "inversorId" integer)`);
        await queryRunner.query(`INSERT INTO "leituras"("id", "timestamp", "potencia", "temperatura", "inversorId") SELECT "id", "timestamp", "potencia", "temperatura", "inversorId" FROM "temporary_leituras"`);
        await queryRunner.query(`DROP TABLE "temporary_leituras"`);
        await queryRunner.query(`ALTER TABLE "inversores" RENAME TO "temporary_inversores"`);
        await queryRunner.query(`CREATE TABLE "inversores" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "modelo" varchar NOT NULL, "usinaId" integer)`);
        await queryRunner.query(`INSERT INTO "inversores"("id", "nome", "modelo", "usinaId") SELECT "id", "nome", "modelo", "usinaId" FROM "temporary_inversores"`);
        await queryRunner.query(`DROP TABLE "temporary_inversores"`);
        await queryRunner.query(`DROP TABLE "leituras"`);
        await queryRunner.query(`DROP TABLE "inversores"`);
        await queryRunner.query(`DROP TABLE "usinas"`);
    }

}
