import { routePath } from "@/routes/path";
import { useMemo } from "react";
import { matchPath, Params, useLocation } from "react-router-dom";

interface Path {
  pathname: string;
  pathPattern: string;
  params?: Params<string>;
}

const useGetCurrentPath = () => {
  const { pathname } = useLocation();

  const currentPath: Path = useMemo(() => {
    let currentPath: Path = {
      pathname: "",
      pathPattern: "",
    };

    Object.values(routePath)?.forEach((pathPattern) => {
      const match = matchPath(pathPattern, pathname);

      if (match) {
        currentPath = {
          pathname,
          pathPattern,
          params: match?.params || {},
        };
      }

      return;
    });

    return currentPath;
  }, [pathname]);

  return currentPath;
};

export default useGetCurrentPath;
