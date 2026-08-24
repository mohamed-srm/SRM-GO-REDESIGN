/*
  Warnings:

  - Added the required column `description` to the `Demande` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Demande" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En attente',
    "reference" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Demande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Demande" ("createdAt", "id", "reference", "status", "title", "updatedAt", "userId") SELECT "createdAt", "id", "reference", "status", "title", "updatedAt", "userId" FROM "Demande";
DROP TABLE "Demande";
ALTER TABLE "new_Demande" RENAME TO "Demande";
CREATE UNIQUE INDEX "Demande_reference_key" ON "Demande"("reference");
CREATE INDEX "Demande_userId_idx" ON "Demande"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
