export const validateUserInput = (value) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
    return alphanumericRegex.test(value) || emailRegex.test(value);
  };