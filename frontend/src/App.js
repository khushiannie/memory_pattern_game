import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Router>
      <Routes>
    <Route path="/" exact element={<Main />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
		</Router>
	);
}

export default App;