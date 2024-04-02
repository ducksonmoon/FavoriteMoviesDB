export const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "This user has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Wrong password. Please try again.";
    case "auth/invalid-credential":
      return "The credential data provided is invalid.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/operation-not-allowed":
      return "Operation not allowed. Please contact support.";
    case "auth/weak-password":
      return "The password is too weak.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
