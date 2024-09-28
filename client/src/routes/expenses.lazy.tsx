import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getExpenses } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Expenses = () => {
  const { isError, error, isPending, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getExpenses,
  });

  if (isError) {
    return (
      <div>{`An error has occured  ${JSON.stringify(error, null, 2)}`}</div>
    );
  }

  return (
    <div>
      <Table className="p-2 max-w-3xl m-auto">
        <TableCaption>A list of your all expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map(({ id, title, amount }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const Route = createLazyFileRoute("/expenses")({
  component: Expenses,
});
