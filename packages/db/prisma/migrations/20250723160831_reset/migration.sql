/*
  Warnings:

  - You are about to drop the `NotificationHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationPreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificationHistory" DROP CONSTRAINT "NotificationHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationHistory" DROP CONSTRAINT "NotificationHistory_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationPreference" DROP CONSTRAINT "NotificationPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropTable
DROP TABLE "NotificationHistory";

-- DropTable
DROP TABLE "NotificationPreference";

-- DropEnum
DROP TYPE "NotificationChannel";

-- DropEnum
DROP TYPE "NotificationStatus";

-- DropEnum
DROP TYPE "NotificationType";
