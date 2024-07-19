import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ConfirmModal = ({ action, message, onClose, open }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogPanel>
				<div className="flex flex-col gap-4 p-4 border max-w-md">
					<h1 className="text-xl font-semibold">{message}</h1>
					<div className="flex gap-4">
						<button className="btn btn-error" onClick={action}>
							Yes
						</button>
						<button onClick={onClose} className="btn btn-primary">
							No
						</button>
					</div>
				</div>
			</DialogPanel>
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
