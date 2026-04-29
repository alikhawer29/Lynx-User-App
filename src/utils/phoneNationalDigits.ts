import type { CountryCode } from 'libphonenumber-js';
import { Metadata } from 'libphonenumber-js';

/**
 * Returns the maximum national significant number length for a country from
 * libphonenumber metadata. This is the digit count EXCLUDING the country
 * calling code and any trunk prefix (e.g. leading 0).
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
 * Strips non-digit characters from `raw` and caps the result at the
 * country's maximum national significant number length.
 *
 * Validation of whether the number is actually valid for the country is
 * intentionally deferred to the Yup schema (submit-time), NOT done here.
 * Doing validity checks inside an onChangeText handler causes the input to
 * truncate partial numbers whenever an intermediate digit sequence happens
 * to match a shorter valid format (e.g. a 7-digit landline while the user
 * is typing a 10-digit mobile number), making the full number unreachable.
 */
export function clampNationalPhoneDigits(raw: string, countryCode: string): string {
  const cc = (countryCode || 'AE').toUpperCase() as CountryCode;
  const digits = raw.replace(/\D/g, '');
  const hardCap = getMaxNationalDigitsForCountry(cc);
  return digits.slice(0, hardCap);
}
