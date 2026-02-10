interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: ()=> void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size='md',
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    ...props

}:ButtonProps){
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
    }

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    return (
        <button
            className={`
                rounded-lg font-semibold transition-all duration-200
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}