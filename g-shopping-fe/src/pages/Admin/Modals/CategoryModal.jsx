import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import PropTypes from "prop-types";

const CategoryModal = ({
	title,
	value,
	setValue,
	handleSubmit,
	onClose,
	open,
}) => {
	return (
		<Dialog
			open={open}
			onClose={() => onClose()}
			as="div"
			className="relative z-40 focus:outline-none"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/20 duration-300 ease-out data-[closed]:opacity-0"
			/>
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel
					transition
					className="w-full max-w-sm bg-white rounded-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
				>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 p-4 max-w-md"
					>
						<h1 className="text-xl font-medium text-primary-dark">{title}</h1>
						<input
							type="text"
							className="w-full px-5 py-2 input-primary"
							placeholder="Category name"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						<div className="flex gap-4">
							<button
								className="w-1/2 bg-button-red hover:bg-button-hover1 px-3 py-2 text-white font-bold rounded-md"
								type="submit"
							>
								Save
							</button>
							<button
								className="w-1/2 bg-button-green hover:bg-button-hover2 px-3 py-2 text-white font-bold rounded-md"
								type="button"
								onClick={onClose}
							>
								Cancel
							</button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

CategoryModal.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string,
	setValue: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default CategoryModal;
