import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTotalSpent } from "@/lib/api";

const Home = () => {
  const { isError, error, isPending, data } = useQuery({
    queryKey: ["get-total-spend"],
    queryFn: getTotalSpent,
  });

  if (isError) {
    return (
      <div>{`An error has occured  ${JSON.stringify(error, null, 2)}`}</div>
    );
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "Loading..." : data}</CardContent>
    </Card>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Home,
});
