type EmptyStateProps = {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-primary-light px-6 py-8 text-center text-sm text-text-muted">
      {message}
    </div>
  )
}
