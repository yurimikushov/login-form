import { useState } from "preact/hooks";

import "./login-form.css";

export const LoginForm = ({ pending, errors, onSubmit }) => {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  return (
    <div className="login-form">
      <h2 className="login-form__welcome">Welcome to Sign In</h2>
      <form className="login-form__form" novalidate onSubmit={onSubmit}>
        <div className="login-form__input-group">
          <label for="login-form-email">Email</label>
          <input
            className="login-form__email-input"
            id="login-form-email"
            type="email"
            disabled={pending}
            autocorrect="off"
            autocapitalize="off"
            aria-invalid={errors.email.length > 0 ? "true" : "false"}
          />
          {errors.email.length > 0 && (
            <p className="login-form__error" aria-live="polite">
              {errors.email.join(", ")}
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
              disabled={pending}
              autocorrect="off"
              autocapitalize="off"
              aria-invalid={errors.password.length > 0 ? "true" : "false"}
            />
            <button
              className="login-form__show-password"
              type="button"
              onClick={() => setShouldShowPassword(!shouldShowPassword)}
            >
              {shouldShowPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password.length > 0 && (
            <p className="login-form__error" aria-live="polite">
              {errors.password.join(", ")}
            </p>
          )}
        </div>

        {errors.other.length > 0 && (
          <p className="login-form__error" aria-live="polite">
            {errors.other.join(", ")}
          </p>
        )}

        <div className="login-form__action-group">
          <button
            className="login-form__submit"
            type="submit"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
          <a href="#" className="login-form__forgot-password">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};
