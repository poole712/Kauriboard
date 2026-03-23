import { Link } from "react-router";
import "./App.css";

function App() {

  return (
    <>
      <div className="kauriJumbotron p-3">
        <h1>Welcome to KauriBoard!</h1>
        <div className="aboutKauriTree" >
          <div className="aboutKauriText">
            <h3 className="mb-3">What is KauriBoard?</h3>
            <p className="fs-5 align-self-center ">
              KauriBoard is a project planning software focused on collaboration
              and productivity. Manage all your projects and projects tasks in a simple board layout.
              <br></br>
              <br></br>
              Allocate tasks to different users as well as organising them in a simple 3 board (branch) system which
              results in a easy to learn and master interface.
            </p>
            <Link className="btn btn-primary mt-4" to={'/pages/Projects'}>Get Planning!</Link>
          </div>
          <img className="kauriTree" src="./HomePageKauri.jpg" alt="KauriTree" />
        </div>

        <div className="aboutKauriTree" >
          <div className="aboutKauriText">
            <h3 className="mb-3">More about/from me</h3>
            <p className="fs-5 align-self-center ">
              My name is Fletcher Poole and I am based in Auckland, New Zealand. I have a strong passion
              for Game and Web Development. In 2025 I completed a degree in Computer Science, Majoring in Software Development
              at Auckland University of Technology (AUT).
              <br></br>
              <br></br>
              Below are links to my Portfolios, GitHub as well as my contact details. Thanks for checking out KauriBoard!
            </p>
            <div className="pt-2">
              <a className="btn btn-primary m-1" target="_blank" href="https://github.com/poole712?tab=repositories">GitHub<i className="bi bi-github px-1"></i></a>
              <a className="btn btn-primary m-1" target="_blank" href="https://fletchersgamedesign.com/">Game Portfolio<i className="bi bi-joystick px-1"></i></a>
              <a className="btn btn-primary m-1" target="_blank" href="https://portfolio-opal-rho-82.vercel.app/">Web Portfolio<i className="bi bi-globe2 px-1"></i></a>
            </div>
          </div>
          <img className="profilePhoto" src="./Me.png" alt="Me" />
        </div>

      </div>
    </>
  );
}

export default App;
