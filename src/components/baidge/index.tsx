import { useSelector } from "react-redux";
import { getCurrentUser } from "@/app/reducers/userSlice";
import { User } from "@heroui/react";
import { fakeImage } from "../profile";

function Baidge() {
    const user = useSelector(getCurrentUser);

    return (
        <User
            avatarProps={{
                src: user?.avatarUrl,
            }}
            description={user?.email}
            name={user?.name}
            className="self-center"
        />
    );
}

export default Baidge;
