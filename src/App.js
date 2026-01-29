import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout/DefaultLayout";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primereact/resources/themes/fluent-light/theme.css";
import GlobalStyles from "./AppStyled";
import { WaitControlContainer } from "./Components/Controls/WaitControl";
import { ThemeProvider } from "./Context/ThemeContext";
require("mini-linq-js");

function App() {
  return (
    <ThemeProvider>
      <WaitControlContainer />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
