// signInWithMagicLink.ts
'use server';

import { redirect } from 'next/navigation';
import { supabaseServer } from '../utils/supabase/SB-server';
import { revalidatePath } from 'next/cache';

interface ActionResult {
  status: 'success' | 'error';
  message: string;
}

async function signInWithMagicLink(_: any, formData: FormData): Promise<ActionResult> {
  const supabase = await supabaseServer();
  const email = formData.get('email') as string;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:3000',
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

async function signUpWithEmail(_: any, formData: FormData): Promise<ActionResult> {
  const supabase = await supabaseServer();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3000',
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

async function signInWithEmail(_: any, formData: FormData): Promise<ActionResult> {
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

export { signUpWithEmail, signInWithEmail, signInWithMagicLink };
