import type { InputHTMLAttributes } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2 text-sm font-medium text-text ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-primary-light text-primary focus:ring-primary disabled:opacity-50"
        {...props}
      />
      {label}
    </label>
  )
}
