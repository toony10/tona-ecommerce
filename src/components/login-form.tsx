'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { signUpWithEmail, signInWithEmail, signInWithMagicLink } from "@/actions/register"
import Aleart, { successMsg, failedMsg } from "./Shared/Aleart"

export function LoginForm({
  className = "",
  ...props
}: React.ComponentProps<"form">) {

  const [newUser, setNewUser] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [pending, setPending] = useState(false)

  const [signUpState, signUpAction, signUpIsPending] = useActionState(signUpWithEmail, null)
  const [signInState, signInAction, signInIsPending] = useActionState(signInWithEmail, null)
  const [MLState, MLAction, MLIsPending] = useActionState(signInWithMagicLink, null)

  function selectAction() {
    if (forgotPassword) {
      return MLAction
    } else if (!newUser && !forgotPassword) {
      return signInAction
    } else if (newUser) {
      return signUpAction
    }
  }

  useEffect(() => {
    setPending(signUpIsPending || signInIsPending || MLIsPending)
  }, [signUpIsPending, signInIsPending, MLIsPending])

  useEffect(() => {
    if (signUpState) {
      setShowMsg(true)
    }
    if (signInState) {
      setShowMsg(true)
    }
    if (MLState) {
      setShowMsg(true)
    }
  }, [signUpState, signInState, MLState])


  useEffect(() => {
    if (signInState?.status === 'success') {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [signInState]);

  return (
    <div>
      <form className={ cn("flex flex-col gap-6", className) } { ...props } action={ selectAction() }>
        { signUpState && (
          <Aleart
            text={ signUpState.message }
            color={ signUpState.status === 'success' ? successMsg : failedMsg }
            appearance={ showMsg }
            setMessage={ setShowMsg }
          />
        ) }
        { signInState && (
          <Aleart
            text={ signInState.message }
            color={ signInState.status === 'success' ? successMsg : failedMsg }
            appearance={ showMsg }
            setMessage={ setShowMsg }
          />
        ) }
        { MLState && (
          <Aleart
            text={ MLState.message }
            color={ MLState.status === 'success' ? successMsg : failedMsg }
            appearance={ showMsg }
            setMessage={ setShowMsg }
          />
        ) }
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{ newUser ? 'Join Us' : 'Login to your account' }</h1>
          <p className="text-muted-foreground text-sm text-balance">
            { newUser ?
              'Enter a valid email below to create your account'
              : 'Enter your email below to login to your account'
            }
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required />
          </div>
          { forgotPassword ?
            <div className="text-center flex flex-col">
              <div className="font-semibold">
                don&apos;t worry, you can sign in with magic link.
                <span className="font-extrabold">just enter your email above!</span>
              </div>
              <button type="button" className="mt-5 hover:underline underline-offset-4 cursor-pointer" onClick={ () => setForgotPassword(prev => !prev) }>⬅ Back to normal sgin in</button>
            </div> : <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                { !newUser &&
                  <button
                    type="button"
                    className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                    onClick={ () => setForgotPassword(prev => !prev) }
                  >
                    Forgot your password?
                  </button>
                }
              </div>
              <Input id="password" type="password" name="password" placeholder="Password" required />
            </div> }
          <Button type="submit" className="w-full bg-primary cursor-pointer flex gap-3" disabled={ pending }>
            { newUser ? 'Sign up' : 'Sign in' }
          </Button>
        </div>
      </form>

      <form className="flex flex-col gap-3 mt-5">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            OR
          </span>
        </div>
        <Button variant="outline" className="w-full cursor-pointer">
          <FcGoogle />
          continue with Google
        </Button>
        <div className="text-center text-sm">
          { newUser ? 'already have account?' : `Don${ "'" }t have an account?` }
          <button type='button' className="underline underline-offset-4 cursor-pointer" onClick={ () => {
            if (forgotPassword) {
              setForgotPassword(false)
            }
            setNewUser(prev => !prev)
          } }>
            { newUser ? "Sign in" : 'Sign up' }
          </button>
        </div>
      </form>
    </div>
  )
}