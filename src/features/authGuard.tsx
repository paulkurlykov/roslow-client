import { useCurrentQuery } from "@/app/services/userApi"
import { JSX } from "react";
import { Spinner } from "@heroui/react";


export const AuthGuard = ({
    children
}: {children: JSX.Element}) => {
    const {isLoading} = useCurrentQuery();

    if(isLoading) {
        return <Spinner/>
    }

    return children;
}