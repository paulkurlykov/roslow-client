import { ReactNode } from "react";
import { IconType } from "react-icons";

type Props = {
    count: number;
    children: ReactNode;
};



function MetaInfo({ count, children }: Props) {


    return (
        <div className="cursor-pointer flex gap-2 items-center">
            <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100 transition-all">
                {children}
            </p>

            {count > 0 && <p className="font-semibold text-default-400 text-sm">{count}</p>}
        </div>
    );
}

export default MetaInfo;
