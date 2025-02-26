import { getCurrentUser } from "@/app/reducers/userSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/react";
import User from "@/components/user";

function FollowersPage() {
    const currentUser = useSelector(getCurrentUser);
    if(!currentUser) return null;




    return (
<>
{currentUser.followers.length > 0 && (
    <div className="flex flex-col gap-5" >
{currentUser.followers.map(user => {
    return <Link to={`/user/${user.follower.id}`} key={user.follower.id}>

<Card>
    <CardBody className="block" >
        <User 
        name={user.follower.name || ""}
        avatarUrl={user.follower.avatarUrl || ""}
        description={user.follower.email || ""}
        />
    </CardBody>
</Card>

    </Link>
})}

    </div>
)}
{currentUser.followers.length === 0 && (
    <h4>Подписчиков пока нет</h4>
)}
</>
    )
}

export default FollowersPage
