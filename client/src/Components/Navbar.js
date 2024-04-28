import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentuser"));
  function logout(){
    localStorage.removeItem("currentuser");
    window.location.href="/login";
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/home">
          <b class="ml-5" style={{marginLeft:"30px" ,fontSize:"30px"}}>Roomie</b>
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-5">
            {user ? (
              <>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginRight:"30px" ,fontSize:"20px"}}>
                      {user.name}
                    </button>
                    <ul class="dropdown-menu" style={{marginRight:"30px"}}>
                      <li><a class="dropdown-item" href="/profile">Profile</a></li>
                      <li><a class="dropdown-item" href="#" onClick={logout}>logout</a></li>
                    </ul>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item active" style={{marginRight:"15px"}}>
                  <a class="nav-link" href="/register">
                  <b>Register</b>
                  </a>
                </li>
                <li class="nav-item"  style={{marginRight:"30px"}}>
                  <a class="nav-link" href="/login">
                    <b>Login</b>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
