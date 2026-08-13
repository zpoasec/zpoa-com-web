/**
 * Region and currency detection for a static site.
 *
 * There is no server here (the site is pre-rendered and served from a CDN),
 * so detection has to happen in the browser. This uses the IANA timezone the
 * browser already reports:
 *
 *     Intl.DateTimeFormat().resolvedOptions().timeZone   ->  'Asia/Kolkata'
 *
 * No network request, no third party, nothing about the visitor leaves the
 * page. That matters more than usual on a security vendor's site: an IP
 * geolocation call would hand every visitor's address to another company on
 * every page load, and would be the sort of thing a prospect notices.
 *
 * The trade-off is that a visitor whose machine is set to another timezone
 * gets the wrong region, so the choice is always overridable, and the
 * override is what persists.
 */

export type Region = {
  /** ISO 3166-1 alpha-2, also used as the storage key and the Flag lookup. */
  code: string;
  label: string;
  currency: string;
  symbol: string;
  /** BCP 47 locale, used for digit grouping (1,00,000 in en-IN vs 100,000). */
  locale: string;
  /** Multiplier against the USD list price. 1 for the USD region itself. */
  rate: number;
  /** Round converted prices up to a multiple of this, for a sane price point. */
  step: number;
};

/**
 * Conversion rates.
 *
 * These are STATIC and hand-maintained: the site has no backend to fetch live
 * FX, and a client-side rate feed would be another third-party request. They
 * exist so a visitor sees a figure in a currency they think in; the customer is
 * charged in USD at checkout, which the pricing page states plainly.
 *
 * Review these periodically. If real regional price lists are set later,
 * replace the `rate` mechanism with explicit per-tier prices rather than
 * leaving stale multipliers in place.
 */
export const RATES_REVIEWED = '2026-08';

export const REGIONS: Region[] = [
  {code: 'US', label: 'United States', currency: 'USD', symbol: '$',  locale: 'en-US', rate: 1,    step: 1},
  {code: 'IN', label: 'India',         currency: 'INR', symbol: '₹',  locale: 'en-IN', rate: 88,   step: 500},
  {code: 'GB', label: 'United Kingdom',currency: 'GBP', symbol: '£',  locale: 'en-GB', rate: 0.79, step: 10},
  // en-IE, not de-DE: the site is English-only, and German grouping renders
  // €1.840, which an English reader parses as 1.84.
  {code: 'EU', label: 'Europe',        currency: 'EUR', symbol: '€',  locale: 'en-IE', rate: 0.92, step: 10},
  {code: 'CA', label: 'Canada',        currency: 'CAD', symbol: 'CA$',locale: 'en-CA', rate: 1.36, step: 10},
  {code: 'AU', label: 'Australia',     currency: 'AUD', symbol: 'A$', locale: 'en-AU', rate: 1.52, step: 10},
  {code: 'SG', label: 'Singapore',     currency: 'SGD', symbol: 'S$', locale: 'en-SG', rate: 1.34, step: 10},
  {code: 'AE', label: 'UAE',           currency: 'AED', symbol: 'AED',locale: 'en-AE', rate: 3.67, step: 10},
];

export const DEFAULT_REGION = REGIONS[0]; // USD, also what SSR renders.

const STORAGE_KEY = 'zpoa.region';

/** Timezones that map to a region other than the US default. */
const TZ_MAP: Record<string, string> = {
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Europe/London': 'GB',
  'Europe/Belfast': 'GB',
  'Asia/Singapore': 'SG',
  'Asia/Dubai': 'AE',
};

/** Timezone prefixes, checked after the exact map above. */
const TZ_PREFIX: Array<[string, string]> = [
  ['Australia/', 'AU'],
  ['America/Toronto', 'CA'],
  ['America/Vancouver', 'CA'],
  ['America/Edmonton', 'CA'],
  ['America/Winnipeg', 'CA'],
  ['America/Halifax', 'CA'],
  ['America/St_Johns', 'CA'],
  ['Europe/', 'EU'],   // any other European zone falls to the euro
  ['America/', 'US'],
  ['Pacific/Honolulu', 'US'],
];

export function byCode(code: string | null | undefined): Region | undefined {
  return REGIONS.find((r) => r.code === code);
}

/** Region inferred purely from the browser timezone. */
export function detectRegion(): Region {
  if (typeof Intl === 'undefined') return DEFAULT_REGION;
  let tz = '';
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  } catch {
    return DEFAULT_REGION;
  }
  if (!tz) return DEFAULT_REGION;

  const exact = TZ_MAP[tz];
  if (exact) return byCode(exact) ?? DEFAULT_REGION;

  for (const [prefix, code] of TZ_PREFIX) {
    if (tz.startsWith(prefix)) return byCode(code) ?? DEFAULT_REGION;
  }
  return DEFAULT_REGION;
}

/** Stored override, if the visitor picked a region themselves. */
export function storedRegion(): Region | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return byCode(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return undefined; // private mode, storage disabled
  }
}

export function storeRegion(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
    window.dispatchEvent(new CustomEvent('zpoa:region', {detail: code}));
  } catch {
    /* non-fatal */
  }
}

/** An explicit choice always beats detection. */
export function resolveRegion(): Region {
  return storedRegion() ?? detectRegion();
}

/**
 * Convert a USD list price and format it for the region.
 * Rounds UP to the region's step so prices land on a sane figure rather than
 * an exchange-rate artefact (₹43,912 -> ₹44,000).
 */
export function price(usd: number, r: Region): string {
  if (usd === 0) return `${r.symbol}0`;
  const converted = usd * r.rate;
  const rounded = r.step > 1 ? Math.round(converted / r.step) * r.step : converted;
  return `${r.symbol}${rounded.toLocaleString(r.locale, {maximumFractionDigits: 0})}`;
}

/** Same, but keeps small values readable (overage of $5/GB, $2/identity). */
export function unitPrice(usd: number, r: Region): string {
  const converted = usd * r.rate;
  // Under ~10 in the target currency, keep a decimal so it does not round to 0.
  const digits = converted < 10 && !Number.isInteger(converted) ? 2 : 0;
  const rounded = converted >= 100 ? Math.round(converted / 10) * 10 : converted;
  return `${r.symbol}${rounded.toLocaleString(r.locale, {maximumFractionDigits: digits})}`;
}
