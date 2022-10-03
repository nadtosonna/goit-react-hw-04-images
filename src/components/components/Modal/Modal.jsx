import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export function Modal({ children, onClose }) {
    
    useEffect(() => {
        
        document.addEventListener('keydown', closeModal);
        return () => {
        document.removeEventListener('keydown', closeModal);
        }
    });

    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            onClose();
        }
    }

    return createPortal(
            <div className={css.overlay} onClick={closeModal}>
                <div className={css.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        );
}