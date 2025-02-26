
type Props = {
    title: string;
    info?: string;
}

function ProfileInfo({title, info}: Props) {

    if(!info) return null;

    return (
        <p className="text-sm" >
            <span className="text-gray-500 mr-2" >{title}</span>
            {info}
            
        </p>
    )
}

export default ProfileInfo
