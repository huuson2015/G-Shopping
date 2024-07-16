import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => {
		setIsShowPassword(!isShowPassword);
	};

	const toggleShowConfirmPassword = () => {
		setIsShowConfirmPassword(!isShowConfirmPassword);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

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

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await register({ username, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
				toast.success("User successfully registered");
			} catch (err) {
				console.log(err);
				toast.error(err.data.message);
			}
		}
	};
	return (
		<section className="flex w-full justify-center items-center pt-[10vh]">
			<form
				onSubmit={submitHandler}
				className="container flex flex-col gap-2 mx-5 sm:w-[40vw] border border-dark-linebase rounded-lg p-5"
			>
				<h1 className="text-2xl font-semibold mb-4 ">Sign Up</h1>
				<div className="w-full">
					<label htmlFor="username" className="block text-sm font-medium ">
						Username
					</label>
					<input
						type="username"
						id="username"
						className="w-full border-dark-linebase mt-1 p-2 border rounded"
						placeholder="Enter username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
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
							type={`${isShowPassword ? "text" : "password"}`}
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
				<div className="w-full">
					<label
						htmlFor="confirmPassword"
						className="block text-sm font-medium "
					>
						Confirm Password
					</label>
					<div className="relative">
						<input
							type={`${isShowConfirmPassword ? "text" : "password"}`}
							id="confirmPassword"
							className="w-full mt-1 p-2 border border-dark-linebase rounded"
							placeholder="Enter confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{isShowConfirmPassword ? (
							<div
								className="absolute  py-4 px-2 right-0 top-0  hover:cursor-pointer"
								onClick={toggleShowConfirmPassword}
							>
								<AiFillEyeInvisible className="text-textdark" size={20} />
							</div>
						) : (
							<div
								className="absolute py-4 px-2 right-0 top-0 hover:cursor-pointer"
								onClick={toggleShowConfirmPassword}
							>
								<AiOutlineEye className="text-textdark" size={20} />
							</div>
						)}
					</div>
				</div>
				<p className="text-sm font-medium">
					Old Customer?{" "}
					<Link
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
						className="text-primary hover:underline"
					>
						Login
					</Link>
				</p>
				{isLoading ? (
					<div className="h-6 w-6">
						<Loader />
					</div>
				) : (
					"Register"
				)}
			</form>
		</section>
	);
};

export default Register;
