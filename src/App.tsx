import { HeroUIProvider } from "@heroui/react";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/react";
import { useSelector } from "react-redux";
import { useAppSelector } from "./app/hooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { StrictMode } from "react";
import AppLayout from "./components/layout/AppLayout";
import AuthPage from "./pages/AuthPage";
import PostsPage from "@/pages/PostsPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthGuard } from "./features/authGuard";
import CurrentPostPage from "./pages/CurrentPostPage";
import UserProfilePage from "./pages/UserProfilePage";
import { ToastProvider } from "@heroui/toast";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthPage />,
    },

    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <PostsPage />,
            },
            {
                path: "posts",
                element: <PostsPage />,
            },
            {
                path: "posts/:id",
                element: <CurrentPostPage />,
            },
            {
                path: "user/:id",
                element: <UserProfilePage />,
            },
            {
                path: "followers",
                element: <FollowersPage />,
            },
            {
                path: "following",
                element: <FollowingPage />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <StrictMode>
                <Provider store={store}>
                    <ThemeProvider>
                        <HeroUIProvider>
                            <ToastProvider toastOffset={100} placement="top-center" />

                            <AuthGuard>
                                <RouterProvider router={router} />
                            </AuthGuard>
                        </HeroUIProvider>
                    </ThemeProvider>
                </Provider>
            </StrictMode>
        </>
    );
}

export default App;
