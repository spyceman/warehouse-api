/*
  Warnings:

  - The `created_by` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Price_list_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Price_list_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Price_list_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Price_list_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Price_list_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Price_list_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Price_lists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Price_lists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Price_lists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Warehouse_operation_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Warehouse_operation_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Warehouse_operation_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Warehouse_operations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Warehouse_operations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Warehouse_operations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Warehouse_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Warehouse_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Warehouse_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `Warehouses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `Warehouses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changed_by` column on the `Warehouses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Price_list_items" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Price_list_settings" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Price_lists" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Warehouse_operation_items" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Warehouse_operations" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Warehouse_products" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Warehouses" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "changed_by",
ADD COLUMN     "changed_by" INTEGER NOT NULL DEFAULT 0;
