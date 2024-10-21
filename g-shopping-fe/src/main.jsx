import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "@redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PayPalScriptProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PayPalScriptProvider>
	</Provider>
);
