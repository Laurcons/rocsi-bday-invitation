import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/page.tsx"),
  route("i/:nickname/:code", "routes/i/[nickname]/[code]/page.tsx"),
] satisfies RouteConfig;
