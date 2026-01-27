import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../styles/login.scss";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "all",
  });

  const onSubmit = (_data: LoginFormValues) => {
    setLoading(true);

    setTimeout(() => {
      reset();
      navigate("/dashboard");
      setLoading(false);
    }, 2000);
  };

  return (
    <form className="login__form-container">
      <div className="login__header">
        <h1 className="login__header-title">Welcome!</h1>
        <p className="login__header-text">Enter details to login.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="login__form-section">
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
      </form>
    </form>
  );
};

export default LoginForm;
