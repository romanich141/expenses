import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { Login } from "@/components";

const Component = () => {
  const { userProfile } = Route.useRouteContext();

  if (!userProfile) {
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authanticated")({
  beforeLoad: async ({ context }) => {
    try {
      const queryClient = context.queryClient;
      const userProfile = await queryClient.fetchQuery(userQueryOptions);

      return { userProfile };
    } catch (error) {
      console.error(error);
      return { userProfile: null };
    }
  },
  component: Component,
});
