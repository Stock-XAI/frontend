import { useState } from "react";
import { lightTheme, darkTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import GlobalStyle from "./styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Detail from "./pages/detail";

const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
