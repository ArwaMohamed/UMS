import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteConfirmation(props) {
    console.log(props);
    
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              ConFirm Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are You Sure You Want To Delete {props?.user?.firstName}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button variant="danger" onClick={props.onDelete}>
            Delete
          </Button>
          </Modal.Footer>
        </Modal>
      );
}
