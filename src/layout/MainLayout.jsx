
import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const MainLayout = () => {


  const { isLoading, isAuthenticated } = useSelector(state => state.auth);
 
  if (isLoading) return <h1>Loading....</h1>

  if (!isAuthenticated) return <Navigate to={"/login"} />






  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe]">
      <Sidebar />
      <Navbar />

      <main className="min-h-screen px-4 pb-8 pt-20 sm:px-6 lg:ml-[240px] lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
