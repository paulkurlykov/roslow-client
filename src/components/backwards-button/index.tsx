import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";

function BackwardsButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
         navigate(-1)
    }

    return (
        <div  onClick={handleGoBack} className=" bg-default-50 w-fit py-2 px-4 text-default-600 flex items-center gap-2 mb-10 cursor-pointer rounded-xl hover:scale-105 " >
            <FaArrowLeft />
            Назад
        </div>
    )
}

export default BackwardsButton
