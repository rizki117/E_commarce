








import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";

import Navbar from "./pages/Navbar"



import PrivateRoute from "./routes/PrivateRoute";

//Route Private Dashboard 
import Users from "./pages/Users"
import Produk from "./pages/Produk";
import Detail from "./pages/Detail";
//Akhir Route Private Dashboard 


import PublicRoute from "./routes/PublicRoute";

//Route Public Navbar
import Home from "./pages/Home";
import About from "./pages/About";
//Akhir Route Public Navbar




const App = () => {
  return (
    <Routes>
  {/* Semua halaman publik yang ingin pakai Header + Footer */}
<Route element={<Navbar />}>
   <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />  
</Route>        


     <Route element={<PublicRoute />}>
<Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}> 
            
      <Route path="/dashboard" element={<Dashboard />}>
 
<Route index element={<Produk />} />
<Route path="users" element={<Users />} />    
 
<Route path="details" element={<Detail />} />
        </Route>  
        </Route>
</Routes>
  );
};

export default App;
