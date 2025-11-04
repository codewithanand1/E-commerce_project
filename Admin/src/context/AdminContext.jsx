import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { serverurl } from '../main';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [admindata, setAdmindata] = useState(null);

  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverurl}/api/auth/getadmin`, { withCredentials: true });
      setAdmindata(result.data);
      console.log(result.data);
    } catch (error) {
      setAdmindata(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = {
    admindata,
    setAdmindata,
    getAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
