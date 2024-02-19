import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "@/hooks";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(() => isOpen);
  const ref = useRef<HTMLDivElement | null>(null);
  const modalRootRef = useRef(document.getElementById("modal-root") as HTMLElement);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  useOnClickOutside(ref, handleClose);

  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(true);
    }
  }, [isOpen]);

  if (!isModalOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={ref}>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={handleClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>,
    modalRootRef.current
  );
};

export default Modal;
