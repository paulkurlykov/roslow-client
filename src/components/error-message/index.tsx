import { JSX } from "react"

function ErrorMessage({error}:{error: string}):JSX.Element {

    // console.log("formError is ", error);

    return (
        <p className="text-red-700 mt-2 mb-5 text-small" >
            {error && error}
        </p>
    )
}

export default ErrorMessage
