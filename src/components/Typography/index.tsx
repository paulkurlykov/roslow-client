import { ReactNode } from "react"

type TypographyProps = {
    children: ReactNode;
    size?: string;
}

function Typography({children, size}: TypographyProps) {
    return (
        <p className={`${size}`} >
           {children} 
        </p>
    )
}

export default Typography
