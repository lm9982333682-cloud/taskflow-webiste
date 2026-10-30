import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuthHook from "../hooks/useAuthHook";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { onSubmitRegister, watch, handleSubmit, errors, register, isSubmitting, } = useAuthHook();


  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const getPasswordStrength = (value = "") => {
    if (!value) return { score: 0, label: "Too Short" };

    let score = 0;

    if (value.length >= 8) score++;

    if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;

    if (/[^A-Za-z0-9]/.test(value) && value.length >= 10) score++;

    if (score <= 1) return { score: 1, label: "Weak" };

    if (score === 2) return { score: 2, label: "Medium" };

    return { score: 3, label: "Strong" };

  };

  const strength = getPasswordStrength(password);

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;


  const inputClass = "h-11 w-full rounded-lg bg-[#000f21] pl-10 pr-4 text-sm text-[#d3e4fe] shadow-sm outline-none transition-colors placeholder:text-[#918fa1]/70 focus:bg-[#102034] focus:ring-1 focus:ring-[#c3c0ff]";

  const errorClass = "text-xs text-[#ffb4ab]";

  return (

    <div className="flex min-h-screen flex-col justify-between overflow-x-hidden bg-[#031427] text-[#d3e4fe]">

      {/* Header */}

      <header className="flex w-full items-center justify-center px-4 pt-4 md:pt-8">
        <Link to="/" className="group inline-flex items-center gap-2 focus:outline-none">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f46e5] text-xl text-white shadow-sm">
            ▥
          </span>
          <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[#c3c0ff]">
            TaskFlow
          </span>
        </Link>
      </header>

      {/* Main */}

      <main className="flex w-full flex-1 items-center justify-center px-4 py-8 md:px-8">
        <div className="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center">
          {/* Background effects */}
          <div className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          {/* Register Card */}

          <section className="relative z-10 flex w-full flex-col gap-5 rounded-xl bg-[#0b1c30] p-6 shadow-2xl sm:gap-6 sm:p-10">
            {/* Heading */}

            <div className="flex flex-col items-center gap-1 text-center">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#26364a] px-3 py-1 text-xs font-medium text-[#89ceff] shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4edea3]" />
                <span className="font-mono"> v2.4.0 High-Velocity Engine </span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight"> Create your TaskFlow account</h1>
              <p className="max-w-md text-sm leading-6 text-[#c7c4d8]">
                Start managing your sprints and engineering tasks with zero latency
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit(onSubmitRegister)}
              noValidate
              className="flex flex-col gap-3"
            >

              {/* Full Name */}

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="flex items-center justify-between text-xs font-medium text-[#c7c4d8]"
                >
                  <span>Full Name</span>
                  <span className="font-mono text-[10px] text-[#c7c4d8]/60">
                    Required
                  </span>
                </label>

                <div className="relative flex items-center">

                  <span className="pointer-events-none absolute left-3 text-lg text-[#c7c4d8]">♙</span>

                  <input
                    id="name"
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={`${inputClass} ${errors.name ? "ring-1 ring-[#ffb4ab]" : ""
                      }`}

                    {...register("name", {
                      required: "Full name is required.",
                      minLength: {
                        value: 2,
                        message: "Name must contain at least 2 characters.",
                      },

                      validate: (value) =>
                        value.trim().length >= 2 ||
                        "Please enter a valid name.",
                    })}

                  />
                </div>

                {errors.name && (<p className={errorClass}>{errors.name.message}</p>)}

              </div>

              {/* Work Email */}

              <div className="flex flex-col gap-1.5">

                <div className="flex items-center justify-between gap-2">

                  <label htmlFor="email" className="text-xs font-medium text-[#c7c4d8]">
                    Work Email
                  </label>

                  {email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && !errors.email && (
                    <span className="flex items-center gap-1 text-[11px] text-[#4edea3]"> ✓ Valid email</span>
                  )}

                </div>

                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-base text-[#c7c4d8]">✉</span>
                  <input id="email"
                    type="email"
                    placeholder="alex@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={`${inputClass} ${errors.email ? "ring-1 ring-[#ffb4ab]" : ""

                      }`}

                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: "Please enter a valid email address.",
                      },
                      setValueAs: (value) => value.trim(),
                    })}
                  />
                </div>
                {errors.email && (<p className={errorClass}>{errors.email.message}</p>)}
              </div>

              {/* Password */}

              <div className="flex flex-col gap-1.5">

                <label htmlFor="password" className="text-xs font-medium text-[#c7c4d8]">Password </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-base text-[#c7c4d8]">🔒</span>

                  <input id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.password)}
                    className={`${inputClass} pr-12 font-mono placeholder:font-sans ${errors.password ? "ring-1 ring-[#ffb4ab]" : ""
                      }`}

                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 8,
                        message: "Password must contain at least 8 characters.",
                      },

                    })}

                  />

                  <button type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 flex cursor-pointer items-center justify-center rounded p-1.5 text-[#c7c4d8] transition-colors hover:bg-[#26364a] hover:text-white"

                  >{showPassword ? "◉" : "◎"}</button>

                </div>

                {errors.password && (<p className={errorClass}>{errors.password.message}</p>)}

                {/* Password Strength */}

                <div className="mt-1 flex flex-col gap-1.5 rounded-lg bg-[#000f21]/60 p-2.5">

                  <div className="flex items-center justify-between text-[11px] font-semibold">

                    <span className="text-[#c7c4d8]">Security Rating</span>

                    <span className={`font-mono ${strength.score === 3 ? "text-[#4edea3]"
                      : strength.score === 2 ? "text-[#89ceff]"
                        : strength.score === 1 ? "text-[#ffb4ab]"
                          : "text-[#918fa1]"
                      }`}

                    >
                      {strength.label}
                    </span>

                  </div>

                  <div className="grid h-1.5 w-full grid-cols-3 gap-1.5">

                    {[1, 2, 3].map((bar) => (

                      <div

                        key={bar}

                        className={`h-full rounded-full transition-all duration-300 ${strength.score >= bar

                          ? strength.score === 3

                            ? "bg-[#4edea3]"

                            : strength.score === 2

                              ? "bg-[#89ceff]"

                              : "bg-[#ffb4ab]"

                          : "bg-[#26364a]"

                          }`}

                      />

                    ))}

                  </div>

                </div>

              </div>

              {/* Confirm Password */}

              <div className="flex flex-col gap-1.5">

                <div className="flex items-center justify-between gap-2">

                  <label

                    htmlFor="confirmPassword"

                    className="text-xs font-medium text-[#c7c4d8]"

                  >

                    Confirm Password

                  </label>

                  {confirmPassword && (

                    <span

                      className={`text-[11px] ${passwordsMatch ? "text-[#4edea3]" : "text-[#ffb4ab]"

                        }`}

                    >

                      {passwordsMatch

                        ? "✓ Passwords match"

                        : "✕ Do not match"}

                    </span>

                  )}

                </div>

                <div className="relative flex items-center">

                  <span className="pointer-events-none absolute left-3 text-base text-[#c7c4d8]">

                    🔒

                  </span>

                  <input

                    id="confirmPassword"

                    type={showConfirmPassword ? "text" : "password"}

                    placeholder="Repeat your password"

                    autoComplete="new-password"

                    aria-invalid={Boolean(errors.confirmPassword)}

                    className={`${inputClass} pr-12 font-mono placeholder:font-sans ${errors.confirmPassword ? "ring-1 ring-[#ffb4ab]" : ""

                      }`}

                    {...register("confirmPassword", {

                      required: "Please confirm your password.",

                      validate: (value) =>

                        value === watch("password") ||

                        "Passwords do not match.",

                    })}

                  />

                  <button

                    type="button"

                    aria-label="Toggle confirm password visibility"

                    onClick={() =>

                      setShowConfirmPassword((prev) => !prev)

                    }

                    className="absolute right-2 flex cursor-pointer items-center justify-center rounded p-1.5 text-[#c7c4d8] transition-colors hover:bg-[#26364a] hover:text-white"

                  >

                    {showConfirmPassword ? "◉" : "◎"}

                  </button>

                </div>

                {errors.confirmPassword && (

                  <p className={errorClass}>

                    {errors.confirmPassword.message}

                  </p>

                )}

              </div>

              {/* Terms */}

              <div className="mt-1">

                <label className="flex cursor-pointer items-start gap-3">

                  <input

                    type="checkbox"

                    className="mt-0.5 h-4 w-4 cursor-pointer accent-[#4f46e5]"

                    {...register("terms", {

                      required:

                        "Please accept the Terms of Service and Privacy Policy.",

                    })}

                  />

                  <span className="text-xs leading-5 text-[#c7c4d8]">

                    I agree to the{" "}

                    <a

                      href="#terms"

                      onClick={(event) => event.preventDefault()}

                      className="text-[#c3c0ff] hover:underline"

                    >

                      Terms of Service

                    </a>{" "}

                    and{" "}

                    <a

                      href="#privacy"

                      onClick={(event) => event.preventDefault()}

                      className="text-[#c3c0ff] hover:underline"

                    >

                      Privacy Policy

                    </a>

                  </span>

                </label>

                {errors.terms && (

                  <p className={`${errorClass} mt-1`}>

                    {errors.terms.message}

                  </p>

                )}

              </div>

              {/* Submit */}

              <button

                type="submit"

                disabled={isSubmitting}

                className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4f46e5] text-sm font-semibold tracking-wide text-white shadow-lg transition-all hover:bg-[#c3c0ff] hover:text-[#1d00a5] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#c3c0ff] disabled:cursor-not-allowed disabled:opacity-60"

              >

                <span>Create TaskFlow Account</span>

                <span className="text-lg">→</span>

              </button>

            </form>

            {/* Sign In */}

            <div className="flex flex-col items-center gap-3 pt-2">

              <div className="flex items-center gap-1 text-center text-xs text-[#c7c4d8]">

                <span>Already have an account?</span>

                <Link

                  to="/login"

                  className="flex items-center gap-0.5 font-medium text-[#c3c0ff] transition-colors hover:text-white hover:underline"

                >

                  Sign in <span>›</span>

                </Link>

              </div>

              <div className="flex items-center justify-center gap-2 rounded-lg bg-[#000f21]/80 px-3 py-2 text-center font-mono text-[10px] text-[#c7c4d8] shadow-inner">

                <span className="text-[#4edea3]">ϟ</span>

                <span>Fast local storage sync · No cloud lock-in</span>

              </div>

            </div>

          </section>

          {/* Feature Cards */}

          <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3 text-center">

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg font-bold text-[#89ceff]">0ms</span>

              <span className="mt-1 text-[10px] text-[#c7c4d8]">

                Input Latency

              </span>

            </div>

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg font-bold text-[#4edea3]">100%</span>

              <span className="mt-1 text-[10px] text-[#c7c4d8]">

                Offline Capable

              </span>

            </div>

            <div className="flex flex-col items-center rounded-lg bg-[#0b1c30]/50 p-3">

              <span className="text-lg font-bold text-[#c3c0ff]">E2EE</span>

              <span className="mt-1 text-[10px] text-[#c7c4d8]">

                Sync Security

              </span>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}