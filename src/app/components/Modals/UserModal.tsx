"use Client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/src/schema/register";
import { defaultValues } from "@/src/constants/register";

import Modal from './ParentModal';



export default function UserModal({ open, setOpen }) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
      });


      const submitForm =  (data) => {
        console.log('Submit:',data);
      };
    
      const handleClose = () => {
        setOpen(!open);
      };

  return (
    <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit(submitForm)} submitBtnText='Create User'>
     <form onSubmit={handleSubmit(submitForm)}>
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

          <input
            type="password"
            {...register("password")}
            className="form-control"
            placeholder="Password"
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>
      </form>
    
    </Modal>
  )
}
