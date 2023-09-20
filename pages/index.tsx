import React, { useMemo } from 'react';
import { locations } from '@contentful/app-sdk';
import Sidebar from '@/components/locations/Sidebar';
import Page from '@/components/locations/Page';
import { useSDK } from '@contentful/react-apps-toolkit';

const ComponentLocationSettings = {
	[locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
	[locations.LOCATION_PAGE]: Page,
};

const App = () => {
	const sdk = useSDK();

	const Component = useMemo(() => {
		for (const [location, component] of Object.entries(
			ComponentLocationSettings,
		)) {
			if (sdk.location.is(location)) {
				return component;
			}
		}
	}, [sdk.location]);

	return Component ? <Component /> : null;
};

export default App;
