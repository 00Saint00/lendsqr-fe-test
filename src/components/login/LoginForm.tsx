import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import "../../styles/login.scss";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "all",
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    // Validate login
    const authUser = login(data.email, data.password);

    setTimeout(() => {
      if (authUser) {
        reset();
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <form className="login__form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="login__header">
        <h1 className="login__header-title">Welcome!</h1>
        <p className="login__header-text">Enter details to login.</p>
      </div>

      <div className="login__form-section">
        {error && (
          <div className="login__error" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <div className="login__fields">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="input-error">Please enter your email</span>
          )}
        </div>

        <div className="login__fields">
          <div className="input-password">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="input-error">Please enter your password</span>
            )}
            <span
              className="password-visible"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        <p className="login__forgot">FORGOT PASSWORD?</p>

        <button type="submit" disabled={loading} className="login__button">
          {loading ? "Loading..." : "LOG IN"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
