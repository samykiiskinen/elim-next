-- CreateTable
CREATE TABLE "aid_projects" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "accountName" VARCHAR(64) NOT NULL,
    "country" VARCHAR(64) NOT NULL,
    "receiver" VARCHAR(128) NOT NULL,
    "purpose" VARCHAR(512) NOT NULL,
    "decision" VARCHAR(64) NOT NULL,
    "income" INTEGER NOT NULL,
    "expense" INTEGER NOT NULL,

    CONSTRAINT "aid_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "aidProjectId" INTEGER NOT NULL,
    "filePath" VARCHAR(512) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_aidProjectId_fkey" FOREIGN KEY ("aidProjectId") REFERENCES "aid_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
