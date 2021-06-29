import { ButtonHTMLAttributes } from 'react';
import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps): JSX.Element => {
    return <button className="button" {...props} />;
};

export default Button;
