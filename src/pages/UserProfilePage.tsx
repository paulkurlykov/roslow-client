import { getCurrentUser } from "@/app/reducers/userSlice";
import { useDisclosure } from "@heroui/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    useGetUserByIdQuery,
    useLazyCurrentQuery,
    useLazyGetUserByIdQuery,
} from "@/app/services/userApi";
import { useFollowUserMutation, useUnFollowUserMutation } from "@/app/services/followApi";
import { useEffect } from "react";
import { resetUser } from "@/app/reducers/userSlice";
import BackwardsButton from "@/components/backwards-button";
import { Card, Image, Button } from "@heroui/react";
import { fakeImage } from "@/components/profile";
import { MdOutlinePersonAddDisabled, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ProfileInfo from "@/components/profile-info";
import { formatToClientDate } from "@/utils/format-to-client.date";
import CountInfo from "@/components/count-info";
import EditProfile from "@/components/edit-profile";

function UserProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = useSelector(getCurrentUser);
    const { data } = useGetUserByIdQuery(id || "");
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnFollowUserMutation();
    const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const dispatch = useDispatch();

    useEffect(
        () => () => {
            dispatch(resetUser());
        },
        []
    );


        // console.log(data?.avatarUrl);
        // console.log(currentUser?.avatarUrl);


    const handleFollow = async () => {
        try {
            if (id) {
                data?.isFollowing ? await unfollowUser(id) : await followUser({ followingId: id });
            }
        } catch (err) {
            console.error("Exception " + err);
        }
    };

    const handleClose = async () => {
        onClose();
    };

    if (!data || !currentUser) {
        return null;
    }
    return (
        <>
            <BackwardsButton />
            <div className="flex items-stretch max-h-[500px] w-full gap-4">
                <Card className="flex flex-col gap-4 items-center text-center p-5">
                    <Image
                        src={data?.avatarUrl}
                        alt="avatar"
                        width={250}
                        height={300}
                        className="border-3 object-cover border-white"
                    />
                    <div className="flex flex-col text-2xl font-semibold gap-4 items-center">
                        {data.name}
                        {currentUser.id !== id ? (
                            <Button
                                onPress={handleFollow}
                                color={data?.isFollowing ? "default" : "primary"}
                                variant="flat"
                                className="gap-2"
                                endContent={
                                    data?.isFollowing ? (
                                        <MdOutlinePersonAddDisabled />
                                    ) : (
                                        <MdOutlinePersonAddAlt1 />
                                    )
                                }>
                                {data?.isFollowing ? "Отписаться" : "Подписаться"}
                            </Button>
                        ) : (
                            <Button onPress={onOpen} endContent={<CiEdit />}>
                                Редактировать
                            </Button>
                        )}
                    </div>
                </Card>

                <Card className="flex flex-col p-5 justify-around">
                    <div className="flex flex-col gap-2">
                        <ProfileInfo title="Почта" info={data.email || "Не указано"} />
                        <ProfileInfo title="Место рождения" info={data.location || "Не указано"} />
                        <ProfileInfo
                            title="Дата рождения"
                            info={formatToClientDate(data.dateOfBirth) || "Не указано"}
                        />
                        <ProfileInfo title="Обо мне" info={data.bio || "Не указано"} />
                    </div>

                    <div className="flex gap-2">
                        <CountInfo count={data.followers.length} title="Подписчики" />
                        <CountInfo count={data.followers.length} title="Подписки" />
                    </div>
                </Card>
            </div>
            <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
        </>
    );
}

export default UserProfilePage;
