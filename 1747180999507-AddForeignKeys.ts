import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeys1747180999507 implements MigrationInterface {
    name = 'AddForeignKeys1747180999507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "readings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "power" float NOT NULL, "temperature" float NOT NULL, "inverterId" integer)`);
        await queryRunner.query(`CREATE TABLE "inverters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "plant_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "plants" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "localization" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_readings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "power" float NOT NULL, "temperature" float NOT NULL, "inverterId" integer, CONSTRAINT "FK_1049bcd8be3afc0648d8a011a96" FOREIGN KEY ("inverterId") REFERENCES "inverters" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_readings"("id", "timestamp", "power", "temperature", "inverterId") SELECT "id", "timestamp", "power", "temperature", "inverterId" FROM "readings"`);
        await queryRunner.query(`DROP TABLE "readings"`);
        await queryRunner.query(`ALTER TABLE "temporary_readings" RENAME TO "readings"`);
        await queryRunner.query(`CREATE TABLE "temporary_inverters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "plant_id" integer NOT NULL, CONSTRAINT "FK_ddfa9e7756ae602a5ec4559bf71" FOREIGN KEY ("plant_id") REFERENCES "plants" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_inverters"("id", "name", "model", "plant_id") SELECT "id", "name", "model", "plant_id" FROM "inverters"`);
        await queryRunner.query(`DROP TABLE "inverters"`);
        await queryRunner.query(`ALTER TABLE "temporary_inverters" RENAME TO "inverters"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inverters" RENAME TO "temporary_inverters"`);
        await queryRunner.query(`CREATE TABLE "inverters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "model" varchar NOT NULL, "plant_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "inverters"("id", "name", "model", "plant_id") SELECT "id", "name", "model", "plant_id" FROM "temporary_inverters"`);
        await queryRunner.query(`DROP TABLE "temporary_inverters"`);
        await queryRunner.query(`ALTER TABLE "readings" RENAME TO "temporary_readings"`);
        await queryRunner.query(`CREATE TABLE "readings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL, "power" float NOT NULL, "temperature" float NOT NULL, "inverterId" integer)`);
        await queryRunner.query(`INSERT INTO "readings"("id", "timestamp", "power", "temperature", "inverterId") SELECT "id", "timestamp", "power", "temperature", "inverterId" FROM "temporary_readings"`);
        await queryRunner.query(`DROP TABLE "temporary_readings"`);
        await queryRunner.query(`DROP TABLE "plants"`);
        await queryRunner.query(`DROP TABLE "inverters"`);
        await queryRunner.query(`DROP TABLE "readings"`);
    }

}
