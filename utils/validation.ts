// Email validation
export const isValidEmail = (email: string): boolean => {
  if (!email) return true; // Empty is valid (not required)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Empty is valid (not required)
  try {
    // Allow URLs without protocol (add https:// for validation)
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
};

// Phone validation (basic - allows various formats)
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Empty is valid (not required)
  // Allow digits, spaces, dashes, parentheses, and + sign
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

// Validation error messages
export const getEmailError = (email: string): string | undefined => {
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const getUrlError = (url: string): string | undefined => {
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL';
  }
  return undefined;
};

export const getPhoneError = (phone: string): string | undefined => {
  if (!isValidPhone(phone)) {
    return 'Please enter a valid phone number';
  }
  return undefined;
};
