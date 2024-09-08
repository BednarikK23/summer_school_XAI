import { Navigate, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorsNotFound from "../pages/errors/ErrorsNotFound";
import AdminLayout from "../layouts/admin/AdminLayout";
import HomePage from "../pages/home/HomePage";
import WineLayout from "../layouts/wines/WinesLayout";
import WineryLayout from "../layouts/wineries/WineriesLayout";
import UserLayout from "../layouts/user/UserLayout";
import MainWinesPage from "../pages/wines/MainWinesPage";
import MainShowWinePage from "../pages/wines/MainShowWinePage";
import MainWineriesPage from "../pages/wineries/MainWineriesPage";
import MainShowWineryPage from "../pages/wineries/MainShowWineryPage";
import BasketPage from "../pages/basket/BasketPage";
import OrderCustomerDetails from "../pages/order/OrderCustomerDetails";
import OrderLayout from "../layouts/order/OrderLayout";
import OrderOverview from "../pages/order/OrderOverview";
import OrderConfirmation from "../pages/order/OrderConfirmation";
import MainUserPage from "../pages/user/MainUserPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ShowWineryWinesPage from "../pages/wineries/ShowWineryWinesPage";
import MainToursPage from "../pages/tours/MainToursPage"
import MyWineryWinesPage from "../pages/my-winery/MyWineryWinesPage";
import MyWineryOrdersPage from "../pages/my-winery/MyWineryOrdersPage";
import ShowTourPage from "../pages/tours/ShowTourPage";
import AdminToursPage from "../pages/admin/AdminToursPage";
import AdminWineriesPage from "../pages/admin/AdminWineriesPage";
import AdminWinesPage from "../pages/admin/AdminWinesPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import MyWineryToursPage from "../pages/my-winery/MyWineryToursPage";

const adminLayoutRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to="./wines" relative="path" />
    },
    {
        path: "users",
        Component: AdminUsersPage
    },
    {
        path: "orders",
        Component: AdminOrdersPage
    },
    {
        path: "wines",
        Component: AdminWinesPage
    },
    {
        path: "wineries",
        Component: AdminWineriesPage
    },
    {
        path: "tours",
        Component: AdminToursPage
    },
];

const winesLayoutRoutes: RouteObject[] = [
    {
        path: "",
        Component: MainWinesPage
    },
    {
        path: ":id",
        Component: MainShowWinePage
    }
];

const wineriesLayoutRoutes: RouteObject[] = [
    {
        path: "",
        Component: MainWineriesPage
    },
    {
        path: ":id",
        Component: MainShowWineryPage
    },
    {
        path: ":id/wines",
        Component: ShowWineryWinesPage,
    },
    {
        path: ":id2/wines/:id",
        Component: MainShowWinePage,
    }
];

const orderLayoutRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to="./customer-details" relative="path" />
    },
    {
        path: "customer-details",
        Component: OrderCustomerDetails
    },
    {
        path: "overview",
        Component: OrderOverview
    },
    {
        path: "confirmation",
        Component: OrderConfirmation
    }
];

const userLayoutChildren: RouteObject[] = [
    {
        index: true,
        element: <Navigate to="./account" relative="path" />
    },
    {
        path: "account",
        Component: MainUserPage
    }
];

const mainLayoutRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to="./home" relative="path" />
    },
    {
        path: "home",
        Component: HomePage
    },
    {
        path: "tours",
        Component: MainToursPage
    },
    {
        path: "tours/:id",
        Component: ShowTourPage
    },
    {
        path: "admin",
        Component: AdminLayout,
        children: adminLayoutRoutes
    },
    {
        path: "wines",
        Component: WineLayout,
        children: winesLayoutRoutes
    },
    {
        path: "wineries",
        Component: WineryLayout,
        children: wineriesLayoutRoutes
    },
    {
        path: "user",
        Component: UserLayout,
        children: userLayoutChildren
    },
    {
        path: "basket",
        Component: BasketPage
    },
    {
        path: "order",
        Component: OrderLayout,
        children: orderLayoutRoutes
    },
    {
        path: "auth/login",
        Component: LoginPage,
    },
    {
        path: "auth/register",
        Component: RegisterPage
    },
    {
        path: "/my-winery/wines",
        Component: MyWineryWinesPage
    },
    {
        path: "my-winery/orders",
        Component: MyWineryOrdersPage
    },
    {
        path: "/my-winery/tours",
        Component: MyWineryToursPage
    }
];

const routes: RouteObject[] = [
    {
        path: "/",
        Component: MainLayout,
        children: mainLayoutRoutes
    },
    {
        path: "*",
        Component: ErrorsNotFound
    },
    {
        path: 'not-found',
        Component: ErrorsNotFound
    }
];

export default routes;
