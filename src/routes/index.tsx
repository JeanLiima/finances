import { Loading } from '@/components/loading';
import { useAuth } from '@/hooks/auth';

import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';

const Routes = () =>{
  const { isLoading, isSigned }= useAuth();

  if (isLoading) {
	return (
		<Loading />
	);
  }

  return (
    isSigned ? <PrivateRoutes/> : <PublicRoutes/>
  )
}

export default Routes;
