import type { SelectHTMLAttributes } from 'react'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
  placeholder?: string
}

export function Select({ options, placeholder, className = '', ...props }: SelectProps) {
  return (
    <select
      className={`rounded-xl border border-primary-light bg-surface px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
