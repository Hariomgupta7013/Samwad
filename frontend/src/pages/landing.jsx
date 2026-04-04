import "../App.css";
import { Link } from "react-router-dom";

export default function landingPage() {
  return (
    <div className="landigPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <button>Login</button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="connectContainer">
          <h1>
            <span style={{ color: "#ff9839" }}>Connect</span> with your loved
            Ones
          </h1>
          <p>Cover a distance by Apna Video Call</p>
          <div className="startedLinks">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>

        <div className="mobileImageContainer">
          <img src="/mobile.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
