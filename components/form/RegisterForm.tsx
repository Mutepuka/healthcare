"use client";

import React,{useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormControl,} from "@/components/ui/form"
import CustomeFormField from '../CustomeFormField';
import SubmitButton from '../SubmitButton';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patients.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderOptions } from '@/constants';
import { Label } from "@/components/ui/label";
 
const RegisterForm = ({ user }: { user: User }) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Please tell us more about yourself.</p>
      </section>

      <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">Personal Information</h2>
      </div>

      {/** Fullname */}

      <CustomeFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

         {/* EMAIL & PHONE */}
         <div className="flex flex-col gap-6 xl:flex-row">

            <CustomeFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomeFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(260) 123-4567"
            />
            </div>

            {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomeFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomeFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field)=>(
                <FormControl>
                    <RadioGroup
                        className="flex h-11 gap-6 xl:justify-between"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        >
                        {GenderOptions.map((option) => (
                            <div key={option} className="radio-group flex items-center gap-2">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                                {option}
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                </FormControl>
              )}
              
            />
    
          </div>
      </section>
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm