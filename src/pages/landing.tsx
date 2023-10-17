import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// ==============================|| LANDING PAGE ||============================== //

const Landing = () => {

  const history = useNavigate();


  useEffect(() => {
    history('/dashboard/default');
  }, []);
};

export default Landing;
