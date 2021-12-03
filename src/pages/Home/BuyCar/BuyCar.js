import { Button, Grid, TextField, Typography, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const BuyCar = () => {
  const [orderInfo, setOrderInfo] = useState({});
  const { id } = useParams();
  const { user, isLoading } = useAuth();

  const [car, setCar] = useState({})

  useEffect(() => {
    const uri = (`https://safe-tundra-89323.herokuapp.com/car/${id}`)
    fetch(uri)
      .then(res => res.json())
      .then(data => setCar(data))
  }, [id])


  const handleOnSubmit = (e) => {
    e.preventDefault();

    const order = {
      ...orderInfo,
      email: user?.email,
      status: 'pending',
      car

    }
    // console.log(order);
    // send to the server
    fetch('https://safe-tundra-89323.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          alert('Order SuccessFull')
        }
      });
  };


  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newOrderInfo = { ...orderInfo }
    newOrderInfo[field] = value;
    setOrderInfo(newOrderInfo)
    // console.log('newOrderInfo',newOrderInfo);
  }

  // console.log(orderInfo);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>

        {<Card sx={{
          padding: "20px", boxShadow: 3
        }}>
          <CardMedia
            component="img"
            height="70%"
            image={car?.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {car?.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" color="success">
              Model : {car?.model}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Price :  ${car?.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {car?.info}
            </Typography>
          </CardContent>
        </Card>}


      </Grid>

      {/* This is order information ,,,Name Email , Local Address , Phone */}
      <Grid item xs={12} md={6} sx={{ mt: 8 }} >
        <Typography variant="h4" color='#53b57f' gutterBottom component="div">
          Please Give your information
        </Typography>
        {
          !isLoading &&
          <form onSubmit={handleOnSubmit}>

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="product Name"
              name='carName'
              onBlur={handleOnBlur}
              variant="standard"
              defaultValue={car?.name}
              disabled
            />

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="price"
              name='price'
              onBlur={handleOnBlur}
              variant="standard"
              defaultValue={`$${car?.price}`}
              disabled />

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="Your Name"
              name='name'
              onBlur={handleOnBlur}
              defaultValue={user?.displayName}
              variant="standard"
              required
            />

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="Your email"
              name='email'
              onBlur={handleOnBlur}
              defaultValue={user?.email}
              variant="standard"
              required
            />

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="Address"
              name='address'
              onBlur={handleOnBlur}
              type='text'
              variant="standard"
              required />

            <TextField
              sx={{ width: '70%', mt: 2 }}
              id="standard-basic"
              label="Phone"
              name='phone'
              onBlur={handleOnBlur}
              type='text'
              variant="standard"
              required />

            <Button
              sx={{ width: '70%', mt: 2 }}
              type='submit'
              variant="contained"
              color="secondary"
            >CONFIRM Order</Button>

          </form>} {
          isLoading && <CircularProgress />}</Grid>



    </Grid>
  );
};

export default BuyCar;