import { Link } from "react-router-dom";
import "./common.css";
import {
  APPLICATION,
  DASHBOARD,
  ELECTRICITY_BOARD,
  VISUALIZE,
} from "../assets/constants";
function Navbar() {
  return (
    <div className="navbars">
      <nav>
        <div className="logo">{ELECTRICITY_BOARD}</div>
        <ul>
          <Link className="links" to={"/"}>
            {APPLICATION}
          </Link>
          <Link className="links" to={"/charts"}>
            {VISUALIZE}
          </Link>
          <Link className="links" to={"/dashboard"}>
            {DASHBOARD}
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
