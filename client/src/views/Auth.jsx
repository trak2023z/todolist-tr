import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginForm, registerForm, defaultAuthValues } from "../constans";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import Field from "../components/Field";

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [dataform, setFormData] = useState(loginForm);

  const switchMode = () => {
    reset(defaultAuthValues);
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    setFormData(isLogin ? loginForm : registerForm);
  }, [isLogin]);

  return (
    <div className="flex flex-col justify-center items-center max-w-full h-[92.5vh] bg-lightGrey text-darkGrey">
      <div className={`flex flex-col justify-center items-center h-full`}>
        <h1
          className={`font-extrabold text-darkGrey ${
            isLogin ? "-mt-[5vh]" : "mt-[0vh]"
          }`}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </h1>
        <form
          className="flex w-[90%] flex-wrap"
          onSubmit={
            isLogin
              ? handleSubmit(auth.handleSiginIn)
              : handleSubmit(async (register) => {
                  if ("first_name" in register)
                    await auth.handleSignUp(register);
                  reset();
                  setIsLogin(true);
                })
          }
        >
          {dataform.map((props, index) => (
            <Field
              key={index}
              {...props}
              watch={watch}
              errors={!!errors[props.name]}
              register={register}
              required={true}
              validate={
                props.name === "re_password" ? watch("password") : false
              }
            />
          ))}
          <div className="w-full flex items-center justify-center mt-[2.5vh]">
            <Button name={isLogin ? " Log In" : "Sign Up"} />
          </div>
        </form>
        <div className="w-full flex items-center justify-center mt-[2.5vh]">
          <Button
            color="red"
            onClick={switchMode}
            name={
              isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Log In"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
