import NavButton from "../nav-button";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { useState } from "react";

const navBarOptions = [
    {
        name: "Посты",
        path: "posts",
        icon: <BsPostcard />,
    },
    {
        name: "Подписки",
        path: "following",
        icon: <FiUsers />,
    },
    {
        name: "Подписчики",
        path: "followers",
        icon: <FaUsers />,
    },
];

function Navbar() {
    const [activeTab, setActiveTab] = useState('');

    console.log(activeTab);

    return (
        <nav>
            <ul className="flex flex-col gap-5">
                {navBarOptions.map((option) => {
                    return (
                        // <li key={option.name} >
                        //     <NavButton href={option.path} icon={option.icon}>
                        //         {option.name}
                        //     </NavButton>
                        // </li>

                        <li key={option.name}>
                            <NavButton
                            name={option.name}
                            href={option.path} 
                            icon={option.icon}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            >


                                {option.name}
                            </NavButton>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;
