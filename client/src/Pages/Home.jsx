import React from "react";
import Banner from "../components/Banner";
import Content from "../components/Content";
import PostNav from "../components/PostNav";
const Home = () => {
  return (
    <div>
      <Banner />
      <PostNav />
      <Content />
    </div>
  );
};

export default Home;
