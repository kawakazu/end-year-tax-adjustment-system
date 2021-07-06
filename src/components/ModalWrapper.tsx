import * as React from  'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Filter1SharpIcon from '@material-ui/icons/Filter1Sharp';

type Props = {
    name: string;
    body: React.ReactElement;
}

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyle = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }),
);

export default function ModalWrapper(props: Props) {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = props.body;

    return (
        <div>
            <Button
                variant="contained"
                size='medium'
                color="secondary"
                startIcon={<Filter1SharpIcon />}
                onClick={handleOpen}
            >
                {props.name}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {props.body}
            </Modal>
        </div>
    );
}