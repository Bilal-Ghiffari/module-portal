'use client';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/on-progress', { replace: true });
  }, [navigate]);

  return null; // atau <div>Redirecting...</div> jika perlu
};

export default Page;
