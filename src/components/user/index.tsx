import { User as HeroUIUser } from "@heroui/react";


type UserType = {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string;
};

function User({ name, avatarUrl, description, className }: UserType) {
    return (
        <HeroUIUser
            name={name}
            className={className}
            description={description}
            avatarProps={{
                src: avatarUrl
            }}></HeroUIUser>
    );
}

export default User;
