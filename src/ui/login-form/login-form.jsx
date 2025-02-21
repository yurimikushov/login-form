import { useState } from "preact/hooks";

import { login } from "../../api/login";

import "./login-form.css";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const emailErrors = errors.filter((error) => {
    return error.id.startsWith("email.");
  });
  const passwordErrors = errors.filter((error) => {
    return error.id.startsWith("password.");
  });
  const otherErrors = errors.filter((error) => {
    return !error.id.startsWith("email.") && !error.id.startsWith("password.");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors([]);

    try {
      const response = await login(
        e.target["login-form-email"].value,
        e.target["login-form-password"].value
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("Logged in successfully");
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors([{ id: "internal", message: "An unknown error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__welcome">Welcome to Sign In</h2>
      <form className="login-form__form" novalidate onSubmit={handleSubmit}>
        <div className="login-form__input-group">
          <label for="login-form-email">Email</label>
          <input
            className="login-form__email-input"
            id="login-form-email"
            type="email"
            disabled={loading}
            autocorrect="off"
            autocapitalize="off"
            aria-invalid={emailErrors.length > 0 ? "true" : "false"}
          />
          {emailErrors.length > 0 && (
            <p className="login-form__error" aria-live="polite">
              {emailErrors.map(({ message }) => message).join(", ")}
            </p>
          )}
        </div>

        <div className="login-form__input-group">
          <label for="login-form-password">Password</label>
          <div className="login-form__password-input-group">
            <input
              className="login-form__password-input"
              id="login-form-password"
              type={shouldShowPassword ? "text" : "password"}
              disabled={loading}
              autocorrect="off"
              autocapitalize="off"
              aria-invalid={passwordErrors.length > 0 ? "true" : "false"}
            />
            <button
              className="login-form__show-password"
              type="button"
              onClick={() => setShouldShowPassword(!shouldShowPassword)}
            >
              {shouldShowPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordErrors.length > 0 && (
            <p className="login-form__error" aria-live="polite">
              {passwordErrors.map(({ message }) => message).join(", ")}
            </p>
          )}
        </div>

        {otherErrors.length > 0 && (
          <p className="login-form__error" aria-live="polite">
            {otherErrors.map(({ message }) => message).join(", ")}
          </p>
        )}

        <div className="login-form__action-group">
          <button
            className="login-form__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <a href="#" className="login-form__forgot-password">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};
