-- Ensure admin profile exists for tva@agriverse.africa
DO $$
DECLARE
    user_exists boolean;
    admin_email text := 'tva@agriverse.africa';
BEGIN
    -- Check if the admin profile already exists
    SELECT EXISTS(
        SELECT 1 FROM public.profiles 
        WHERE email = admin_email AND role = 'admin'
    ) INTO user_exists;
    
    -- If admin profile doesn't exist, create it
    IF NOT user_exists THEN
        -- First delete any existing profile with this email
        DELETE FROM public.profiles WHERE email = admin_email;
        
        -- Create the admin profile
        INSERT INTO public.profiles (
            user_id, 
            email, 
            full_name, 
            role
        ) VALUES (
            gen_random_uuid(), -- Temporary UUID, will be updated on first login
            admin_email,
            'TVA Admin',
            'admin'
        );
    END IF;
END $$;