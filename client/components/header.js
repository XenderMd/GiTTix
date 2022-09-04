import Link from "next/link";

const header = ({ currentUser }) => {
    console.log(currentUser)
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">GiTTix</a>
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
            {currentUser ? "Sign out" : "Sign in/up"}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default header;
