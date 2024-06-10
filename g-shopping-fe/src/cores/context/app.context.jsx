import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { decodeToken } from "@helper/decodeToken";

export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_ROLE = "SET_ROLE";

export const AppContext = createContext({
	state: {
		token: null,
		isAuthenticated: false,
		role: "user",
	},
	dispatchAuth: () => {},
});

const getTokenFromUrl = () => {
	const currentUrl = window.location.href;
	const targetUrl = "https://www.orderus.vn/?token=";
	let token = null;
	if (currentUrl.startsWith(targetUrl)) {
		const currentUrl = window.location.href;
		const url = new URL(currentUrl);
		token = url.searchParams.get("token");
		localStorage.setItem("token", token);
	}
	return token;
};

const tokenFromUrl = getTokenFromUrl();
const token =
	tokenFromUrl !== null ? tokenFromUrl : localStorage.getItem("token");

const initialState = {
	token: token,
	isAuthenticated: token !== null,
	role: token !== null ? decodeToken(token).role : "user",
};

const authReducer = (state, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: action.payload,
			};
		case SET_ROLE:
			return {
				...state,
				role: action.payload,
			};
		default:
			return state;
	}
};

const AuthContext = ({ children }) => {
	const [state, dispatchAuth] = useReducer(authReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatchAuth }}>
			{children}
		</AppContext.Provider>
	);
};

export default AuthContext;

AuthContext.propTypes = {
	children: PropTypes.node.isRequired,
};
