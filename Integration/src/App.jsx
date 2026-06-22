import React from 'react';
import axios from 'axios';
import { axiosInstance } from './config/axiosInstance';

const App = () => {

  const getData = async () => {
    try {
      const res = await axiosInstance.get('/products');

      console.log("this is ui app --->", res);
    } catch (error) {
      console.log("error in api", error);
    }
  }

  getData();

  return (
    <div>
      <h1>Hey... cohort 2.0 ganggggg...</h1>
    </div>
  )
}

export default App