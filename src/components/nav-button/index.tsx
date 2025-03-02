import { ReactNode, JSX } from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import { useState } from "react";


type NavButtonProps = {
    name: string;
    children: ReactNode;
    icon: JSX.Element;
    href: string;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
};

function NavButton({ children, name, icon, href, activeTab, setActiveTab }: NavButtonProps) {

    const activeClass = "border border-solid border-default/80"

    const handleClick = () => {
        setActiveTab(name);
    }


    return (
        <Button onClick={handleClick} className={`flex justify-start w-full text-xl ${activeTab === children ? activeClass : ""} `} icon={icon}>
            <Link to={href}>{children}</Link>
        </Button>
    );
}

export default NavButton;
