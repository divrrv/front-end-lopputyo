import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="firstname"
            value={customer.firstname}
            onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="lastname"
            value={customer.lastname}
            onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="streetaddress"
            value={customer.streetaddress}
            onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="postcode"
            value={customer.postcode}
            onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="city"
            value={customer.city}
            onChange={e => setCustomer({ ...customer, city: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="email"
            value={customer.email}
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="phone"
            value={customer.phone}
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}