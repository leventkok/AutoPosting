import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string  
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        
      
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 
            bg-gray-800 border border-gray-700 
            rounded-lg text-white 
            placeholder-gray-500
            focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
            transition-all duration-200
            resize-none
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
    
        <div className="mt-1 flex justify-between items-center">
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : helperText ? (
            <p className="text-sm text-gray-500">{helperText}</p>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'