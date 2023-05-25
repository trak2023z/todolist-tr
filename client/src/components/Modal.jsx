import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { modalTodoListForm, defaultTodoList } from "../constans";
import Button from "./Button";
import Field from "./Field";

const ModalAdd = ({ modalIsOpen, closeModal, hook, header }) => {
  const formData = modalTodoListForm;
  const defaultValue = defaultTodoList;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
  });
  return (
    <Modal
      className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[80%] p-[20px] bg-lightGrey border-[1px] border-grey shadow-30000 text-[#303030] outline-none"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <div className="absolute cursor-pointer text-red right-[10px] top-[5x]">
        <IoCloseSharp size="3vh" onClick={closeModal} />
      </div>
      <h1 className="flex justify-center items-center">Add {header}</h1>
      <form
        onSubmit={handleSubmit(async (register) => {
          console.log(register);
          await hook.handleAdd(register);
          closeModal();
          reset();
        })}
      >
        {formData.map((props, index) => (
          <Field
            {...props}
            key={index}
            watch={watch}
            errors={!!errors[props.name]}
            register={register}
            header={header}
          />
        ))}
        <div className="flex justify-center items-center">
          <Button height="40px" name="Submit" />
        </div>
      </form>
    </Modal>
  );
};

export default ModalAdd;
