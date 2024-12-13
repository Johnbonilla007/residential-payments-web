import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout/DefaultLayout";
import "./../src/Helpers/linqExtensions";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primereact/resources/themes/fluent-light/theme.css";
import GlobalStyles from "./AppStyled";
import { WaitControlContainer } from "./Components/Controls/WaitControl";
require("mini-linq-js");

function App() {
  return (
    <>
      <WaitControlContainer />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
