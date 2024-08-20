import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import cn from "classnames";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Link, useLocation } from "wouter";
import Loader from "./loader";
import { createFetcher, endpoints } from "../utils/fetchhelpers";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),

  confirmPassword: Yup.string()
    .required("Confirm your new password")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [_, navigate] = useLocation();

  const { mutate, isLoading, reset } = useMutation({
    mutationFn: createFetcher({
      url: endpoints.signUp,
      method: "POST",
    }),

    mutationKey: [endpoints.signUp, "POST"],

    onSuccess: (data) => {
      toast.success("Taking you to sign in...");
      window.location.href = "/join?t=exists";
    },

    onError: (error) => {
      reset();
      console.log("Error: ", error);
      toast.error(error.message);
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  function handleSubmit(values) {
    if (isLoading) return;

    mutate({
      name: values.name,
      password: values.password,
    });
  }
  return (
    <div className="w-[90%] sm:w-[80%] max-w-[400px] lg:max-w-lg xl:max-w-md bg-primary text-white rounded-2xl shadow shadow-black px-8 pt-4">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center w-full pt-6">
              <div className="space-y-2 w-full">
                <legend className="text-xl lg:text-2xl font-normal text-center">
                  Reset Password
                </legend>

                <p className="text-center text-sm text-white/70">
                  Recover your BSSPD account
                </p>

                {/* Fields  */}

                <div className="space-y-3 py-4">
                  <div className="flex flex-col justify-start items-start space-y-1 ">
                    <label className="text-sm"> Email Address</label>
                    <Field
                      name="email"
                      placeholder="Email address"
                      className={
                        "field " + cn(errors.email && " border-yellow-500 ")
                      }
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-yellow-500 text-xs"
                    />
                  </div>

                  <div className="flex flex-col justify-start items-start space-y-1 ">
                    <label className="text-sm"> New Password</label>

                    <div className="w-full relative">
                      <Field
                        name="password"
                        placeholder="Choose a new password"
                        className={
                          "field " +
                          cn(errors.password && " border-yellow-500 ")
                        }
                        type={showPassword ? "text" : "password"}
                      />

                      <>
                        {!showPassword ? (
                          <BsEye
                            onClick={togglePassword}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer text-xl"
                          />
                        ) : (
                          <BsEyeSlash
                            onClick={togglePassword}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer text-xl"
                          />
                        )}
                      </>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-yellow-500 text-xs"
                    />
                  </div>

                  <div className="flex flex-col justify-start items-start space-y-1 ">
                    <label className="text-sm"> Confirm New Password</label>

                    <div className="w-full relative">
                      <Field
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className={
                          "field " +
                          cn(errors.confirmPassword && " border-yellow-500 ")
                        }
                        type={showPassword2 ? "text" : "password"}
                      />

                      <>
                        {!showPassword2 ? (
                          <BsEye
                            onClick={togglePassword2}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer text-xl"
                          />
                        ) : (
                          <BsEyeSlash
                            onClick={togglePassword2}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer text-xl"
                          />
                        )}
                      </>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-yellow-500 text-xs"
                    />
                  </div>

                  <div className="w-full pt-4">
                    <button
                      disabled={!isValid || isLoading}
                      type="submit"
                      className="btn-4 py-3 w-full font-medium   rounded-xl"
                    >
                      {isLoading ? <Loader inverted /> : "Reset"}
                    </button>
                  </div>

                  <p className="text-center text-sm text-white/90 ">
                    <span className="inline-block mr-2">
                      Don't have an account?
                    </span>
                    <Link
                      className="hover:underline cursor-pointer"
                      to="/register"
                    >
                      <span>Register</span>
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
