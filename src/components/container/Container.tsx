import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;

}

function Container({children}: ContainerProps) {
    return (
        <div className="flex max-w-screen-xl mx-auto mt-10" >
            {children}
        </div>
    )
}

export default Container
