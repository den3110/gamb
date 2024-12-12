import ComponentToggle from "@/components/ComponentToggle";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routePath } from "./path";
import PrivateRoute from "./PrivateRoute";
const LoginPage = import("@/modules/auth/screens/login");
const DashboardPage = import("@/modules/dashboard/screens");
const NotFoundPage = import("@/components/NotFoundPage");

interface iRoute {
  path: string;
  Component: React.ElementType;
  isCheckAuth?: boolean;
  props?: Object;
  privateRouteProps?: Object;
  children?: iRoute[];
}

const routes: iRoute[] = [
  {
    path: routePath.Login,
    Component: lazy(() => LoginPage),
    isCheckAuth: false,
  },
  {
    path: routePath.Dashboard,
    Component: lazy(() => DashboardPage),
    isCheckAuth: true,
  },
  {
    path: "*",
    Component: lazy(() => NotFoundPage),
    isCheckAuth: false,
  },
];

function AppRoute() {
  return (
    <Layout>
      <Routes>
        {routes.map((route, key) => {
          return (
            <Route
              key={key}
              path={route.path}
              element={
                <ComponentToggle
                  isToggle={route.isCheckAuth}
                  ViewToggle={
                    <PrivateRoute {...route.privateRouteProps}>
                      <Suspense fallback={<Loading />}>
                        <route.Component {...route.props} />
                      </Suspense>
                    </PrivateRoute>
                  }
                  ViewDefault={
                    <Suspense fallback={<Loading />}>
                      <route.Component {...route.props} />
                    </Suspense>
                  }
                />
              }
            >
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <child.Component {...child.props} />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          );
        })}
      </Routes>
    </Layout>
  );
}

export default AppRoute;
