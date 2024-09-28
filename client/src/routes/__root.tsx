import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const NavBar = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>{" "}
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create
      </Link>
    </div>
    {/* <TanStackRouterDevtools /> */}
  </>
);

const Root = () => (
  <>
    <NavBar />
    <hr />
    <Outlet />
  </>
);

export const Route = createRootRoute({
  component: Root,
});
