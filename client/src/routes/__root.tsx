import { NavBar } from "@/components";
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const Root = () => (
  <>
    <NavBar />
    <hr />
    <div className="p-2 flex gap-2 max-w-2xl m-auto">
      <Outlet />
    </div>
  </>
);

interface IRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: Root,
});
