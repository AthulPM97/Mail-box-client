export const validate = (credentials) => {
  if (!credentials.email.includes("@")) {
    alert("Enter valid email");
    return false;
  } else if (credentials.password.length < 6) {
    alert("Weak password");
    return false;
  } else if (credentials.password !== credentials.confirmPassword) {
    alert("Passwords do not match!");
    return false;
  } else {
    return true;
  }
};
