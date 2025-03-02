import Input from "@/components/input.tsx";
import { useForm } from "react-hook-form";
import { Link } from "@heroui/react";
import { Button } from "@heroui/react";
import { useLazyCurrentQuery, useLoginMutation } from "@/app/services/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { hasErrorField } from "@/utils/has-error-field";

type LoginProps = {
    setSelected: (value: string) => void;
};

type LoginFields = {
    email: string;
    password: string;
};

const defaultValues = {
    email: "",
    password: "",
};

function Login({ setSelected }: LoginProps) {
    const {
        handleSubmit,
        control,
        formState: { errors },
        formState
    } = useForm<LoginFields>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: defaultValues,
    });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const onSubmit = async (data: LoginFields) => {
        try {
            const result = await login(data).unwrap();
            console.log('succcess');
            navigate('/')
        } catch (err) {
            if(hasErrorField(err)) {
                setError(err.data.message);
            }
        }
    };

    // console.log(formState);
    

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле"
                // errors={errors.email}
            />

            <Input
                control={control}
                name="password"
                label="Пароль"
                type="password"
                required="Обязательное поле"
                // errors={errors.password}

            />

            <ErrorMessage error={error} />

            <p className="text-center">
                нет аккаунта?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("sign-up")}>
                    Зарегистрируйтесь!
                </Link>
                
            </p>

            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
                    Войти
                </Button>
            </div>
        </form>
    );
}

export default Login;
