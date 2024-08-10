import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ConfirmModal = ({ action, message, onClose, open }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			as="div"
			className="relative z-10 focus:outline-none"
		>
			<div className="fixed inset-0 z-50 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-end p-4">
					<DialogPanel
						transition
						className="w-full max-w-sm bg-black rounded-xl bg-primary p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
					>
						<div className="flex flex-col gap-4 p-4 max-w-md">
							<h1 className="text-lg font-semibold text-white">{message}</h1>
							<div className="flex gap-4">
								<button
									className="w-20 bg-button-red px-3 py-2 text-white font-bold rounded-md"
									onClick={action}
								>
									Yes
								</button>
								<button
									className="w-20 bg-button-green px-3 py-2 text-white font-bold rounded-md"
									onClick={onClose}
								>
									No
								</button>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

ConfirmModal.defaultProps = {
	message: "Are you sure?",
};

ConfirmModal.propTypes = {
	message: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	action: PropTypes.func.isRequired,
};

export default ConfirmModal;
