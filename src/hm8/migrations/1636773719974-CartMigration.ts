import { MigrationInterface, QueryRunner } from "typeorm";

export class CartMigration1636773719974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cart (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID,
                is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
                CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart");
  }
}
