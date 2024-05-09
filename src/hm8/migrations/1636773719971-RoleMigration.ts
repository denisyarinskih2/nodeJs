import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleMigration1636773719971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS role (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL
        )
    `);
    await queryRunner.query(`
            INSERT INTO role (name)
            VALUES 
                ('admin'),
                ('user')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}