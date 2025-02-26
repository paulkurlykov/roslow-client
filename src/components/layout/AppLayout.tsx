import Header from "../header/Header";
import Container from "../container/Container";
import Navbar from "../nav-bar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUser } from "@/app/reducers/userSlice";
import { useEffect } from "react";
import Profile from "../profile";

function AppLayout() {

const isAuthenticated = useSelector(getIsAuthenticated);
const user = useSelector(getUser);
const navigate = useNavigate();

// console.log(user);

useEffect(() => {
if(!isAuthenticated) {
    console.log(isAuthenticated);
    navigate('/auth')
}
}, [])

    return (
        <>
            <Header />
            <Container>
                <div className="grid grid-cols-[15rem,_1fr,_max-content] p-4 gap-8 w-full">
                    <aside className="flex-1 p-4"  >
                        <Navbar /> 
                    </aside>

                    <main className="flex-2 p-4"  >
                        <Outlet />
                    </main>

                    <aside className="flex-col flex-2 gap-5" >
                        <Profile/>
                    </aside>

                </div>
            </Container>
        </>
    );
}

export default AppLayout;
 