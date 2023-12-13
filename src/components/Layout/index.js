import React from "react";
import { Dropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const logoCompany = localStorage.getItem("logo_company");

  return (
    <div>
      <div className="header d-flex p-3 border shadow rounded-3">
        {/* <img
          className="my-auto p-1"
          alt=""
          src={logo}
          width="auto"
          height={55}
        ></img>
        <div className="mx-3 fw-bold vr"></div> */}
        <img
          className="my-auto p-1"
          alt=""
          src={logoCompany}
          width="auto"
          height={37}
        ></img>
        <div className="d-flex justify-content-end mt-2 ms-auto">
          <Dropdown>
            <Dropdown.Toggle className="d-flex" variant="none">
              <i class="far fa-user-circle fs-4"></i>
              <span className="ms-2">{name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/login");
                  localStorage.clear();
                }}
              >
                Keluar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {children} <Outlet />
    </div>
  );
};

export default Layout;
