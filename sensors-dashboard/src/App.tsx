import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import { SensorDataProvider } from "./context/SensorDataContext";
import Home from "./pages/Home/Home";
import Sensor1 from "./pages/Sensor1/Sensor1";
import Sensor2 from "./pages/Sensor2/Sensor2";

const App = () => {
  return (
    <SensorDataProvider>
      <Router>
        <div className={styles.app}>
          <Sidebar />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sensor1" element={<Sensor1 />} />
              <Route path="/sensor2" element={<Sensor2 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SensorDataProvider>
  );
};

export default App;
