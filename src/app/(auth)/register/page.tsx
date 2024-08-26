"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { formSchema } from "@/src/schema/register";
import { defaultValues } from "@/src/constants/register";
import authService from "../../services/authService";
import { useRouter } from "next/navigation";
import usePostData from "../../hooks/usePost";
import useRouteChecker from "../../hooks/useRouteChecker";
import { useShowPassword } from "../../hooks/useShowPassword";
import LoadingSpinner from "../../components/Skeleton/LoadingSpinner";
import { RegisterData } from "../../interfaces/auth";

export default function Register() {
  useRouteChecker();
  const router = useRouter();
  const { loading, postData } = usePostData(
    authService.register,
    (result) => result && router.replace("/login")
  );

  const initialValues: RegisterData = defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    isVisible: isPasswordVisible,
    toggleVisibility: togglePasswordVisibility,
    Icon: PasswordIcon,
  } = useShowPassword();

  const {
    isVisible: isConfirmPasswordVisible,
    toggleVisibility: toggleConfirmPasswordVisibility,
    Icon: ConfirmPasswordIcon,
  } = useShowPassword();

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    const payload = {
      full_name: data.name,
      phone_number: data.phone,
      email: data.email,
      password: data.password,
    };
    postData(payload);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="log-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="log-inner">
            <input
              type="text"
              {...register("name")}
              className="form-control"
              placeholder="Full Name"
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}

            <input
              type="text"
              {...register("email")}
              className="form-control"
              placeholder="Email Id"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}

            <input
              type="tel"
              {...register("phone")}
              className="form-control"
              placeholder="Phone Number"
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}

            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                {...register("password")}
                className="form-control"
                placeholder="Password"
              />

              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0.5rem",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <PasswordIcon />
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                {...register("confirmPassword")}
                className="form-control"
                placeholder="Confirm Password"
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0.5rem",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <ConfirmPasswordIcon />
              </span>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}

            <button
              disabled={loading}
              className="btn btn-lg custom-btn rounded-pill"
            >
              {loading ? "Please Wait..." : "Sign Up"}
            </button>
          </div>
          <div className="forgt-pass d-flex justify-content-between mt-4">
            <Link href="/forgot-password">Forget Password?</Link>
            <Link href="/login">Login</Link>
          </div>
          <div className="policy-terms text-center">
            <p>
              <Link href="#">Privacy Policy</Link> and{" "}
              <Link href="#">Terms of Service</Link> apply
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
