import { ReactNode } from 'react'

type EmptyStateAction = {
  label: string
  onClick: () => void
}

type EmptyStateProps = {
  title: string
  description: ReactNode
  action?: EmptyStateAction
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {action.label}
        </button>
      )}
    </section>
  )
}
