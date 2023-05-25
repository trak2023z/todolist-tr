import React from "react";

const Field = ({
  type,
  name,
  watch,
  errors,
  register,
  required,
  validate,
  headerList,
  headerName,
}) => {
  const empty = !watch(name);
  const error = errors;
  const classInputOrTextarea = `peer absolute w-full pl-[2.5%] pr-[2.5%] text-darkGrey bg-inputBg font-montserrat focus:border-[1.5px] 
  text-base  outline-none
  ${name === "description" ? "h-[100px]" : "h-[50px]"}
  ${name === "description" ? "resize-none pt-[15px]" : ""}
  ${error ? "focus:border-red" : "focus:border-darkGrey"}`;

  const ref = !validate
    ? { required }
    : {
        required: required,
        validate: (value) => value === validate || "The passwords do not match",
      };

  return (
    <div
      className={`w-full m-[10px] ${headerList ? "" : "w-[90vw]"}
      ${name === "description" ? "mb-[60px]" : "mb-[10px]"} h-[50px] relative`}
    >
      {name === "description" ? (
        <textarea
          className={classInputOrTextarea}
          {...register(name, ref)}
          type={type}
          id={name}
          register={register}
          empty={!watch(name)}
          error={errors}
        />
      ) : (
        <input
          className={classInputOrTextarea}
          {...register(name, ref)}
          type={type}
          id={name}
          register={register}
          empty={!watch(name)}
          error={errors}
        />
      )}
      <label
        htmlFor={name}
        className={`absolute top-1/2 left-[5%] right-auto bottom-auto transform ${
          empty && `translate-y-[-50%] text-[15px]`
        } transition-transform 
        ease-in duration-300 
        ${
          name === "re_password"
            ? "w-[150px]"
            : headerList
            ? "w-[300px]"
            : "w-[100px]"
        }
        peer-focus:transform peer-focus:translate-x-[-30px]  peer-focus:translate-y-[-38px]  peer-focus:scale-90
        peer-focus:text-[12px] peer-focus:p-[5px]  peer-focus:pl-[6px]  peer-focus:leading-4  peer-focus:text-[white]
       ${error ? "peer-focus:bg-red" : "peer-focus:bg-darkGrey"}
       ${
         !empty &&
         `translate-x-[-30px] translate-y-[-38px] scale-90 text-[12px] p-[5px] pl-[6px] leading-4 text-[white] ${
           error ? "bg-red" : "bg-darkGrey"
         }`
       }
        `}
      >
        {name === "re_password"
          ? "Repeat password"
          : headerList
          ? headerName
          : `${name[0].toUpperCase()}${name.slice(1).replace("_", " ")}`}
      </label>
      {errors && (
        <span
          className={`absolute flex text-[11px] w-full font-semibold text-red justify-end  ${
            name === "description" ? "bottom-[63px]" : "bottom-[15px]"
          }`}
        >
          {name === "re_password"
            ? "The passwords must be identical"
            : `${name[0].toUpperCase()}${name
                .slice(1)
                .replace("_", " ")} is required`}
        </span>
      )}
    </div>
  );
};

export default Field;
