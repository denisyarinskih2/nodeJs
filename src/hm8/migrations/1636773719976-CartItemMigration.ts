import { MigrationInterface, QueryRunner } from "typeorm";

export class CartItemMigration1636773719976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cart_item (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                product_id UUID NOT NULL,
                count INT NOT NULL,
                cart_id UUID NOT NULL,
                FOREIGN KEY (product_id) REFERENCES product(id),
                FOREIGN KEY (cart_id) REFERENCES "cart"(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_item");
  }
}
