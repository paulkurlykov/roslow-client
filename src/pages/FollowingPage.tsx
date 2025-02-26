import { getCurrentUser } from "@/app/reducers/userSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/react";
import User from "@/components/user";


function FollowingPage() {
    const currentUser = useSelector(getCurrentUser);

console.log(currentUser?.following.length);

    if(!currentUser) return null;

    return (
<>
{currentUser?.following.length > 0 && (
    <div className="flex flex-col gap-5" >
{currentUser.following.map(user => {
    return <Link to={`/users/${user.following.id}`} key={user.following.id}>

<Card>
    <CardBody className="block" >
        <User 
        name={user.following.name || ""}
        avatarUrl={user.following.avatarUrl || ""}
        description={user.following.email || ""}
        />
    </CardBody>
</Card>

    </Link>
})}

    </div>
)}
{currentUser.following.length === 0 && (
    <h4>Подписок пока нет</h4>
)}
</>
    )
}

export default FollowingPage
