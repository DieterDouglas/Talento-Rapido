import type { SelectHTMLAttributes } from 'react'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
  placeholder?: string
  label?: string
  error?: string
}

export function Select({ options, placeholder, label, error, id, className = '', ...props }: SelectProps) {
  const select = (
    <select
      id={id}
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

  if (!label && !error) {
    return select
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      {select}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
