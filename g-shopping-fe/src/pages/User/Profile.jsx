import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "./../../components/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Profile = () => {
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
		<section className="flex w-full justify-center items-center pt-[10vh]">
			<form
				onSubmit={submitHandler}
				className="container flex flex-col gap-2 mx-5 sm:w-[40vw] border rounded-lg p-5"
			>
				<h1 className="text-2xl font-semibold mb-4 ">Update Info</h1>
				<div className="w-full">
					<label htmlFor="username" className="block text-sm font-medium ">
						Username
					</label>
					<input
						type="username"
						id="username"
						className="w-full mt-1 p-2 border rounded"
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
						className="w-full mt-1 p-2 border rounded"
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
							className="w-full mt-1 p-2 border rounded"
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
							className="w-full mt-1 p-2 border rounded"
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
					className="flex justify-center mt-4 text-white  px-4 py-2 rounded cursor-pointer my-[1rem]"
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
		</section>
	);
};

export default Profile;
