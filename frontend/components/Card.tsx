import { ReactNode } from "react";

type CardProps = {
    children?: ReactNode;
    className?: string;
};

const baseStyles =
    "border-4 border-border bg-background shadow-brutal-muted-lg p-6 sm:p-8 transition-transform duration-200";

const Card = ({ children, className = "" }: CardProps) => {
    return <div className={`${baseStyles} ${className}`.trim()}>{children}</div>;
};

export default Card;
