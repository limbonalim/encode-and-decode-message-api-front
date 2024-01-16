'use client';
import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Switch,
  TextField,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Grid from '@mui/material/Grid';
import type {IFormData} from '@/types';


const AppForm = () => {
  const [data, setData] = useState<IFormData>({
    encode: '',
    decode: '',
    password: '',
    status: false,
  });
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;
    setData((perv) => {
      return {...perv, [name]: value};
    });
  };

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setData((perv) => {
      return {...perv, status: checked};
    });
  };

  const onSend = () => {
    console.log(data);
  };

  return (
    <>
      <Container>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event)}
          value={data.encode}
          variant="standard"
          name="encode"
          label="encode"
          type="text"
        ></TextField>
        <Grid sx={{marginY: 2}} container spacing={2} alignItems="center">
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                value={data.password}
                onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event)}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={onSend} variant="text">
              <CachedIcon/>
            </Button>
            <FormControlLabel
              control={
                <Switch
                  name="status"
                  value={data.status}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSwitchChange(event)}
                />
              }
              label="encode"
            />
          </Grid>
        </Grid>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event)}
          variant="standard"
          value={data.decode}
          name="decode"
          label="decode"
          type="text"
        ></TextField>
      </Container>
    </>
  );
};

export default AppForm;
