import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

const Button = ({ isOutlined = false, ...props }: ButtonProps): JSX.Element => {
    return <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />;
};

export default Button;
