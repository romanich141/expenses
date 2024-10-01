import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { createExpense } from "@/lib/api";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createExpenseSchema } from "@server/sharedTypes";
export const CreateExpenseForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
    },
    onSubmit: async ({ value }) => {
      try {
        await createExpense({
          params: { json: value },
          onSuccessCallback: () => navigate({ to: "/expenses" }),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="p-2 max-w-xl m-auto">
      <h2>Hello from CreateExpense!</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          name="title"
          children={({ name, state, handleChange, handleBlur }) => (
            <>
              <Label htmlFor={name}>{"Title"}</Label>
              <Input
                id={name}
                name={name}
                type="text"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              {state.meta.errors && (
                <em className="text-red-500">{state.meta.errors}</em>
              )}
            </>
          )}
        />
        <form.Field
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          name="amount"
          children={({ name, state, handleChange, handleBlur }) => (
            <>
              <Label htmlFor={name}>{"Amount"}</Label>
              <Input
                id={name}
                name={name}
                type="number"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              {state.meta.errors && (
                <em className="text-red-500">{state.meta.errors}</em>
              )}
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mb-4" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};
