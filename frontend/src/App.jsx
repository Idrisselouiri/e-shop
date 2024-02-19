import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//pages
import { Home, Login, Signin, CreateListing } from "./routes/Route.js";
//layouts
import RootLayout from "./layouts/RootLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/profile/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<Profile />} />
      </Route>
      <Route path="/create-listing" element={<CreateListing />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
