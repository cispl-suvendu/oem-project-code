"use client";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultValues } from "../../../constants/login";
import { formSchema } from "../../../schema/login";
import authService from "../../services/authService";
import { useContext } from "react";
import usePostData from "../../hooks/usePost";
import AuthContext from "../../context/authcontext";
import useRouteChecker from "../../hooks/useRouteChecker";
import { useShowPassword } from "../../hooks/useShowPassword";
import LoadingSpinner from "../../components/Skeleton/LoadingSpinner";
import { LoginData } from "../../interfaces/auth";

export default function Login() {
  useRouteChecker();

  const authContext = useContext(AuthContext);
  const { loading, postData } = usePostData(
    authService.login,
    (result) => result && authContext.login(result.token)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    isVisible: isPasswordVisible,
    toggleVisibility: togglePasswordVisibility,
    Icon: PasswordIcon,
  } = useShowPassword();

  const onSubmit: SubmitHandler<LoginData> = async (payload) => {
    await postData(payload);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="log-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="log-inner">
            <input
              type="text"
              {...register("email")}
              className="form-control"
              placeholder="Email id"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
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

            <button
              disabled={loading}
              className="btn btn-lg custom-btn rounded-pill"
            >
              {isSubmitting ? "loading..." : "Login"}
            </button>
          </div>
          <div className="forgt-pass d-flex justify-content-between mt-4">
            <Link href="/forgot-password">Forget Password?</Link>
            <Link href="/register">Sign Up</Link>
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
