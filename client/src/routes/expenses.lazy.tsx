import { createLazyFileRoute } from '@tanstack/react-router'

const Expenses = () => {
  return <div className="p-2">Hello from Expenses!</div>
}

export const Route = createLazyFileRoute('/expenses')({
  component: Expenses,
})
