import React from "react";

const IntroHome = () => {
  return (
    <div
      className=" p-md-5 mb-4 text-white rounded  mb-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604147495798-57beb5d6af73?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80')",
        objectFit: "cover",
      }}
    >
      <div className="col-md-6 px-0">
        <h1 className="display-8 font-italic text-white">
          E - Commerce Application By Suwijuk Phathong
        </h1>
        <p className="lead my-3">
          Use Postgresql for database. Features of application consist of
          selling and buying product, checking payment and shipping
        </p>
        <p className="lead mb-0">
          <a target="_blank" href="/user" className="text-white fw-bold">
            see my Profile ...
          </a>
        </p>
      </div>
    </div>
  );
};

export default IntroHome;
