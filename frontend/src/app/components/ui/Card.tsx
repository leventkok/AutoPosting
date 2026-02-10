interface CardProps{
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}


export function Card({
    children,
    className ='',
    hover = false
}: CardProps){
    return(
        <div className={`bg-gray-900 rounded-xl p-6 border border-gray-800
         ${hover ? 'hover:border-blure-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300' : ''} ${className}`}>
            {children}
        </div>
    )
}