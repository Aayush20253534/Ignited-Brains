"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PortalIcon, type PortalIconName } from "@/components/ui/portal-icon";
import { cn } from "@/lib/cn";
import styles from "./admin-auth-screens.module.css";

type AdminIdentity = { id: string; name: string; email: string };

function AuthShell({
  signedOut = false,
  children,
}: {
  signedOut?: boolean;
  children: ReactNode;
}) {
  const securityItems: [PortalIconName, string, string][] = [
    [
      "shield",
      "Your data stays secure",
      "Your session has been completely ended.",
    ],
    [
      "lock",
      "Protected access",
      "Keep your administrator account safe and private.",
    ],
    [
      "people",
      "Continue making an impact",
      "Sign in again anytime to manage enquiries, applications and more.",
    ],
  ];
  return (
    <main className={cn(styles.shell, signedOut && styles.signedOut)}>
      <section
        className={styles.visual}
        aria-label="Ignited Brains administration portal"
      >
        <Image
          src={
            signedOut
              ? "/admin/signed-out-workspace.webp"
              : "/admin/sign-in-workspace.webp"
          }
          alt=""
          fill
          preload
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 56vw"
          className={styles.workspacePhoto}
        />
        <div className={styles.visualShade} aria-hidden="true" />
        {!signedOut ? (
          <div className={styles.portalGraphic} aria-hidden="true">
            <span>
              <PortalIcon name="shield" />
            </span>
            <i />
            <i />
          </div>
        ) : null}
        <BrandLogo inverted className={styles.brand} />
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>Administration Portal</p>
          {signedOut ? (
            <>
              <h2>
                <span>Thank you</span> for
                <br />
                being part of our
                <br />
                mission.
              </h2>
              <p className={styles.supporting}>
                You have been successfully signed out from the Ignited Brains
                administrator portal.
              </p>
              <ul className={styles.securityItems}>
                {securityItems.map(([icon, title, description]) => (
                  <li key={title}>
                    <span>
                      <PortalIcon name={icon} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2>
                Keep every enquiry
                <br />
                and <span>application</span>
                <br />
                <span>moving.</span>
              </h2>
              <p className={styles.supporting}>
                Review incoming leads, track applicants, update statuses and
                keep the Ignited Brains team aligned from one secure workspace.
              </p>
              <ul
                className={styles.workspaceFeatures}
                aria-label="Administrator workspace"
              >
                <li>
                  <PortalIcon name="email" />
                  Enquiries
                </li>
                <li>
                  <PortalIcon name="document" />
                  Applications
                </li>
                <li>
                  <PortalIcon name="people" />
                  Team access
                </li>
              </ul>
            </>
          )}
        </div>
        <p className={styles.visualFooter}>
          {signedOut
            ? "Transforming Education Through Innovation"
            : "Restricted access · Ignited Brains internal use"}
        </p>
      </section>
      <section
        className={styles.cardPanel}
        aria-label={
          signedOut ? "Sign-out confirmation" : "Admin authentication"
        }
      >
        {children}
      </section>
    </main>
  );
}

export function AdminLogin({
  onAuthenticated,
  sessionError = "",
}: {
  onAuthenticated: (token: string, admin: AdminIdentity) => void;
  sessionError?: string;
}) {
  type OtpChallenge = {
    challengeId: string;
    maskedEmail: string;
    expiresInSeconds: number;
  };

  const [stage, setStage] = useState<"credentials" | "otp">("credentials");
  const [challenge, setChallenge] = useState<OtpChallenge | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const pendingRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => {
    if (stage === "otp") otpRef.current?.focus({ preventScroll: true });
    else headingRef.current?.focus({ preventScroll: true });
  }, [stage]);

  async function requestAuth(path: string, body: Record<string, string>) {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.error || "Unable to complete authentication. Please try again.");
    return payload;
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    setError("");
    setInfo("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setError("Enter your password.");
      passwordRef.current?.focus();
      return;
    }

    pendingRef.current = true;
    setLoading(true);
    try {
      const payload = await requestAuth("/api/v1/admin/auth/login", { email: email.trim(), password });
      if (!payload?.requiresOtp || !payload?.challengeId) {
        throw new Error("The server returned an unexpected response. Please try again.");
      }
      setChallenge({
        challengeId: payload.challengeId,
        maskedEmail: payload.maskedEmail || "your administrator email",
        expiresInSeconds: Number(payload.expiresInSeconds || 600),
      });
      setPassword("");
      setOtp("");
      setStage("otp");
      setInfo("Verification code sent.");
    } catch (authError) {
      if (!(authError instanceof DOMException && authError.name === "AbortError")) {
        setError(authError instanceof Error ? authError.message : "Unable to sign in. Please try again.");
      }
    } finally {
      pendingRef.current = false;
      setLoading(false);
    }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current || !challenge) return;
    setError("");
    setInfo("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the six-digit verification code.");
      otpRef.current?.focus();
      return;
    }

    pendingRef.current = true;
    setLoading(true);
    try {
      const payload = await requestAuth("/api/v1/admin/auth/verify-otp", {
        challengeId: challenge.challengeId,
        otp,
      });
      if (!payload?.token || !payload?.admin?.id) {
        throw new Error("The server returned an unexpected response. Please try again.");
      }
      setOtp("");
      onAuthenticated(payload.token, payload.admin);
    } catch (authError) {
      if (!(authError instanceof DOMException && authError.name === "AbortError")) {
        setError(authError instanceof Error ? authError.message : "Unable to verify the code. Please try again.");
      }
    } finally {
      pendingRef.current = false;
      setLoading(false);
    }
  }

  async function resendOtp() {
    if (pendingRef.current || !challenge) return;
    pendingRef.current = true;
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const payload = await requestAuth("/api/v1/admin/auth/otp/resend", {
        challengeId: challenge.challengeId,
      });
      if (!payload?.challengeId) throw new Error("Unable to resend the verification code.");
      setChallenge({
        challengeId: payload.challengeId,
        maskedEmail: payload.maskedEmail || challenge.maskedEmail,
        expiresInSeconds: Number(payload.expiresInSeconds || 600),
      });
      setOtp("");
      setInfo("A new verification code has been sent.");
      requestAnimationFrame(() => otpRef.current?.focus());
    } catch (authError) {
      if (!(authError instanceof DOMException && authError.name === "AbortError")) {
        setError(authError instanceof Error ? authError.message : "Unable to resend the code.");
      }
    } finally {
      pendingRef.current = false;
      setLoading(false);
    }
  }

  function useDifferentCredentials() {
    requestRef.current?.abort();
    pendingRef.current = false;
    setLoading(false);
    setChallenge(null);
    setOtp("");
    setPassword("");
    setError("");
    setInfo("");
    setStage("credentials");
  }

  const message = error || (stage === "credentials" ? sessionError : "");
  return (
    <AuthShell>
      <div className={styles.card}>
        <div className={styles.loginHeader}>
          <span className={styles.loginMark} aria-hidden="true">
            <PortalIcon name="shield" />
          </span>
          <div>
            <p className={styles.secure}>{stage === "otp" ? "Two-step verification" : "Secure Admin"}</p>
            <h1 ref={headingRef} tabIndex={-1}>
              {stage === "otp" ? "Check your email." : "Welcome back."}
            </h1>
          </div>
        </div>

        {stage === "credentials" ? (
          <>
            <p className={styles.cardCopy}>Sign in with your Ignited Brains administrator credentials.</p>
            <form onSubmit={signIn} noValidate aria-busy={loading} className={styles.loginForm}>
              <label htmlFor="admin-email">Email address</label>
              <div className={styles.inputWrap}>
                <PortalIcon name="email" />
                <input
                  ref={emailRef}
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  maxLength={320}
                  required
                  placeholder="you@ignitedbrains.in"
                  value={email}
                  disabled={loading}
                  onChange={(event) => { setEmail(event.target.value); setError(""); }}
                  aria-describedby={message ? "admin-auth-error" : undefined}
                />
              </div>
              <label htmlFor="admin-password">Password</label>
              <div className={styles.inputWrap}>
                <PortalIcon name="lock" />
                <input
                  ref={passwordRef}
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  maxLength={500}
                  required
                  placeholder="Enter your password"
                  value={password}
                  disabled={loading}
                  onChange={(event) => { setPassword(event.target.value); setError(""); }}
                  aria-describedby={message ? "admin-auth-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={loading}
                  className={styles.eye}
                >
                  <PortalIcon name={showPassword ? "eyeOff" : "eye"} />
                </button>
              </div>
              {message ? <p id="admin-auth-error" role="alert" className={styles.error}>{message}</p> : null}
              <button type="submit" className={styles.primary} disabled={loading}>
                {loading ? "Checking credentials…" : "Continue securely"}
                <PortalIcon name="arrow" />
              </button>
            </form>
          </>
        ) : (
          <>
            <p className={styles.cardCopy}>
              A six-digit one-time code was sent to <strong>{challenge?.maskedEmail}</strong>. The code expires in about {Math.max(1, Math.ceil((challenge?.expiresInSeconds || 600) / 60))} minutes.
            </p>
            <form onSubmit={verifyOtp} noValidate aria-busy={loading} className={styles.loginForm}>
              <label htmlFor="admin-otp">Verification code</label>
              <div className={cn(styles.inputWrap, styles.otpInput)}>
                <PortalIcon name="lock" />
                <input
                  ref={otpRef}
                  id="admin-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={otp}
                  disabled={loading}
                  onChange={(event) => { setOtp(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                  aria-describedby={message ? "admin-auth-error" : undefined}
                />
              </div>
              {info ? <p className={styles.info} role="status">{info}</p> : null}
              {message ? <p id="admin-auth-error" role="alert" className={styles.error}>{message}</p> : null}
              <button type="submit" className={styles.primary} disabled={loading || otp.length !== 6}>
                {loading ? "Verifying…" : "Verify & enter Admin"}
                <PortalIcon name="arrow" />
              </button>
            </form>
            <div className={styles.otpActions}>
              <button type="button" className={styles.secondary} disabled={loading} onClick={() => void resendOtp()}>
                Resend code
              </button>
              <button type="button" className={styles.textAction} disabled={loading} onClick={useDifferentCredentials}>
                Use different credentials
              </button>
            </div>
          </>
        )}

        <p className={styles.secureNote}>
          <PortalIcon name="lock" />
          Password + email OTP required for every administrator sign-in
        </p>
      </div>
    </AuthShell>
  );
}

export function AdminSignedOut({ onSignIn }: { onSignIn: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <AuthShell signedOut>
      <div className={cn(styles.card, styles.confirmation)}>
        <div className={styles.logoutOrbit} aria-hidden="true">
          <span>
            <PortalIcon name="logout" />
          </span>
          <i />
          <i />
          <i />
        </div>
        <h1 ref={headingRef} tabIndex={-1}>
          You’ve been signed out
        </h1>
        <p className={styles.cardCopy}>
          You are now safely signed out from the Ignited Brains administrator
          portal.
        </p>
        <button type="button" className={styles.primary} onClick={onSignIn}>
          <PortalIcon name="logout" />
          Sign in again
          <PortalIcon name="arrow" />
        </button>
        <Link href="/" className={styles.secondary}>
          <PortalIcon name="home" />
          Go to Homepage
          <PortalIcon name="arrow" />
        </Link>
        <p className={styles.seeYou}>See you again soon!</p>
      </div>
    </AuthShell>
  );
}

export function AdminSessionEnding({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <AuthShell>
      <div className={cn(styles.card, styles.confirmation)} role="status">
        <div className={styles.logoutOrbit} aria-hidden="true">
          <span>
            <PortalIcon name="lock" />
          </span>
        </div>
        <h1>{error ? "Finish signing out" : "Ending your session…"}</h1>
        <p className={styles.cardCopy}>
          {error || "We’re securely ending your administrator session."}
        </p>
        {error ? (
          <button type="button" className={styles.primary} onClick={onRetry}>
            Retry Sign Out
            <PortalIcon name="arrow" />
          </button>
        ) : (
          <span className={styles.spinner} aria-label="Signing out" />
        )}
      </div>
    </AuthShell>
  );
}
