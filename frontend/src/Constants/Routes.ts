export const PrivateRoutes = [
  {
    index: true,
    lazy: () => import("../Pages/HomePage/HomePage.tsx"),
  },
];

export const UserAuthRoutes = [
  {
    path: "signup",
    lazy: () => import("../Pages/Authentication/SignUp.tsx"),
  },
  {
    path: "signin",
    lazy: () => import("../Pages/Authentication/SignIn.tsx"),
  },
];

export const routes = {
  signin: "/signin",
  signup: "/signup",
};
