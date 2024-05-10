import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductMigration1636773719973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                title VARCHAR NOT NULL,
                description TEXT NOT NULL,
                price NUMERIC NOT NULL
            );
        `);
    await queryRunner.query(`
            INSERT INTO product ("title", "description", "price")
            VALUES 
                ('Product 1', 'Product 1 description', 15),
                ('Product 2', 'Product 2 description', 30)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
