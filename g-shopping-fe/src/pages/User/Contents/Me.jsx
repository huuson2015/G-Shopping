import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "@redux/api/userApiSlice";
import { setCredentials } from "@redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "@components/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";

const Me = () => {
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

	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading: loadingUpdateProfile }] =
		useProfileMutation();

	useEffect(() => {
		setUsername(userInfo.username);
		setEmail(userInfo.email);
	}, [userInfo.email, userInfo.username]);

	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					username,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated successfully");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};
	return (
		<form onSubmit={submitHandler} className="flex flex-col gap-2 p-5">
			<div className="flex gap-2 items-center">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">
					Update Informations
				</h2>
			</div>
			<div className="w-full">
				<label htmlFor="username" className="block text-sm font-medium ">
					Username
				</label>
				<input
					type="username"
					id="username"
					className="mt-1 w-full py-2 px-5 input-primary"
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
					className="mt-1 w-full py-2 px-5 input-primary"
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
						className="mt-1 w-full py-2 px-5 input-primary"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{isShowPassword ? (
						<div
							className="absolute  py-4 px-2 right-0 top-0  hover:cursor-pointer"
							onClick={toggleShowPassword}
						>
							<AiFillEyeInvisible className="" size={20} />
						</div>
					) : (
						<div
							className="absolute py-4 px-2 right-0 top-0 hover:cursor-pointer"
							onClick={toggleShowPassword}
						>
							<AiOutlineEye className="" size={20} />
						</div>
					)}
				</div>
			</div>
			<div className="w-full">
				<label htmlFor="confirmPassword" className="block text-sm font-medium ">
					Confirm Password
				</label>
				<div className="relative">
					<input
						type={`${isShowConfirmPassword ? "text" : "password"}`}
						id="confirmPassword"
						className="mt-1 w-full py-2 px-5 input-primary"
						placeholder="Enter confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{isShowConfirmPassword ? (
						<div
							className="absolute  py-4 px-2 right-0 top-0  hover:cursor-pointer"
							onClick={toggleShowConfirmPassword}
						>
							<AiFillEyeInvisible className="" size={20} />
						</div>
					) : (
						<div
							className="absolute py-4 px-2 right-0 top-0 hover:cursor-pointer"
							onClick={toggleShowConfirmPassword}
						>
							<AiOutlineEye className="" size={20} />
						</div>
					)}
				</div>
			</div>
			<button
				disabled={loadingUpdateProfile}
				type="submit"
				className="flex justify-center mt-4 text-white bg-button-red  px-4 py-2 rounded cursor-pointer my-[1rem]"
			>
				{loadingUpdateProfile ? (
					<div className="h-6 w-6">
						<Loader />
					</div>
				) : (
					"Update"
				)}
			</button>
		</form>
	);
};

export default Me;
