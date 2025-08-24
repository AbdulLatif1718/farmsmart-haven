-- 1) Ensure profiles are auto-created for new users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 2) Patch NULL token columns in auth.users to prevent GoTrue scan errors
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='auth' AND table_name='users' AND column_name='confirmation_token'
  ) THEN
    UPDATE auth.users SET confirmation_token = '' WHERE confirmation_token IS NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='auth' AND table_name='users' AND column_name='email_change_token_current'
  ) THEN
    UPDATE auth.users SET email_change_token_current = '' WHERE email_change_token_current IS NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='auth' AND table_name='users' AND column_name='email_change_token_new'
  ) THEN
    UPDATE auth.users SET email_change_token_new = '' WHERE email_change_token_new IS NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='auth' AND table_name='users' AND column_name='recovery_token'
  ) THEN
    UPDATE auth.users SET recovery_token = '' WHERE recovery_token IS NULL;
  END IF;
END $$;

-- 3) Ensure admin emails are marked confirmed to avoid auth loops
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
    confirmed_at = COALESCE(confirmed_at, now())
WHERE email IN ('admin@agriverse.africa', 'tva@agriverse.africa');