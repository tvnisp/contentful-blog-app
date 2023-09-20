import React, { useEffect, useState } from 'react';
import { Note } from '@contentful/f36-components';
import { SidebarAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { createClient } from 'contentful-management';

function extractValues(obj: any, targetKey: string) {
	const values: string[] = [];

	function findValues(obj: any, currentKey: string) {
		for (const key in obj) {
			if (key === targetKey) {
				values.push(obj[key]);
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				findValues(obj[key], currentKey);
			}
		}
	}

	findValues(obj, targetKey);
	return values.join(' ');
}

const Sidebar = () => {
	const [entry, setEntry] = useState<any>();
	const sdk = useSDK<SidebarAppSDK>();

	const fetchEntry = async () => {
		try {
			const entryId = sdk.entry.getSys().id;
			const cma = createClient({ apiAdapter: sdk.cmaAdapter as any });
			const space = await cma.getSpace(sdk.ids.space);
			const environment = await space.getEnvironment(sdk.ids.environment);
			const entry = await environment.getEntry(entryId);
			setEntry(entry);
		} catch (error) {
			console.error('Error fetching blog posts:', error);
		}
	};

	useEffect(() => {
		sdk.window.startAutoResizer();
		fetchEntry();
	}, []);

	const bodyContent = entry?.fields?.body || {};
	const extractedBody = extractValues(bodyContent, 'value');
	const bodyLength = extractedBody.split(' ').length / 200;
	const timeToRead = bodyLength >= 1 ? parseInt(bodyLength.toFixed(0)) : 1;

	return (
		<Note>
			Time To Read: {timeToRead > 1 ? `${timeToRead}mins` : `${timeToRead}min`}
		</Note>
	);
};

export default Sidebar;
