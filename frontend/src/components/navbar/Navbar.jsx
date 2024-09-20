import { useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        <div className="navItems">
          {
            !user ?
                  (<>
                    <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                      <button className="navButton">Register</button>
                    </Link>
                    <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                      <button className="navButton">Login</button>
                    </Link>
                  </>)

            : 
                  (<>
                    <div className="user">
                      <FontAwesomeIcon icon={faUser} />
                      <span id="userName">{ user.username}</span>
                    </div>
                  </>
                  )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar