import "./App.css";
import Home from "./Pages/Home/homePage";

// LangProvider est monté dans index.js (niveau racine)
// pour que toutes les routes bénéficient du contexte de langue.
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
