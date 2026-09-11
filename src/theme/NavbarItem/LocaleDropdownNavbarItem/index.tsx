import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// eslint-disable-next-line no-restricted-imports
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import Flag from '@site/src/components/Flag';

/**
 * Swizzled to add a flag next to each locale, matching the RegionPicker's
 * flag treatment elsewhere in the navbar. Upstream's LocaleDropdownNavbarItem
 * renders each entry as plain label text — with only "United States" /
 * "India" as strings, there was nothing to visually anchor the choice, so a
 * skim of the dropdown read as two unlabelled rows rather than two countries.
 *
 * Locale -> flag code is a small explicit map rather than deriving from the
 * BCP 47 region subtag: the two don't always agree (a future "en-gb-second"
 * style locale would parse to a bogus code), and a wrong flag is worse than
 * none. An unmapped locale falls back to no flag, not a guess.
 */
const LOCALE_FLAG: Record<string, string> = {
  en: 'US',
  'en-in': 'IN',
};

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: {localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history: any) => history.location.search);
  const hash = useHistorySelector((history: any) => history.location.hash);
  const getLocaleConfig = (locale: string) => {
    const localeConfig = (localeConfigs as any)[locale];
    if (!localeConfig) {
      throw new Error(`Docusaurus bug, no locale config found for locale=${locale}`);
    }
    return localeConfig;
  };
  const getBaseURLForLocale = (locale: string) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;
    if (isSameDomain) {
      return `pathname://${alternatePageUtils.createUrl({locale, fullyQualified: false})}`;
    }
    return alternatePageUtils.createUrl({locale, fullyQualified: true});
  };
  return {
    getURL: (locale: string, options: {queryString?: string}) => {
      const finalSearch = mergeSearchStrings([search, options.queryString], 'append');
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale: string) => getLocaleConfig(locale).label as string,
    getLang: (locale: string) => getLocaleConfig(locale).htmlLang as string,
  };
}

function LocaleLabel({locale, text}: {locale: string; text: string}): ReactNode {
  const flagCode = LOCALE_FLAG[locale];
  return (
    <>
      {flagCode && <Flag code={flagCode} className="zpoa-locale__flag" />}
      {text}
    </>
  );
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}: {
  mobile?: boolean;
  dropdownItemsBefore: unknown[];
  dropdownItemsAfter: unknown[];
  queryString?: string;
  [key: string]: unknown;
}): ReactNode {
  const utils = useLocaleDropdownUtils();
  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();
  const localeItems = locales.map((locale) => {
    const label = utils.getLabel(locale);
    return {
      label: <LocaleLabel locale={locale} text={label} />,
      lang: utils.getLang(locale),
      to: utils.getURL(locale, {queryString}),
      target: '_self',
      autoAddBaseUrl: false,
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale ? (mobile ? 'menu__link--active' : 'dropdown__link--active') : '',
    };
  });
  const items = [...(dropdownItemsBefore as any[]), ...localeItems, ...(dropdownItemsAfter as any[])];
  // Mobile keeps the plain "Languages" trigger text (no single locale to flag);
  // desktop shows the current locale's own flag instead of a generic globe icon.
  const dropdownLabel = mobile ? (
    translate({
      message: 'Languages',
      id: 'theme.navbar.mobileLanguageDropdown.label',
      description: 'The label for the mobile language switcher dropdown',
    })
  ) : (
    <LocaleLabel locale={currentLocale} text={utils.getLabel(currentLocale)} />
  );
  return <DropdownNavbarItem {...(props as any)} mobile={mobile} label={dropdownLabel} items={items} />;
}
