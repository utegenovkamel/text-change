import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout.tsx";

const rootRoute = createRootRoute({
  component: Layout,
});

const textSplitterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("./pages/TextSplitterPage.tsx"),
    "TextSplitterPage",
  ),
});

const timestampRemovalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timestamp-removal",
  component: lazyRouteComponent(
    () => import("./pages/TimestampRemovalPage.tsx"),
    "TimestampRemovalPage",
  ),
});

const deletingWordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deleting-words",
  component: lazyRouteComponent(
    () => import("./pages/DeletingWordsPage.tsx"),
    "DeletingWordsPage",
  ),
});
const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test",
  component: lazyRouteComponent(
    () => import("./pages/TestPage.tsx"),
    "TestPage",
  ),
});

// const newFormationPage = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/formations/new",
//   component: lazyRouteComponent(
//     () => import("./pages/NewFormationPage.tsx"),
//     "NewFormationPage",
//   ),
//   validateSearch: (search: Record<string, unknown>) => {
//     return {
//       parent_id:
//         search.parent_id != null ? Number(search.parent_id) : undefined,
//     };
//   },
// });

const routeTree = rootRoute.addChildren([
  textSplitterRoute,
  timestampRemovalRoute,
  deletingWordsRoute,
  testRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
