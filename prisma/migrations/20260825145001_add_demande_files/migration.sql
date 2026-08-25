-- CreateTable
CREATE TABLE "DemandeFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "demandeId" INTEGER NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DemandeFile_demandeId_fkey" FOREIGN KEY ("demandeId") REFERENCES "Demande" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DemandeFile_fileName_key" ON "DemandeFile"("fileName");

-- CreateIndex
CREATE INDEX "DemandeFile_demandeId_idx" ON "DemandeFile"("demandeId");
