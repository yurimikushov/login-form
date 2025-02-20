import { useState } from "preact/hooks";

import { login } from "../../api/login";

import "./login-form.css";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setServerErrors(null);

    try {
      const response = await login(
        e.target.email.value,
        e.target.password.value
      );

      if (response.success) {
        alert("Logged in successfully");
      } else {
        setServerErrors(await response.json().errors);
      }
    } catch (error) {
      setServerErrors([new Error("Something went wrong")]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__welcome">Welcome to Sign In</h2>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <div className="login-form__input-group">
          <label for="login-form-email">Email</label>
          <input
            className="login-form__email-input"
            id="login-form-email"
            type="email"
            required
            disabled={loading}
            autocorrect="off"
            autocapitalize="off"
          />
          {/* {errors.email && <p role="alert">{errors.email.message}</p>} */}
        </div>

        <div className="login-form__input-group">
          <label for="login-form-password">Password</label>
          <div className="login-form__password-input-group">
            <input
              className="login-form__password-input"
              id="login-form-password"
              type={shouldShowPassword ? "text" : "password"}
              required
              disabled={loading}
              autocorrect="off"
              autocapitalize="off"
            />
            <button
              className="login-form__show-password"
              type="button"
              onClick={() => setShouldShowPassword(!shouldShowPassword)}
            >
              {shouldShowPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* {errors.password && <p role="alert">{errors.password.message}</p>} */}
        </div>

        {serverErrors && (
          <p role="alert" style={{ color: "red" }}>
            {serverErrors.map((error) => error.message).join(", ")}
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
