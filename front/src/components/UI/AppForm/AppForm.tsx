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
import {useMutation} from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import type {IApiAnswer, IApiData, IFormData, IMessage} from '@/types';


const AppForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    encode: '',
    decode: '',
    password: '',
    status: false,
  });

  const mutation = useMutation({
    mutationFn: (data: IApiData) => axiosApi.post<IApiAnswer>(data.url, data.message),
    onSuccess: (data) => {
      const answer = data.data;
      if (answer.encoded) {
        setFormData((prev) => {
          return {
            ...prev,
            decode: answer.encoded ? answer.encoded : ''
          };
        });
      } else if (answer.decoded) {
        setFormData((prev) => {
          return {
            ...prev,
            encode: answer.decoded ? answer.decoded : ''
          };
        });

      }
    }
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;
    setFormData((perv) => {
      return {...perv, [name]: value};
    });
  };

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setFormData((perv) => {
      return {...perv, status: checked};
    });
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url: string = formData.status ? '/decode' : '/encode';
    const message: IMessage = {
      password: formData.password,
      message: formData.status ? formData.decode : formData.encode,
    };
    const data: IApiData = {
      url: url,
      message: message
    };
    mutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={onSend}>
        <Container>
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event)}
            value={formData.encode}
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
                  required
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="text">
                <CachedIcon/>
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    name="status"
                    value={formData.status}
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
            value={formData.decode}
            name="decode"
            label="decode"
            type="text"
          ></TextField>
        </Container>
      </form>
    </>
  );
};

export default AppForm;
