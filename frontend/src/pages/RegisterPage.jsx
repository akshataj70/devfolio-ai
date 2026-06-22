import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineEnvelope, HiOutlineLockClosed, HiSparkles } from 'react-icons/hi2';
import { useAuthStore } from '../stores/useAuthStore';

/* ─── Simple validators ─── */
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const validatePassword = (pw) => pw.length >= 6;

/* ─── Floating input field ─── */
function Field({ id, label, type = 'text', value, onChange, error, icon: Icon, rightElement }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={id}
          className={[
            'w-full rounded-xl border px-4 py-3 text-sm bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500',
            'transition-all duration-200 focus:outline-none focus:ring-2',
            Icon ? 'pl-10' : '',
            rightElement ? 'pr-12' : '',
            error
              ? 'border-red-400 focus:ring-red-400/30 dark:border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:ring-brand-500/30 focus:border-brand-500',
          ].join(' ')}
          placeholder={id === 'email' ? 'example@gmail.com' : '••••••••'}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">{error}</p>
      )}
    </div>
  );
}

/* ─── Main RegisterPage ─── */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoggedIn, error: authError, clearError } = useAuthStore();

  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPw]   = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  
  const [emailErr, setEmailErr]           = useState('');
  const [pwErr, setPwErr]                 = useState('');
  const [confirmPwErr, setConfirmPwErr]   = useState('');
  const [loading, setLoading]             = useState(false);
  const [globalErr, setGlobalErr]         = useState('');

  // If already logged in, send straight to dashboard
  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalErr('');
    setEmailErr('');
    setPwErr('');
    setConfirmPwErr('');

    // Validate
    let valid = true;
    if (!validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
      valid = false;
    }
    if (!validatePassword(password)) {
      setPwErr('Password must be at least 6 characters');
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPwErr('Passwords do not match');
      valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
      await register(email, password);
      // redirect will happen automatically in the useEffect because isLoggedIn updates to true
    } catch (err) {
      setGlobalErr(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Left panel (decorative, hidden on mobile) ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-brand-600 via-violet-600 to-purple-700 p-12 relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-violet-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
            <span className="text-white font-bold text-base">D</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Devfolio <span className="opacity-80">AI</span>
          </span>
        </Link>

        {/* Center copy */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
            <HiSparkles size={16} />
            <span>AI-Powered Career Tools</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Start building for<br />free today.
          </h2>
          <p className="text-white/70 leading-relaxed max-w-sm">
            Create professional, ATS-optimized resumes and portfolio sites in just a few clicks.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mt-4">
            {[
              'ATS-friendly resume templates',
              'Beautiful portfolio websites',
              'One-click PDF download',
              'AI-generated summaries',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} Devfolio AI. All rights reserved.
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Devfolio AI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Create an account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Get started with your free Devfolio AI account.
            </p>
          </div>

          {/* Global error */}
          {(globalErr || authError) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
            >
              {globalErr || authError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailErr(''); setGlobalErr(''); }}
              error={emailErr}
              icon={HiOutlineEnvelope}
            />

            <Field
              id="password"
              label="Password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwErr(''); setGlobalErr(''); }}
              error={pwErr}
              icon={HiOutlineLockClosed}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                </button>
              }
            />

            <Field
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPw ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => { setConfirmPw(e.target.value); setConfirmPwErr(''); setGlobalErr(''); }}
              error={confirmPwErr}
              icon={HiOutlineLockClosed}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showConfirmPw ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPw ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                </button>
              }
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className={[
                'w-full py-3 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-200 mt-2',
                'bg-gradient-to-r from-brand-500 to-violet-500',
                'hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:scale-[1.01]',
                'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none',
              ].join(' ')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                'Register'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-semibold hover:underline">
              Sign In here
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
            By continuing, you agree to our{' '}
            <span className="text-brand-500 hover:underline cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-brand-500 hover:underline cursor-pointer">Privacy Policy</span>.
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
