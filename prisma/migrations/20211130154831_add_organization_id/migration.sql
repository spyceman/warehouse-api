/*
  Warnings:

  - Added the required column `organization_id` to the `Price_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `Warehouse_operations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `Warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Price_lists" DROP CONSTRAINT "Price_lists_service_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Warehouse_operations" DROP CONSTRAINT "Warehouse_operations_service_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Warehouses" DROP CONSTRAINT "Warehouses_service_location_id_fkey";

-- DropIndex
DROP INDEX "Organizations_location_id_key";

-- DropIndex
DROP INDEX "Organizations_name_key";

-- DropIndex
DROP INDEX "Price_lists_name_key";

-- DropIndex
DROP INDEX "Warehouse_products_product_id_key";

-- AlterTable
ALTER TABLE "Price_lists" ADD COLUMN     "organization_id" INTEGER NOT NULL,
ALTER COLUMN "service_location_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Warehouse_operations" ADD COLUMN     "organization_id" INTEGER NOT NULL,
ALTER COLUMN "service_location_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Warehouses" ADD COLUMN     "organization_id" INTEGER NOT NULL,
ALTER COLUMN "service_location_id" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Price_lists" ADD CONSTRAINT "Price_lists_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouses" ADD CONSTRAINT "Warehouses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
