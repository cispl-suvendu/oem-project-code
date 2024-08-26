"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/src/constants/login";
import { formSchema } from "@/src/schema/login";
import { useRouter } from "next/navigation";
import authService from "../../services/authService";
import usePostData from "../../hooks/usePost";
import useRouteChecker from "../../hooks/useRouteChecker";
import LoadingSpinner from "../../components/Skeleton/LoadingSpinner";
import { PasswordReset } from "../../interfaces/auth";

export default function ForgotPassword() {
  useRouteChecker();
  const router = useRouter();
  const { loading, postData } = usePostData(
    authService.forgotpassword,
    (result) => result && router.push("/login")
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReset>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<PasswordReset> = async (payload) => {
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
            <input
              type="password"
              {...register("password")}
              className="form-control"
              placeholder="Password"
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}

            <button
              disabled={loading}
              className="btn btn-lg custom-btn rounded-pill"
            >
              Submit
            </button>
          </div>
          <div className="forgt-pass d-flex justify-content-between mt-4">
            <Link href="/register">New user?</Link>
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
