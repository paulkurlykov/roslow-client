import Input from "@/components/input.tsx";
import { useForm, Controller } from "react-hook-form";
import { Link, Button, Input as NextInput } from "@heroui/react";
import { useLazyCurrentQuery, useRegisterMutation } from "@/app/services/userApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { hasErrorField } from "@/utils/has-error-field";
import ErrorMessage from "@/components/error-message";
import ControlledInput from "@/components/input.tsx/ControlledInput";

type RegProps = {
    setSelected: (value: string) => void;
};

type RegFields = {
    email: string;
    password: string;
    name: string;
    file: File | null;
};

const defaultValues = {
    email: "",
    password: "",
    name: "",
};

function Registration({ setSelected }: RegProps) {
    const {
        handleSubmit,
        control,
        formState: { errors },
        formState
    } = useForm<RegFields>({
        mode: "onBlur",
        defaultValues: defaultValues,
        reValidateMode: "onBlur"
    });

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = async (data: RegFields) => {
        try {
            console.log("submit");
            const result = await register(data).unwrap();
            setSelected("login");
        } catch (err) {
            console.log("err");
            if (hasErrorField(err)) {
                setError(err.data.message);
            }
            console.error("Exception " + err);
        }
    };

    // console.log(formState);


    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate >
            <Controller
                name="name"
                control={control}
                rules={{ required: "Обязательное поле" }}
                render={({ field }) => (
                    <ControlledInput {...field} type="text" label="Имя" errors={errors} />
                )}
            />

            <Controller
                name="email"
                control={control}
                rules={{ 
                    required: "Обязательное поле",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Введите корректный адрес почты"
                    }
            }}
                render={({ field }) => (
                    <ControlledInput {...field} type="email" label="Email" errors={errors} />
                )}
            />

            <Controller
                name="password"
                control={control}
                rules={{ required: "Обязательное поле" }}
                render={({ field }) => (
                    <ControlledInput {...field} type="password" label="Пароль" errors={errors} />
                )}
            />


            <ErrorMessage error={error} />

            <p className="text-center flex gap-4 justify-center text-sm">
                <span>нет аккаунта?</span>
                <Link
                    size="sm"
                    className="cursor-pointer text-sm"
                    onPress={() => setSelected("login")}>
                    Войти!
                </Link>
            </p>

            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
                    Отправить данные
                </Button>
            </div>
        </form>
    );
}

export default Registration;
