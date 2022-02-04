import { useSelector } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';

export const ErrorModule = () => {
    const isOpen = useSelector(({ ui }) => ui.toggleStates.errorModuleIsOpen);
    const errorMes = 'errrorrrr'

    return (
        <Modal isOpen={isOpen}>
            <ModalBody>{errorMes}</ModalBody>
        </Modal>
    );
};