import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout/DefaultLayout";
import "primeicons/primeicons.css"; //icons
import GlobalStyles from "./AppStyled";
import { WaitControlContainer } from "./Components/Controls/WaitControl";
import { ThemeProvider } from "./Context/ThemeContext";
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

require("mini-linq-js");

function App() {
  return (
    <PrimeReactProvider value={{ theme: { preset: Aura } }}>
      <ThemeProvider>
        <WaitControlContainer />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<DefaultLayout />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PrimeReactProvider>
  );
}

export default App;
