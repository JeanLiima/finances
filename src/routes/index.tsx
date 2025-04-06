import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '@/hooks/auth';

import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';

function Routes(){
  const { isLoading, isSigned }= useAuth();

  if(isLoading)(
		<View 
			style={{
				flex:1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#F0F4FF'
			}}
		>
			<ActivityIndicator size="large" color="#131313" />
		</View>
  );

  return (
    isSigned ? <PrivateRoutes/> : <PublicRoutes/>
  )
}

export default Routes;
