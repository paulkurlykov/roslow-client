import { useContext } from "react";
import { ThemeContext } from "../theme-provider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, logout } from "@/app/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { IoLogOutOutline } from "react-icons/io5";
import Baidge from "../baidge";
import { Link } from "react-router-dom";
function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isAuthenticated = useSelector(getIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <Navbar>
            <NavbarBrand>
                <Link to={`/`} >
                <p className="font-bold text-inherit hover:bg-default/40 rounded-2xl px-4 py-4">Network Social</p>
                </Link>
            </NavbarBrand>
            <NavbarContent  justify="end">
                <NavbarItem
                    className="lg:flex text-3xl cursor-pointer"
                    onClick={() => toggleTheme()}>
                    {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
                </NavbarItem>

                <NavbarItem className="flex items-center gap-4" >
                    {isAuthenticated && (

                        <>
                        <Baidge/>
                        <Button
                            color="default"
                            variant="flat"
                            className="gap-2"
                            onPress={handleLogout}>
                            <span>Выйти</span>
                            <IoLogOutOutline className="w-[1.4rem] h-[1.4rem]" />
                        </Button>
                                </>
                    )}
                </NavbarItem>

            </NavbarContent>
        </Navbar>
    );
}

export default Header;
