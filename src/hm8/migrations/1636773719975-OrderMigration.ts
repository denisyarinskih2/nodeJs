import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderMigration1636773719975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "order" (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          cart_id UUID,
          user_id UUID,
          payment JSONB NOT NULL,
          delivery JSONB NOT NULL,
          comments VARCHAR NOT NULL DEFAULT '',
          status VARCHAR NOT NULL DEFAULT 'created',
          total NUMERIC NOT NULL,
          CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id),
          CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("order");
  }
}
