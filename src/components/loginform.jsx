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
import { useSearch } from "wouter";
import { saveState, getDeviceDetails } from "../utils/browser";
import config from "../config";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [_, navigate] = useLocation();

  const searchParams = new URLSearchParams(useSearch());

  let r = searchParams.get("why") || 0;
  let n = searchParams.get("redirect") || "";

  try {
    r = parseInt(r);
  } catch (e) {
    r = 0;
  }

  const { mutate, isLoading, reset } = useMutation({
    mutationFn: createFetcher({
      url: `${endpoints.login}?device=${getDeviceDetails()}`,
      method: "POST",
      formEncoded: true,
    }),

    mutationKey: [endpoints.login, "POST"],

    onSuccess: (data) => {
      saveState("local", config.browserStorageKeys.accessToken, {
        accessToken: data.access_token,
        tokenType: data.bearer,
      });

      toast.success("Welcome to BSSPD!");

      const url = n ? n : "/cloud";
      navigate(url);
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

  function handleSubmit(values) {
    if (isLoading) return;

    mutate({
      username: values.email,
      password: values.password,
    });
  }
  return (
    <div className="w-[90%] sm:w-[80%] max-w-[400px] lg:max-w-lg xl:max-w-md bg-primary text-white rounded-2xl shadow shadow-black  px-8 pt-4">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center w-full pt-6">
              <div className="space-y-2 w-full">
                <legend className="text-xl lg:text-2xl font-normal text-center">
                  {r === 0 && "Log In"}

                  {r === 1 && "Log In to Continue"}
                </legend>

                <p className="text-center text-sm text-white/70">
                  Access your blockchain cloud
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
                    <label className="text-sm"> Password</label>

                    <div className="w-full relative">
                      <Field
                        name="password"
                        placeholder="Choose a password"
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

                  <div className="w-full pt-4">
                    <button
                      disabled={!isValid || isLoading}
                      type="submit"
                      className="btn-4 py-3 w-full font-medium   rounded-xl"
                    >
                      {isLoading ? <Loader inverted /> : "Log In"}
                    </button>
                  </div>

                  <p className="text-center text-sm text-white/90  pt-4">
                    Forgot your password?{" "}
                    <Link
                      className="hover:underline cursor-pointer"
                      to="/reset"
                    >
                      <span>Reset</span>
                    </Link>
                  </p>

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
