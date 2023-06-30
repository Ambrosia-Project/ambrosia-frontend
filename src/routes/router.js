import React, { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import SessionHelper from "../helpers/SessionHelper";
import { getViewAuthorizationForAll } from "../helpers/AuthorizationHelper";
import Loading from "../components/Loading";

// lazy loading components for better performance
const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const RegisterInformationPage = lazy(() =>
  import("../pages/RegisterInformationPage")
);
const ResetPage = lazy(() => import("../pages/ForgetPasswordPage"));
const ResetConfirmationPage = lazy(() =>
  import("../pages/PasswordConfirmationPage")
);
const NewPasswordPage = lazy(() => import("../pages/NewPasswordPage"));
const Navbar = lazy(() => import("../components/Navbar"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("../pages/BlogDetailsPage"));
const CreateBlogPage = lazy(() => import("../pages/CreateBlogPage"));
const AddPreferences = lazy(() => import("../pages/AddPreferences"));
const AddAllergies = lazy(() => import("../pages/AddAllergies"));
const MenuListPage = lazy(() => import("../pages/Menu List/MenuListPage"));
const SpecificMenuListPage = lazy(() =>
  import("../pages/Specific Menu/SpecificMenuPage")
);

const NotFound = lazy(() => import("../components/NotFound"));

const auth = [
  {
    path: "/login",
    component: Login,
    exact: false,
  },
  {
    path: "/signup",
    component: Register,
    exact: true,
  },
  {
    path: "/signup/info",
    component: RegisterInformationPage,
    exact: true,
  },
  {
    path: "/forgetPassword",
    component: ResetPage,
    exact: true,
  },
  {
    path: "/forgetPassword/confirmUser",
    component: ResetConfirmationPage,
    exact: true,
  },
  {
    path: "/updatePassword",
    component: NewPasswordPage,
    exact: true,
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/blogs",
    component: BlogPage,
    exact: true,
  },
  {
    path: "/blogs/create",
    component: CreateBlogPage,
    exact: true,
  },
  {
    path: "/blogs/:id",
    component: BlogDetailsPage,
    exact: true,
  },
  {
    path: "/addpreferences",
    component: AddPreferences,
    exact: true,
  },
  {
    path: "/addallergies",
    component: AddAllergies,
    exact: true,
  },
  {
    path: "/menuList",
    component: MenuListPage,
    exact: true,
  },
  {
    path: "/menuList/:name",
    component: SpecificMenuListPage,
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function AppRoutes() {
  const user = SessionHelper.getUser();
  // const [drawerList, setDrawerList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);

  // const populateDrawerList = useCallback(() => {
  //   if (user) {
  //     const roles = user?.roles;
  //     //const authorization = getViewAuthorizationForAll(roles);

  //     let drawerList = [

  //     ];
  //     setDrawerList(drawerList);
  //   }
  // }, [user, update]);

  // const init = useCallback(() => {
  //   populateDrawerList();
  // }, [populateDrawerList, update]);

  // React.useEffect(() => {
  //   init();
  // }, [init, user]);

  const ProtectedRoutes = () => (
    <Switch>
      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          {auth.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component update={update} setUpdate={setUpdate} />
            </Route>
          ))}
          <PrivateRoute>
            <Navbar />
            <ProtectedRoutes />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
