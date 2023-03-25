import React from 'react';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';

export const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
};