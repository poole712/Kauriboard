import "./App.css";

function App() {
  return (
    <>
      <div className="jumbotron align-self-center vh-100">
        <h1>Welcome to KauriTree!</h1>
        <div className="d-flex flex-row p-3 m-3">
          <p className="col-md-6 m-2 fs-3 align-self-center text-start">
            KauriTree is a project planning software focused on collaboration
            and productivity.
          </p>
          <img className="kauriTree m-2" src="./HomePageKauri.jpg" alt="KauriTree" />
        </div>
      </div>
    </>
  );
}

export default App;
