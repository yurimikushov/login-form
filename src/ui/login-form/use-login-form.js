import { useState } from "preact/hooks";

export const useLoginForm = (login) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({ email: [], password: [], other: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPending(true);
    setErrors({ email: [], password: [], other: [] });

    try {
      const data = await login(
        e.target["login-form-email"].value,
        e.target["login-form-password"].value
      );

      if (data.status === "success") {
        setLoggedIn(true);
      } else {
        setErrors({
          email: data.errors
            .filter((error) => error.id.startsWith("email."))
            .map(({ message }) => message),
          password: data.errors
            .filter((error) => error.id.startsWith("password."))
            .map(({ message }) => message),
          other: data.errors
            .filter(
              (error) =>
                !error.id.startsWith("email.") &&
                !error.id.startsWith("password.")
            )
            .map(({ message }) => message),
        });
      }
    } catch (error) {
      setErrors({
        email: [],
        password: [],
        other: ["Something went wrong, please try again"],
      });
    } finally {
      setPending(false);
    }
  };

  return {
    loggedIn,
    pending,
    errors,
    handleSubmit,
  };
};
