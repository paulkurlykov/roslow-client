import { JSX } from "react"
import {Control, useController} from 'react-hook-form'
import { Input as NextInput } from "@heroui/react"
import { FieldErrors, ControllerRenderProps } from "react-hook-form"

type InputProps = {
    name: string;
    value: string;
    label: string;
    placeholder?: string;
    type?: string;
    endContent?: JSX.Element;
    errors: FieldErrors;
    onChange: () => void,
    onBlur: () => void

}

function ControlledInput({
    name,
    value,
    label,
    placeholder,
    type,
    errors,
    endContent,
    onChange,
    onBlur

}: InputProps) {

    return (
        <NextInput
        isRequired
        id={name}
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        isInvalid={Boolean(errors[name])}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={`${errors[name]?.message ?? ""}`}
        formNoValidate
        />

    )
}

export default ControlledInput
