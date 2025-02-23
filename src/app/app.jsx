import { login } from "../api/login";
import { LoginForm, useLoginForm } from "../ui/login-form";

import "./reset.css";
import "./app.css";

export const App = () => {
  const { loggedIn, pending, errors, handleSubmit } = useLoginForm(login);

  return (
    <main>
      <div className="container">
        {loggedIn ? (
          <p>🎉 Yay, you have just logged in!</p>
        ) : (
          <LoginForm
            pending={pending}
            errors={errors}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};
