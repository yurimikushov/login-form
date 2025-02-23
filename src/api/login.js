const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return {
      id: "email.empty",
      message: "Email is required",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      id: "email.invalid",
      message: "Invalid email format",
    };
  }

  return null;
};

const validatePassword = (password) => {
  if (!password) {
    return {
      id: "password.empty",
      message: "Password is required",
    };
  }

  if (password.length < 8) {
    return {
      id: "password.short",
      message: "Password must be at least 8 characters long",
    };
  }
  return null;
};

const latency = () => {
  const start = 50;
  const end = 150;

  return Math.floor(Math.random() * (end - start + 1) + start);
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      if (emailError || passwordError) {
        resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              status: "error",
              errors: [emailError, passwordError].filter(Boolean),
            }),
        });
        return;
      }

      // back-end error simulation
      if (Math.random() > 0.7) {
        resolve({
          ok: false,
          status: 500,
          json: () => undefined,
        });
        return;
      }

      // network error simulation
      if (Math.random() > 0.8) {
        reject(new Error("Network error"));
        return;
      }

      resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            status: "success",
            errors: [],
          }),
      });
    }, latency());
  });
};
