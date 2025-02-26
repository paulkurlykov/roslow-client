import { ReactNode, JSX } from "react";
import { Link } from "react-router-dom";
import Button from "../button";


type NavButtonProps = {
    children: ReactNode;
    icon: JSX.Element;
    href: string;
};

function NavButton({ children, icon, href }: NavButtonProps) {
    return (
        <Button className="flex justify-start text-xl" icon={icon}>
            <Link to={href}>{children}</Link>
        </Button>
    );
}

export default NavButton;
