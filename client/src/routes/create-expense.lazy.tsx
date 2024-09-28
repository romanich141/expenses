import { createLazyFileRoute } from '@tanstack/react-router'

const CreateExpense = () => {
  return <div className="p-2">Hello from CreateExpense!</div>
}

export const Route = createLazyFileRoute('/create-expense')({
  component: CreateExpense,
})
