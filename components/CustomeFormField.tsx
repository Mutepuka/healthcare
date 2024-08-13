"use client"
import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { FormFieldType } from './form/PatientForm';

  interface CustomeProps{
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
  }

const CustomeFormField = ({control, fieldType, name, label}: CustomeProps) => {
  return (
    <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            {fieldType !== FormFieldType.CHECKBOX && label &&(
                <FormLabel>{label}</FormLabel>
            )}
          </FormItem>
        )}
      />
    )
}

export default CustomeFormField