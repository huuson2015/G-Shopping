import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setIsShowPassword(!isShowPassword);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<section className="flex w-full justify-center items-center pt-[15vh]">
			<form
				onSubmit={submitHandler}
				className="container flex flex-col gap-2 mx-5 sm:w-[40vw] border border-dark-linebase rounded-lg p-5"
			>
				<h1 className="text-2xl font-semibold mb-4 ">Sign In</h1>

				<div className="w-full">
					<label htmlFor="email" className="block text-sm font-medium ">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						className="w-full border-dark-linebase mt-1 p-2 border rounded"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="w-full">
					<label htmlFor="password" className="block text-sm font-medium ">
						Password
					</label>
					<div className="relative">
						<input
							type={isShowPassword ? "text" : "password"}
							id="password"
							className="w-full mt-1 p-2 border border-dark-linebase rounded"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{isShowPassword ? (
							<div
								className="absolute  py-4 px-2 right-0 top-0  hover:cursor-pointer"
								onClick={toggleShowPassword}
							>
								<AiFillEyeInvisible className="text-textdark" size={20} />
							</div>
						) : (
							<div
								className="absolute py-4 px-2 right-0 top-0 hover:cursor-pointer"
								onClick={toggleShowPassword}
							>
								<AiOutlineEye className="text-textdark" size={20} />
							</div>
						)}
					</div>
				</div>
				<p className="text-sm font-medium">
					New Customer?{" "}
					<Link
						to={redirect ? `/register?redirect=${redirect}` : "/register"}
						className="text-primary hover:underline"
					>
						Register
					</Link>
				</p>
				<button
					disabled={isLoading}
					type="submit"
					className="bg-dark-bg2 flex justify-center mt-4 text-white  px-4 py-2 rounded cursor-pointer my-[1rem]"
				>
					{isLoading ? (
						<div className="h-6 w-6">
							<Loader />
						</div>
					) : (
						"Sign In"
					)}
				</button>
			</form>
		</section>
	);
};

export default Login;
