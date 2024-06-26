import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { routes } from "./utilities/constants";


function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      {/*Navbar component is added here*/}
      <Container className="mb-4">
        {" "}
        {/*adding some margin from the top*/}
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
