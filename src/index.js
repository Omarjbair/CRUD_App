import React , {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import PostList from "./components/PostList";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./Store/index";
import IndexPage from "./pages/IndexPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AddPost = React.lazy(() => import("./pages/Add"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));

const postParamsHandler = ({params}) => { 
          if(isNaN(params.id)){
            throw new Response("Bad Request", { status: 400 });
          }
          return null ;
        };

const routes = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index: true,
        element: <IndexPage/>
      },
      {
        path: "post",
        element: <PostList/>
      },
      {
        path: "post/add",
        element: <Suspense fallback = "loading..."><AddPost/></Suspense>
      },
      {
        path: "post/:id/edit",
        element: <Suspense fallback = "loading..."><EditPost/></Suspense>,
        loader: postParamsHandler,
      },
      {
        path: "post/:id",
        element: <Suspense fallback = "loading..."><Details/></Suspense>,
        loader : postParamsHandler,  
      },
  ]},
  ]);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
