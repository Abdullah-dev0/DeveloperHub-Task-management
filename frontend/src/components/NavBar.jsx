const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
      <div className="container">
        <a className="navbar-brand d-flex align-content-center gap-2" href="/">
          <img
            src="/icon.png"
            alt="Task Management"
            style={{ width: "30px", height: "30px" }}
          />
          <h1 className="fs-4 text-uppercase text-white">Task Management</h1>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
