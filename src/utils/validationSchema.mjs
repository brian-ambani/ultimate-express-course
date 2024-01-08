export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "Display name cannot be empty",
    },
  },
};

export const filterUserValidationSchema = {
  filter: {
    isString: {
      errorMessage: "filter must be a string",
    },
    notEmpty: {
      errorMessage: "filter cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "filter must be 3-10 characters",
    },
  },
};
