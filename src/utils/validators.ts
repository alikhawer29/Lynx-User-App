import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const SIGNUP_SCHEMA = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name cannot exceed 50 characters')
    .matches(
      /^[a-zA-Z\s'-]+$/,
      'First Name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .trim(),
  last_name: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name cannot exceed 50 characters')
    .matches(
      /^[a-zA-Z\s'-]+$/,
      'Last Name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .trim(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  // dialing_code: Yup.string()
  //   .required('Country Code is required')
  //   .matches(/^\+\d{1,4}$/, 'Invalid dialing code format'),
  dialing_code: Yup.string(),
  country_code: Yup.string()
    .required('Country Code is required')
    .matches(/^[A-Z]{2}$/, 'Invalid country code format'),
  phone: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d{7,15}$/, 'Phone Number must be between 7 and 15 digits')
    .test('phone-format', 'Invalid phone number format', function (value) {
      if (!value) return false;
      // Remove any non-digit characters for validation
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }),
  language: Yup.string()
    .required('Language is required')
    .oneOf(['english', 'french'], 'Please select a valid language'),
});

export const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  via: Yup.string().oneOf(['email', 'phone']).required('Method is required'),
  email: Yup.string().when('via', {
    is: 'email',
    then: schema => schema.required('Email is required').email('Invalid email'),
    otherwise: schema => schema.notRequired(),
  }),
  phone: Yup.string().when('via', {
    is: 'phone',
    then: schema => schema.required('Phone is required'),
    otherwise: schema => schema.notRequired(),
  }),
  calling_code: Yup.string().when('via', {
    is: 'phone',
    then: schema => schema.required('Calling code is required'),
    otherwise: schema => schema.notRequired(),
  }),
});

export const VERIFY_CODE_SCHEMA = Yup.object().shape({
  otp: Yup.string()
    .required('Verification Code is required')
    .length(4, 'Verification Code must be 4 digit'),
});

export const SET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const CHANGE_PASSWORD_SCHEMA = Yup.object().shape({
  current_password: Yup.string().required('Old Password is required'),
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const EDIT_PROFILE_SCHEMA = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name cannot exceed 50 characters')
    .matches(
      /^[a-zA-Z\s'-]+$/,
      'First Name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .trim(),
  last_name: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name cannot exceed 50 characters')
    .matches(
      /^[a-zA-Z\s'-]+$/,
      'Last Name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .trim(),
  dialing_code: Yup.string()
    .required('Country Code is required')
    .matches(/^\+\d{1,4}$/, 'Invalid dialing code format'),
  country_code: Yup.string()
    .required('Country Code is required')
    .matches(/^[A-Z]{2}$/, 'Invalid country code format'),
  phone: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d{7,15}$/, 'Phone Number must be between 7 and 15 digits')
    .test('phone-format', 'Invalid phone number format', function (value) {
      if (!value) return false;
      // Remove any non-digit characters for validation
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }),
  language: Yup.string()
    .required('Language is required')
    .oneOf(['english', 'french'], 'Please select a valid language'),
});

export const CONTACT_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});
