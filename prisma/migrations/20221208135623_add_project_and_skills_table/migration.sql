-- AlterTable
ALTER TABLE "users" ADD COLUMN     "project_id" INTEGER;

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT,
    "short_description" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "project_image" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_name" TEXT,
    "display_name" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_with_skills" (
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "user_with_skills_pkey" PRIMARY KEY ("user_id","skill_id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_with_skills" ADD CONSTRAINT "user_with_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_with_skills" ADD CONSTRAINT "user_with_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
