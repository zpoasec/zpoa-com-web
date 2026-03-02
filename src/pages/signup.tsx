import {useState, type ReactNode, type FormEvent} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const plans = [
  {tier: 'free', name: 'Free', price: '$0/mo', trial: ''},
  {tier: 'pro', name: 'Pro', price: '$499/mo', trial: '14-day free trial'},
  {tier: 'business', name: 'Business', price: '$1,999/mo', trial: '14-day free trial'},
];

export default function Signup(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || '';

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const preselectedPlan = params.get('plan') || 'free';

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    planTier: preselectedPlan,
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(form.password);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({...prev, [target.name]: value}));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.agreeTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Password is too weak. Use uppercase, lowercase, digit, and special character.');
      return;
    }

    if (!apiUrl) {
      setError('Signup is not available in this environment. Please contact sales@zpoa.com.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${apiUrl}/api/v1/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.firstName,
          last_name: form.lastName,
          company_name: form.companyName,
          plan_tier: form.planTier,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error || data.message || 'Signup failed. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Layout title="Welcome to Z Shield" description="Account created successfully">
        <div className="signup-section">
          <div className="container" style={{maxWidth: 500, textAlign: 'center', padding: '4rem 1rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>&#10003;</div>
            <h1>Welcome to Z Shield!</h1>
            <p>Your account has been created successfully.</p>
            <p style={{opacity: 0.7}}>
              {form.planTier !== 'free'
                ? `Your ${plans.find((p) => p.tier === form.planTier)?.trial || '14-day'} trial has started.`
                : 'You are on the Free plan. Upgrade anytime from your dashboard.'}
            </p>
            <Link className="pricing-btn primary" to="https://app.zpoashield.com" style={{marginTop: '2rem', display: 'inline-block'}}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Sign Up" description="Create your Z Shield account">
      <div className="signup-section">
        <div className="container" style={{maxWidth: 520, padding: '3rem 1rem'}}>
          <h1 style={{textAlign: 'center'}}>Create Your Account</h1>
          <p style={{textAlign: 'center', opacity: 0.7, marginBottom: '2rem'}}>
            Start securing your organization in minutes.
          </p>

          {error && (
            <div style={{
              background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)',
              borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', color: '#ff3b30',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Work Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" />
            </div>

            <div className="form-group">
              <label>Company Name *</label>
              <input type="text" name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Acme Inc" />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} />
              {form.password && (
                <div style={{marginTop: 4}}>
                  <div style={{
                    height: 4, borderRadius: 2, background: '#333',
                    overflow: 'hidden', marginBottom: 4,
                  }}>
                    <div style={{
                      width: `${(passwordStrength.score / 4) * 100}%`,
                      height: '100%',
                      background: passwordStrength.color,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  <span style={{fontSize: '0.75rem', color: passwordStrength.color}}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Plan</label>
              <select name="planTier" value={form.planTier} onChange={handleChange}>
                {plans.map((p) => (
                  <option key={p.tier} value={p.tier}>
                    {p.name} — {p.price} {p.trial && `(${p.trial})`}
                  </option>
                ))}
              </select>
              <span style={{fontSize: '0.75rem', opacity: 0.6, marginTop: 4, display: 'block'}}>
                Enterprise & MSSP plans require custom setup — <a href="mailto:info@zpoa.com">contact sales</a>.
              </span>
            </div>

            <div className="form-group" style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} id="terms" style={{width: 'auto'}} />
              <label htmlFor="terms" style={{marginBottom: 0, fontSize: '0.85rem'}}>
                I agree to the <a href="/docs/legal/terms" target="_blank">Terms of Service</a> and{' '}
                <a href="/docs/legal/privacy" target="_blank">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="pricing-btn primary" disabled={loading} style={{width: '100%', marginTop: '1rem'}}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7}}>
            Already have an account?{' '}
            <a href="https://app.zpoashield.com">Log in</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

function getPasswordStrength(pw: string): {score: number; label: string; color: string} {
  if (!pw) return {score: 0, label: '', color: '#666'};
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    {label: 'Very Weak', color: '#ff3b30'},
    {label: 'Weak', color: '#ff9500'},
    {label: 'Fair', color: '#ffcc00'},
    {label: 'Good', color: '#34c759'},
    {label: 'Strong', color: '#00c7be'},
  ];
  return {score, ...levels[score]};
}
