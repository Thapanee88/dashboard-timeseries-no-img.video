import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    full?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, full, ...other }) => {
    return (
        <button {...other} className={[className, full ? 'w-full' : 'min-w-[130px]', 'shadow-lg bg-black py-[0.5rem] px-5 text-white rounded cursor-pointer select-none'].join(' ')}>
            {children}
        </button>
    );
};

export default Button;