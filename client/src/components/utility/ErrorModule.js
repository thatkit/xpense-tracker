import { Modal, ModalBody } from 'reactstrap';

export const ErrorModule = ({ isOpen, errorMes }) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalBody>{errorMes}</ModalBody>
        </Modal>
    );
};