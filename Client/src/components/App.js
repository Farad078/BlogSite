import React from "react";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import SignUp from "./SignUp";
import Card from "./Card";
import Home from "./pages/Home";
import BlogInfo from "./pages/BlogInfo";
import WriteBlog from "./pages/WriteBlog";
import About from "./About";
import BlogLayout from "./Layouts/BlogLayout";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,400;0,500;1,200;1,300&family=Grandiflora+One&family=Lora:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@200;400&family=Mooli&family=Neucha&display=swap');
</style>;
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogInfo />} />
          {/* <Route path="/write" element= {<WriteBlog />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
