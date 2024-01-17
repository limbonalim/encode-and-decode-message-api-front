'use client';
import React, { useState } from 'react';
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Grid from '@mui/material/Grid';
import { useMutation } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import type { IApiAnswer, IApiData, IFormData, IMessage } from '@/types';


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
    event: React.ChangeEvent<HTMLInputElement>,
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
        <Grid sx={{padding: 2}} container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              onChange={onChange}
              value={formData.encode}
              multiline
              rows={3}
              name="encode"
              label="Encode"
              type="text"
            />
            <Grid sx={{marginY: 2}} container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  value={formData.password}
                  onChange={onChange}
                  required
                  id="password"
                  name="password"
                  label="Password"
                />
              </Grid>
              <Grid item>
                <Button
                  sx={{marginX: 2}}
                  type="submit"
                  variant="contained"
                  disabled={mutation.isPending}
                >
                  <CachedIcon/>
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      name="status"
                      value={formData.status}
                      onChange={onSwitchChange}
                    />
                  }
                  label="encode"
                />
              </Grid>
            </Grid>
            <TextField
              onChange={onChange}
              value={formData.decode}
              multiline
              rows={3}
              name="decode"
              label="decode"
              type="text"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AppForm;
