
import { useState } from 'react';
import GlobalState from '../store/GlobalState';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FormService = observer(({ service }) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = (name) => /^[a-zA-Z]+$/.test(name);

  const postAppointment = async (data) => {
    try {
      const res = await fetch('http://localhost:8787/appointment', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        GlobalState.addAppointment(data);
        handleClose();

      } else if (res.status === 400) {
        alert("Invalid date and time. Please enter valid data.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    if (!isValidPhone(data.clientPhone)) {
      alert("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    if (!isValidEmail(data.clientEmail)) {
      alert("Invalid email address. Please enter a valid email.");
      return;
    }

    if (!isValidName(data.clientName)) {
      alert("Invalid client name. Please enter letters only.");
      return;
    }

    postAppointment(data);
  };

  const renderTextField = (name, label, type = "text", validation, errorMsg) => (
    <TextField
      {...register(name, { required: true, validate: validation })}
      label={label}
      type={type}
      variant="filled"
      fullWidth
      margin="normal"
      error={!!errors[name]}
      helperText={errors[name] && errorMsg}
    />
  );

  return (
    <>
     {!GlobalState.isAdmin && (
        <Button variant="outlined" onClick={handleOpen}>
Add Appointment       </Button>
      )}
      <div>
        <p>Id: {service.id}</p>
        <p>Name: {service.name}</p>
        <p>Description: {service.description}</p>
        <p>Duration: {service.duration}</p>
        <p>Price: {service.price}</p>
      </div>

     

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <InputLabel htmlFor="serviceType">Service Type</InputLabel>
                <Controller
                  name="serviceType"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label="Service Type">
                      {GlobalState.services.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.serviceType && <p>Please select a Service Type</p>}
              </FormControl>
              {renderTextField("id", "Id", "number", null, "Please enter a number")}
              {renderTextField("dateTime", "Date and Time", "datetime-local", null, "Please enter a valid date and time")}
              {renderTextField("clientName", "Client Name", "text", isValidName, "Please enter letters only")}
              {renderTextField("clientPhone", "Client Phone", "tel", isValidPhone, "Please enter a 10-digit number")}
              {renderTextField("clientEmail", "Client Email", "email", isValidEmail, "Please enter a valid email")}
              <Button type="submit">Save</Button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default FormService;
