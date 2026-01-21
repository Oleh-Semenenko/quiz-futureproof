export const isValidEmail = (email) => {
  const cleanEmail = email.trim();

  // Email validation rules:
  // - Must contain exactly one @ symbol
  // - Local part (before @) must not start or end with a dot
  // - Domain part (after @) must not start or end with a dot
  // - Domain must contain at least one dot
  // - TLD (after last dot) must be at least 2 characters long
  // - No whitespace characters allowed
  // - Only ASCII characters allowed (letters, digits, and common symbols)
  const emailRegex = /^(?!\.)(?!.*\.@)[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?!\.)(?!.*\.$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(cleanEmail);
};