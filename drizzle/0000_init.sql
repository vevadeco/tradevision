CREATE TABLE IF NOT EXISTS "user_progress" (
  "user_id" text PRIMARY KEY NOT NULL,
  "xp" integer DEFAULT 0 NOT NULL,
  "total_score" integer DEFAULT 0 NOT NULL,
  "completed_lessons" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "completed_case_studies" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "completed_tutorials" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "badges" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
