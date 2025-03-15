import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => { document.body.style.overflow = ''; };
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="modal-open modal" onClick={onClose}>
			<div className="modal-content" onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
