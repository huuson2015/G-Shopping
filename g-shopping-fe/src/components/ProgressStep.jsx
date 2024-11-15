import { PropTypes } from "prop-types";
import { HiMiniCheckCircle } from "react-icons/hi2";

const ProgressStep = ({ step1, step2, step3 }) => {
	return (
		<div className="flex justify-center items-center ">
			<div
				className={`flex gap-2 justify-center items-center ${
					step1 ? "text-green-500" : "text-gray-300"
				}`}
			>
				<span>Login</span>
				<HiMiniCheckCircle className={`${step1 ? "" : ""}`} size={30} />
			</div>

			{step2 && (
				<>
					{step1 && (
						<div className="h-0.5 w-10 md:w-[10rem] bg-green-500"></div>
					)}
					<div
						className={`flex gap-2 justify-center items-center ${
							step1 ? "text-green-500" : "text-gray-300"
						}`}
					>
						<span>Shipping</span>
						<HiMiniCheckCircle size={30} />
					</div>
				</>
			)}

			<>
				{step1 && step2 && step3 ? (
					<div className="h-0.5 w-[10rem] bg-green-500"></div>
				) : (
					""
				)}

				<div
					className={`flex gap-2 justify-center items-center ${
						step3 ? "text-green-500" : "text-gray-300"
					}`}
				>
					<span className={` ${!step3 ? "ml-5 md:ml-[10rem]" : ""}`}>
						Summary
					</span>
					{step1 && step2 && step3 ? (
						<div className="mt-2 text-lg text-center">
							<HiMiniCheckCircle size={30} />
						</div>
					) : (
						""
					)}
				</div>
			</>
		</div>
	);
};

ProgressStep.propTypes = {
	step1: PropTypes.bool,
	step2: PropTypes.bool,
	step3: PropTypes.bool,
};

export default ProgressStep;
