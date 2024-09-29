import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";
import { Logout } from "@/components";

const Profile = () => {
  const { isError, error, data } = useQuery(userQueryOptions);

  if (isError) {
    return (
      <div>{`An error has occured  ${JSON.stringify(error, null, 2)}`}</div>
    );
  }

  return (
    <div>
      <Logout />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const Route = createLazyFileRoute("/_authanticated/profile")({
  component: Profile,
});
