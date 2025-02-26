import { useSelector, UseSelector } from "react-redux";
import { getCurrentUser } from "@/app/reducers/userSlice";
import { Card, CardHeader, Image, CardBody } from "@heroui/react";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import { useCurrentQuery } from "@/app/services/userApi";
import { Skeleton } from "@heroui/skeleton";

export const fakeImage = faker.image.personPortrait({
    sex: "male",
});

function Profile() {
    // const currentUser = useSelector(getCurrentUser);
    const { data: currentUser, isLoading, isSuccess } = useCurrentQuery();
    const location = useLocation();

    console.log(currentUser);

    if (!currentUser || location.pathname.includes("/user/")) {
        return null;
    }

    const { email, name, id, avatarUrl } = currentUser;

    return (
        <Card className="py-4 w-[302px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center" >
                <Skeleton className="rounded-xl"  isLoaded={isLoading}>
                    <Image
                        alt="Card profile"
                        className="object-cover rounded-xl"
                        src={avatarUrl}
                        width={1000}
                        height={300}
                    />
                </Skeleton>
            </CardHeader>
            <CardBody>
                <Skeleton className="" isLoaded={isLoading} >
                    <Link to={`/user/${id}`}>
                        <h4 className="font-bold text-large mb-2">{name}</h4>
                    </Link>
                </Skeleton>

                <Skeleton isLoaded={isLoading} >
                    <p className="text-default-500 flex items-center gap-2">
                        <MdAlternateEmail />
                        {email}
                    </p>
                </Skeleton>
            </CardBody>
        </Card>
    );
}

export default Profile;
