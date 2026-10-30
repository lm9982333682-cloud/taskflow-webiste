import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance.js";
import useAuthHook from "../hooks/useAuthHook.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, watch, handleSubmit, onSubmitLogin, errors, isSubmitting } = useAuthHook();

  const email = watch("email", "");


  return (

    <div className="flex min-h-screen flex-col justify-between bg-[#031427] text-[#d3e4fe]">

      {/* Header */}

      <header className="flex w-full items-center justify-center px-4 pt-4 md:pt-8">

        <Link

          to="/"

          className="group inline-flex items-center gap-2"

        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f46e5] text-xl text-white">

            ▥

          </span>

          <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[#c3c0ff]">

            TaskFlow

          </span>

        </Link>

      </header>

      {/* Main */}

      <main className="flex flex-1 items-center justify-center px-4 py-8 md:px-8">

        <div className="relative flex w-full max-w-[460px] flex-col items-center">

          {/* Background glow */}

          <div className="pointer-events-none absolute -top-16 left-1/2 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-10 right-0 -z-0 h-60 w-60 rounded-full bg-emerald-600/10 blur-3xl" />

          {/* Login card */}

          <section className="relative z-10 flex w-full flex-col rounded-xl bg-[#0b1c30] p-5 shadow-2xl sm:p-8">

            {/* Heading */}

            <div className="flex flex-col items-center text-center">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1b2b3f] px-3 py-1.5 text-[#c3c0ff] shadow-sm">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4edea3]" />

                <span className="font-mono text-[11px] font-medium uppercase tracking-wider">

                  Sprint Engine v1.0

                </span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-[26px]">

                Welcome back to TaskFlow

              </h1>

              <p className="mt-2 text-sm text-[#c7c4d8]">

                Sign in to access your Kanban sprint board and tasks

              </p>

            </div>

            {/* GitHub and Google */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button

                type="button"

                onClick={() =>

                  alert("GitHub authentication is not connected yet.")

                }

                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#102034] px-3 py-3 text-sm transition hover:bg-[#1b2b3f] focus:outline-none focus:ring-2 focus:ring-indigo-400"

              >

                <svg

                  viewBox="0 0 24 24"

                  className="h-4 w-4 fill-current"

                  aria-hidden="true"

                >

                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />

                </svg>

                GitHub

              </button>

              <button

                type="button"

                onClick={() =>

                  alert("Google authentication is not connected yet.")

                }

                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#102034] px-3 py-3 text-sm transition hover:bg-[#1b2b3f] focus:outline-none focus:ring-2 focus:ring-indigo-400"

              >

                <svg

                  viewBox="0 0 24 24"

                  className="h-4 w-4"

                  aria-hidden="true"

                >

                  <path

                    fill="#4285F4"

                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"

                  />

                  <path

                    fill="#34A853"

                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"

                  />

                  <path

                    fill="#FBBC05"

                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22z"

                  />

                  <path

                    fill="#EA4335"

                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"

                  />

                </svg>

                Google

              </button>

            </div>

            {/* Divider */}

            <div className="relative my-6 flex items-center justify-center">

              <div className="h-px w-full bg-[#26364a]" />

              <span className="absolute whitespace-nowrap bg-[#0b1c30] px-3 text-[10px] font-semibold uppercase tracking-wider text-[#c7c4d8]">

                Or continue with email

              </span>

            </div>

            {/* Form */}

            <form

              onSubmit={handleSubmit(onSubmitLogin)}

              noValidate

              className="flex flex-col gap-4"

            >

              {/* Email */}

              <div className="flex flex-col gap-1.5">

                <label

                  htmlFor="emailInput"

                  className="flex items-center justify-between text-xs font-medium"

                >

                  <span>Work Email</span>

                  {email && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim()) && (

                    <span className="text-xs text-[#4edea3]">

                      Verified

                    </span>

                  )}

                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#c7c4d8]">

                    ✉

                  </span>

                  <input

                    id="emailInput"

                    name="email"

                    type="email"

                    autoComplete="email"

                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid engineering or corporate email",
                      },
                    })}

                    placeholder="name\@company.com"

                    className="w-full rounded-lg bg-[#000f21] py-3 pl-10 pr-3 text-sm text-[#d3e4fe] outline-none transition placeholder:text-[#918fa1] focus:bg-[#102034] focus:ring-1 focus:ring-[#c3c0ff]"

                  />

                </div>

                {errors.email && (

                  <p className="mt-1 flex items-center gap-1 text-xs text-[#ffb4ab]">

                    <span>⚠</span>

                    {errors.email.message}

                  </p>

                )}

              </div>

              {/* Password */}

              <div className="flex flex-col gap-1.5">

                <div className="flex items-center justify-between">

                  <label

                    htmlFor="passwordInput"

                    className="text-xs font-medium"

                  >

                    Password

                  </label>

                  <button

                    type="button"

                    onClick={() =>

                      alert("Password recovery will be connected later.")

                    }

                    className="cursor-pointer text-xs text-[#c3c0ff] transition hover:text-white"

                  >

                    Forgot Password?

                  </button>

                </div>

                <div className="relative">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#c7c4d8]">

                    🔒

                  </span>

                  <input

                    id="passwordInput"

                    name="password"

                    type={showPassword ? "text" : "password"}

                    autoComplete="current-password"

                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}

                    placeholder="••••••••••••"

                    className="w-full rounded-lg bg-[#000f21] py-3 pl-10 pr-12 text-sm text-[#d3e4fe] outline-none transition placeholder:text-[#918fa1] focus:bg-[#102034] focus:ring-1 focus:ring-[#c3c0ff]"

                  />

                  <button

                    type="button"

                    aria-label="Toggle password visibility"

                    onClick={() =>

                      setShowPassword((prev) => !prev)

                    }

                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-[#c7c4d8] hover:text-white"

                  >

                    {showPassword ? "◉" : "◎"}

                  </button>

                </div>

                {errors.password && (

                  <p className="mt-1 flex items-center gap-1 text-xs text-[#ffb4ab]">

                    <span>⚠</span>

                    {errors.password.message}

                  </p>

                )}

              </div>

              {/* Remember Me */}

              <div className="flex items-center justify-between gap-2 pt-1">

                <label className="flex cursor-pointer items-center gap-2 text-xs text-[#c7c4d8]">

                  <input

                    type="checkbox"

                    defaultChecked={false}

                    className="h-4 w-4 cursor-pointer accent-indigo-500"

                  />

                  Remember me for 30 days

                </label>

                <span className="font-mono text-[10px] text-[#c7c4d8]/70">

                  AES-256

                </span>

              </div>

              {/* Submit */}

              <button

                type="submit"

                disabled={isSubmitting}

                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-5 py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.99] hover:bg-[#c3c0ff] hover:text-[#1d00a5] disabled:cursor-not-allowed disabled:opacity-70"

              >

                {isSubmitting ? (
                  <>
                    <span className="animate-spin">◌</span>
                    Authenticating...
                  </>
                ) : (
                  <>

                    Sign In to TaskFlow

                    <span>→</span>

                  </>

                )}

              </button>

              {errors.root && (
                <p role="alert" className="text-center text-xs text-[#ffb4ab]">
                  {errors.root.message}
                </p>
              )}

            </form>

            {/* Register link */}

            <div className="-mx-5 -mb-5 mt-6 flex items-center justify-center gap-1 rounded-b-xl bg-[#1b2b3f]/40 p-4 text-center sm:-mx-8 sm:-mb-8">

              <span className="text-xs text-[#c7c4d8]">

                Don't have an account?

              </span>

              <Link

                to="/register"

                className="text-xs font-semibold text-[#c3c0ff] transition hover:text-white"

              >

                Create an account

              </Link>

            </div>

          </section>

          {/* Storage Guarantee */}

          <div className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg bg-[#000f21]/80 px-4 py-3 shadow-sm">

            <div className="flex min-w-0 items-center gap-3">

              <span className="text-lg text-[#4edea3]">▤</span>

              <div className="flex min-w-0 flex-col">

                <span className="truncate text-xs font-semibold">

                  100% Client-Side Ready

                </span>

                <span className="truncate font-mono text-[10px] text-[#c7c4d8]">

                  LocalStorage persistence active

                </span>

              </div>

            </div>

            <div className="flex shrink-0 items-center gap-1.5">

              <span className="h-2 w-2 rounded-full bg-[#4edea3]" />

              <span className="font-mono text-[10px] uppercase text-[#4edea3]">

                Encrypted

              </span>

            </div>

          </div>

          {/* Mini Features */}

          <div className="mt-4 grid w-full grid-cols-3 gap-3 text-center">

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg text-[#89ceff]">ϟ</span>

              <span className="mt-1 text-[11px]">Instant Sync</span>

            </div>

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg text-[#4edea3]">⌨</span>

              <span className="mt-1 text-[11px]">Vim Ergonomics</span>

            </div>

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg text-[#c3c0ff]">▥</span>

              <span className="mt-1 text-[11px]">Kanban Views</span>

            </div>

          </div>

        </div>

      </main>

      {/* Footer */}

      <footer className="w-full px-4 pb-5 text-center md:pb-8">

        <p className="text-[11px] text-[#c7c4d8]">

          © 2025 TaskFlow Inc. Built for high-velocity engineering teams.

        </p>

      </footer>

    </div>

  );

}
