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
  name: Yup.string()
    .required("Please enter your name")
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name must be at most 20 characters")
    .test(
      "is-at-least-two-words",
      "Name must be at least two words",
      (value) => {
        if (!value) return false;
        return value.split(" ").length >= 2;
      }
    )
    .matches(/^[a-zA-Z\s]*$/, "Name must contain only alphabets and spaces")
    .trim(),

  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),

  confirmPassword: Yup.string()
    .required("Confirm your password")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [_, navigate] = useLocation();

  const { mutate, isLoading, reset } = useMutation({
    mutationFn: createFetcher({
      url: endpoints.register,
      method: "POST",
    }),

    mutationKey: [endpoints.signUp, "POST"],

    onSuccess: (data) => {
      toast.success("Account created successfully.");

      const url = `/verify/${data.rid}/${data.acuid}`;
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

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  function handleSubmit(values) {
    if (isLoading) return;

    mutate({
      fullName: values.name,
      email: values.email,
      password: values.password,
    });
  }
  return (
    <div className="w-[90%] sm:w-[80%] max-w-[400px] lg:max-w-lg xl:max-w-md bg-primary text-white rounded-2xl shadow shadow-black  px-8 pt-4">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center w-full pt-6">
              <div className="space-y-2 w-full">
                <legend className="text-xl lg:text-2xl font-normal text-center">
                  Register
                </legend>

                <p className="text-center text-sm text-white/70">
                  Join our Blockchain-based Security Sharing Scheme
                </p>

                {/* Fields  */}

                <div className="space-y-3 py-4">
                  <div className="flex flex-col justify-start items-start space-y-1 ">
                    <label className=" text-sm  "> Your Name</label>
                    <Field
                      name="name"
                      placeholder="Name of individual or organization"
                      className={
                        "field  " + cn(errors.name && " border-yellow-500 ")
                      }
                      type="text"
                    />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-yellow-500 text-xs"
                    />
                  </div>

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

                  <div className="flex flex-col justify-start items-start space-y-1 ">
                    <label className="text-sm"> Confirm Password</label>

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

                  <div
                    className="flex flex-row justify-start items-center space-x-4
                  
                  "
                  >
                    <Field name="terms" type="checkbox" id="terms" />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the BSSPD Terms of Service
                    </label>
                  </div>

                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-yellow-500 text-xs"
                  />

                  <div className="w-full pt-4">
                    <button
                      disabled={!isValid || isLoading}
                      type="submit"
                      className="btn-4 py-3 w-full font-medium   rounded-xl"
                    >
                      {isLoading ? <Loader inverted /> : "Register"}
                    </button>
                  </div>

                  <p className="text-center text-sm text-white/90  ">
                    <span className="inline-block mr-2">
                      Already have an account?
                    </span>
                    <Link
                      className="hover:underline cursor-pointer"
                      to="/login"
                    >
                      <span>Log in</span>
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
