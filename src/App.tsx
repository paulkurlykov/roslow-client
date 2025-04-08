import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider/index";
import AppLayout from "./components/layout/AppLayout";
import AuthPage from "./pages/AuthPage";
import PostsPage from "./pages/PostsPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import {Provider} from "react-redux";
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
        </>
    );
}

export default App;
