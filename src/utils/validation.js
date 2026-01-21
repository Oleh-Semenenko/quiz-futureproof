export const isValidEmail = (email) => {
  const cleanEmail = email.trim();
  
  // Regular expression:
  // ^[^@\s]+       -> Starts with non-space and non-@ characters
  // @              -> Stands for @ symbol
  // [^@\s]+\.      -> After @ there are characters and a dot
  // [^@\s]{2,}$    -> Ends with at least two characters after the domain
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
  
  return emailRegex.test(cleanEmail);
};