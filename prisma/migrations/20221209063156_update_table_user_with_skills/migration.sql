-- AlterTable
ALTER TABLE "user_with_skills" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone;
