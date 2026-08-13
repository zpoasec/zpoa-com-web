import type {ReactNode} from 'react';
import {REGIONS} from '@site/src/lib/region';
import {useRegion} from '@site/src/lib/useRegion';
import Flag from './Flag';

/**
 * Region display.
 *
 * Two variants:
 *
 *   navbar / mobile  a read-only indicator of the detected region. No control,
 *                    by design: the navbar states where the site thinks you
 *                    are, it does not ask you to configure anything.
 *
 *   inline           a real selector, used on the pricing page. Timezone
 *                    detection is a good guess, not a fact: someone in India on
 *                    a laptop still set to US time would otherwise be stuck
 *                    seeing USD with no way out. The pricing page is the one
 *                    place currency matters, so the correction lives there.
 */
export default function RegionPicker(props: {mobile?: boolean; inline?: boolean}): ReactNode {
  const {region, ready, setRegion} = useRegion();

  // Renders before detection resolves, showing the default. It occupies layout,
  // so returning null first would shift the page when it appeared. No hydration
  // risk: useRegion also starts at the default, matching the server markup.
  if (props.inline) {
    return (
      <label className="zpoa-region-inline">
        <span>Showing prices for</span>
        <select
          value={region.code}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Show prices for region">
          {REGIONS.map((r) => (
            <option key={r.code} value={r.code}>
              {r.label} · {r.currency}
            </option>
          ))}
        </select>
      </label>
    );
  }

  // The indicator is decorative, so it waits for a resolved region rather than
  // flashing the default and correcting itself a frame later.
  if (!ready) return null;

  if (props.mobile) {
    return (
      <li className="menu__list-item">
        <span className="menu__link zpoa-region__mobile-label">
          <Flag code={region.code} className="zpoa-region__flag" />
          {' '}Region: {region.label}
        </span>
      </li>
    );
  }

  return (
    <span
      className="navbar__item zpoa-region"
      title={`${region.label}: prices shown in ${region.currency}`}>
      <Flag code={region.code} className="zpoa-region__flag" />
      <span className="zpoa-region__code">{region.code}</span>
    </span>
  );
}
