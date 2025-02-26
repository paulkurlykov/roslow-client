import { JSX, ReactNode } from "react"
import { Button as NextButton } from "@heroui/button"

type ButtonProps = {
    children: ReactNode;
    icon?: JSX.Element;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

function Button({
    children,
    icon,
    className,
    type,
    fullWidth,
    color

}: ButtonProps) {
    return (
        <NextButton
        startContent={icon}
        size="lg"
        color={color}
        variant="light"
        className={className}
        type={type}
        fullWidth={fullWidth}
        >
            {children}
        </NextButton>
    )
}

export default Button
