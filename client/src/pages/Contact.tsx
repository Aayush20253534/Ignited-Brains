import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  GraduationCap,
  Handshake,
  Send,
} from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { submitContact, submitApplication } from '../lib/api';
import type { ContactPayload, ApplicationPayload } from '../lib/api';
import { Reveal } from '../lib/motion';

const applicantTypes: Array<{
  value: ApplicationPayload['applicantType'];
  label: string;
  Icon: typeof User;
  desc: string;
}> = [
  { value: 'school', label: 'School / Institute', Icon: Building2, desc: 'Set up a lab in my school' },
  { value: 'student', label: 'Student', Icon: User, desc: 'Join a program or workshop' },
  { value: 'educator', label: 'Educator', Icon: GraduationCap, desc: 'Train or collaborate with us' },
  { value: 'partner', label: 'Partner / Investor', Icon: Handshake, desc: 'Partner or support our mission' },
];

type Tab = 'contact' | 'partner';

export default function Contact() {
  const [tab, setTab] = useState<Tab>('contact');

  // Contact form
  const [contact, setContact] = useState<ContactPayload>({
    name: '', email: '', phone: '', organization: '', message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  // Application form
  const [app, setApp] = useState<ApplicationPayload>({
    applicantType: 'school',
    name: '', email: '', phone: '', organization: '', message: '',
  });
  const [appStatus, setAppStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [appError, setAppError] = useState('');

  async function onContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactStatus('loading');
    setContactError('');
    try {
      await submitContact(contact);
      setContactStatus('success');
      setContact({ name: '', email: '', phone: '', organization: '', message: '' });
    } catch (err) {
      setContactStatus('error');
      setContactError(err instanceof Error ? err.message : 'Submission failed, please try again.');
    }
  }

  async function onAppSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAppStatus('loading');
    setAppError('');
    try {
      await submitApplication(app);
      setAppStatus('success');
      setApp({ applicantType: 'school', name: '', email: '', phone: '', organization: '', message: '' });
    } catch (err) {
      setAppStatus('error');
      setAppError(err instanceof Error ? err.message : 'Submission failed, please try again.');
    }
  }

  return (
    <div className="overflow-hidden">
      {/* HEADER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-orange-50" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container-page relative py-20 text-center sm:py-24">
          <Reveal>
            <p className="eyebrow">Contact Us</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Let's start a
              <br />
              <span className="text-brand-orange italic">conversation.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Whether you're a school leader, educator, student or partner — we'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative -mt-4 pb-10">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Phone, label: 'Call Us', value: '+91 9454488061', sub: 'Mon to Sat · 9am – 6pm', href: 'tel:+919454488061' },
            { Icon: Mail, label: 'Email', value: 'info@ignitedbrains.com', sub: 'We respond within 24 hours', href: 'mailto:info@ignitedbrains.com' },
            { Icon: MapPin, label: 'Office', value: 'Prayagraj, Uttar Pradesh', sub: 'India' },
            { Icon: Clock, label: 'Working Hours', value: 'Mon – Sat', sub: '09:00 – 18:00 IST' },
          ].map((c, i) => (
            <Reveal key={c.label} delay={0.05 * i}>
              <a
                href={c.href}
                className="card flex h-full items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{c.label}</p>
                  <p className="mt-1 font-display text-base font-bold text-slate-900 break-words">{c.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TABS + FORMS */}
      <section className="relative py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          {/* LEFT: MAP / ILLUSTRATION */}
          <Reveal>
            <div className="sticky top-24 space-y-6">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-xl">
                <div className="relative aspect-[4/5]">
                  <img
                    src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20isometric%20illustration%20of%20modern%20STEM%20school%20building%20with%20solar%20panels%20students%20robotics%20rocket%20on%20roof%20and%20trees%20around%2C%20soft%20pastel%20colors&image_size=portrait_4_3"
                    alt="Our campus"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    We're online
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 bg-white">
                  {[
                    { k: 'Cities', v: '20+' },
                    { k: 'Schools', v: '50+' },
                    { k: 'Students', v: '10K+' },
                  ].map((s) => (
                    <div key={s.k} className="px-4 py-4 text-center">
                      <p className="font-display text-xl font-black text-slate-900">{s.v}</p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: TABS + FORMS */}
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                {(
                  [
                    { k: 'contact', label: 'Quick Enquiry' },
                    { k: 'partner', label: 'Partner / Apply' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.k}
                    onClick={() => setTab(t.k)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      tab === t.k
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : 'text-slate-700 hover:text-brand-orange'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === 'contact' ? (
                <motion.form
                  key="contact"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={onContactSubmit}
                  className="mt-8 grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input
                        required
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email Address" required>
                      <input
                        required
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Organization / School">
                      <input
                        type="text"
                        value={contact.organization}
                        onChange={(e) => setContact({ ...contact, organization: e.target.value })}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="Your Message" required>
                    <textarea
                      required
                      rows={5}
                      value={contact.message}
                      onChange={(e) => setContact({ ...contact, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {contactStatus === 'error' && contactError && (
                    <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {contactError}
                    </div>
                  )}
                  {contactStatus === 'success' && (
                    <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      Your enquiry has been submitted successfully. Our team will reach out soon!
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactStatus === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
                  >
                    {contactStatus === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="partner"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={onAppSubmit}
                  className="mt-8 grid gap-5"
                >
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                      I am a...
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {applicantTypes.map((t) => {
                        const selected = app.applicantType === t.value;
                        return (
                          <button
                            type="button"
                            key={t.value}
                            onClick={() => setApp({ ...app, applicantType: t.value })}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? 'border-brand-orange bg-brand-orange/5 shadow-md shadow-brand-orange/10 ring-1 ring-brand-orange/20'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'}`}>
                              <t.Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className={`text-sm font-bold ${selected ? 'text-brand-orange' : 'text-slate-900'}`}>
                                {t.label}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">{t.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input
                        required
                        type="text"
                        value={app.name}
                        onChange={(e) => setApp({ ...app, name: e.target.value })}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        value={app.email}
                        onChange={(e) => setApp({ ...app, email: e.target.value })}
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone" required>
                      <input
                        required
                        type="tel"
                        value={app.phone}
                        onChange={(e) => setApp({ ...app, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Organization / School">
                      <input
                        type="text"
                        value={app.organization}
                        onChange={(e) => setApp({ ...app, organization: e.target.value })}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Tell us more">
                    <textarea
                      rows={4}
                      value={app.message}
                      onChange={(e) => setApp({ ...app, message: e.target.value })}
                      placeholder="Share your goals, timeline or any additional details..."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {appStatus === 'error' && appError && (
                    <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {appError}
                    </div>
                  )}
                  {appStatus === 'success' && (
                    <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      Your application has been submitted successfully. We'll be in touch shortly!
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={appStatus === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
                  >
                    {appStatus === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Submit Application <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Prefer to speak directly?"
        description="Call us on +91 9454488061 or drop an email — we usually respond within a few hours during business days."
        cta="Call Now"
        href="tel:+919454488061"
      />
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-orange focus:outline-none focus:ring-4 focus:ring-brand-orange/10';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
        {required && <span className="ml-0.5 text-brand-orange">*</span>}
      </span>
      {children}
    </label>
  );
}
