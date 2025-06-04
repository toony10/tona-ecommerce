'use server';
import { supabaseServer } from '../utils/supabase/SB-server';

interface ActionResult {
  status: 'success' | 'error';
  message: string;
}

async function signInWithMagicLink(prev: unknown, formData: FormData): Promise<ActionResult> {
  const supabase = await supabaseServer();
  const email = formData.get('email') as string;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.SITE_URL,
      shouldCreateUser: false,
    },
  });

  if (error) {
    return {
      status: 'error',
      message: error.message || 'Something went wrong',
    };
  }

  return {
    status: 'success',
    message: 'Please, Check your email for the magic link',
  };
}

async function signUpWithEmail(prev: unknown, formData: FormData): Promise<ActionResult> {
  const supabase = await supabaseServer();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.SITE_URL,
    },
  });

  if (error) {
    return {
      status: 'error',
      message: error.message || 'Something went wrong',
    };
  }

  return {
    status: 'success',
    message: 'Sign up successful! Please check your email to confirm your account.',
  };
}

async function signInWithEmail(prev: unknown, formData: FormData): Promise<ActionResult> {
  const supabase = await supabaseServer();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: 'error',
      message: error.message || 'Invalid email or password',
    };
  }

  return {
    status: 'success',
    message: 'Welcome Back!',
  };
}

async function signInWithGoogle(): Promise<ActionResult> {
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000',
    },
  });

  if (error) {
    return {
      status: 'error',
      message: error.message || 'Google sign-in failed',
    };
  }

  return {
    status: 'success',
    message: 'Redirecting to Google sign-in...',
  };
}
export { signUpWithEmail, signInWithEmail, signInWithMagicLink, signInWithGoogle };
