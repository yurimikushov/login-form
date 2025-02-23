import { login } from "../api/login";
import { LoginForm, useLoginForm } from "../ui/login-form";

import "./reset.css";
import "./app.css";

export const App = () => {
  const { pending, errors, handleSubmit } = useLoginForm(login);

  return (
    <main>
      <LoginForm pending={pending} errors={errors} onSubmit={handleSubmit} />
    </main>
  );
};
