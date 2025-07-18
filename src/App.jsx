import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { loadUser } from "./features/auth/authSlice";
import Students from "./pages/Students";
import Staffs from "./pages/Staffs";
import { Toaster } from "react-hot-toast";
import { setupInterceptors } from "./utils/setupInterceptors";
import { store } from "./app/appStore.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    setupInterceptors(store); 
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/staffs" element={<Staffs />} />
        </Route>
        <Route
          path="*"
          element={<div className="p-6 text-center">Page Not Found</div>}
        />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
