-- AlterTable
ALTER TABLE "Price_list_items" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Warehouse_operation_items" ALTER COLUMN "count" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Warehouse_products" ALTER COLUMN "count" SET DATA TYPE DOUBLE PRECISION;
