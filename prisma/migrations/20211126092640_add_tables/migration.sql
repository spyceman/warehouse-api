-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'admin', 'super_admin');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('everybody', 'nobody', 'specific_users');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('sale', 'arrival', 'other_arrival', 'eternal_transfer', 'PurchaseReturn', 'OtherExpenditure');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',
    "role" "Role" NOT NULL DEFAULT E'employee',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price_lists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "service_location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Price_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price_list_items" (
    "id" SERIAL NOT NULL,
    "price_list_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Price_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price_list_settings" (
    "id" SERIAL NOT NULL,
    "price_list_id" INTEGER NOT NULL,
    "permission" "Permission" NOT NULL DEFAULT E'everybody',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Price_list_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse_products" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Warehouse_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse_operations" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL DEFAULT E'sale',
    "service_location_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,
    "responsible_user_id" INTEGER NOT NULL,
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "created_manually" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Warehouse_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse_operation_items" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_name" TEXT NOT NULL,
    "warehouse_operation_id" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Warehouse_operation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "service_location_id" INTEGER NOT NULL,
    "track_consumables" BOOLEAN NOT NULL DEFAULT false,
    "default_for_arrival" BOOLEAN NOT NULL DEFAULT false,
    "default_for_sale" BOOLEAN NOT NULL DEFAULT false,
    "price_list_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT E'',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT NOT NULL DEFAULT E'',
    "changed_by" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_name_key" ON "Organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_location_id_key" ON "Organizations"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Price_lists_name_key" ON "Price_lists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_products_product_id_key" ON "Warehouse_products"("product_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price_lists" ADD CONSTRAINT "Price_lists_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "Organizations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price_list_items" ADD CONSTRAINT "Price_list_items_price_list_id_fkey" FOREIGN KEY ("price_list_id") REFERENCES "Price_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price_list_settings" ADD CONSTRAINT "Price_list_settings_price_list_id_fkey" FOREIGN KEY ("price_list_id") REFERENCES "Price_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_products" ADD CONSTRAINT "Warehouse_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Price_list_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_products" ADD CONSTRAINT "Warehouse_products_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_responsible_user_id_fkey" FOREIGN KEY ("responsible_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "Organizations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "Warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operations" ADD CONSTRAINT "Warehouse_operations_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "Warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operation_items" ADD CONSTRAINT "Warehouse_operation_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Price_list_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_operation_items" ADD CONSTRAINT "Warehouse_operation_items_warehouse_operation_id_fkey" FOREIGN KEY ("warehouse_operation_id") REFERENCES "Warehouse_operations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouses" ADD CONSTRAINT "Warehouses_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "Organizations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouses" ADD CONSTRAINT "Warehouses_price_list_id_fkey" FOREIGN KEY ("price_list_id") REFERENCES "Price_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
