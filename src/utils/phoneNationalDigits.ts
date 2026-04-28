import type { CountryCode } from 'libphonenumber-js';
import {
  getCountryCallingCode,
  Metadata,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js';

/**
 * Max national number length for a region from libphonenumber metadata (one lookup, no per-country loops).
 */
export function getMaxNationalDigitsForCountry(countryCode: string): number {
  const cc = (countryCode || 'AE').toUpperCase() as CountryCode;
  try {
    const m = new Metadata();
    m.selectNumberingPlan(cc);
    const lengths = m.possibleLengths();
    if (!lengths?.length) return 15;
    return Math.max(...lengths);
  } catch {
    return 15;
  }
}

/**
 * Strips non-digits, caps to metadata max length, then prevents entering an extra digit that
 * invalidates a previously valid national number (e.g. PK mobile 10 digits vs an 11th digit).
 *
 * Note: validatePhoneNumberLength() alone is too permissive when metadata lists multiple lengths
 * (e.g. PK [8–12]); parsing full E.164 with parsePhoneNumberFromString handles that correctly.
 */
export function clampNationalPhoneDigits(raw: string, countryCode: string): string {
  const cc = (countryCode || 'AE').toUpperCase() as CountryCode;
  const callingCode = getCountryCallingCode(cc);
  let digits = raw.replace(/\D/g, '');
  const hardCap = getMaxNationalDigitsForCountry(countryCode);
  digits = digits.slice(0, hardCap);

  while (digits.length > 0) {
    const parsed = parsePhoneNumberFromString(`+${callingCode}${digits}`);
    if (parsed?.isValid()) {
      return digits;
    }
    if (digits.length <= 1) {
      return digits;
    }
    const lenStatus = validatePhoneNumberLength(digits, cc);
    if (lenStatus === 'TOO_LONG') {
      digits = digits.slice(0, -1);
      continue;
    }
    const shorter = digits.slice(0, -1);
    const parsedShorter = parsePhoneNumberFromString(`+${callingCode}${shorter}`);
    if (parsedShorter?.isValid()) {
      digits = shorter;
      continue;
    }
    break;
  }
  return digits;
}
