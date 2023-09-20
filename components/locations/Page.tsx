import React, { useState, useEffect } from 'react';
import { Heading, Select } from '@contentful/f36-components';
import { FormatBoldIcon } from '@contentful/f36-icons';
import {
	Workbench,
	WorkbenchContent,
	WorkbenchHeader,
	WorkbenchSidebar,
} from '@contentful/f36-workbench';
import { PageAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import {
	createClient,
	Collection,
	Entry,
	EntryProps,
	KeyValueMap,
} from 'contentful-management';
import Button from '../Buttons/Button';
import TabMapper, { TMenuTabs } from '../Blog/TabMapper/TabMapper';
import MenuTabs from '../Blog/MenuTabs/MenuTabs';

type TBlogs = Collection<Entry, EntryProps<KeyValueMap>> | null;
type TOrder = 'ascending' | 'descending';

const Page = () => {
	const sdk = useSDK<PageAppSDK>();
	const [blogPosts, setBlogPosts] = useState<TBlogs>(null);
	const [selectedTab, setSelectedTab] = useState<TMenuTabs>('main');
	const [order, setOrder] = useState<TOrder>('descending');

	const fetchBlogs = async () => {
		try {
			const cma = createClient({ apiAdapter: sdk.cmaAdapter as any });
			const space = await cma.getSpace(sdk.ids.space);
			const environment = await space.getEnvironment(sdk.ids.environment);
			const blogs = await environment.getEntries({ content_type: 'blog' });
			setBlogPosts(blogs);
		} catch (error) {
			console.error('Error fetching blog posts:', error);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handleOrderSelect = (selectedOrder: TOrder) => {
		setOrder(selectedOrder);
	};

	const handleCreateBlog = () => {
		sdk.navigator.openNewEntry('blog', { slideIn: true });
	};

	return (
		<Workbench>
			<WorkbenchHeader
				title={'My Blog Manager'}
				description={'Create and manage your blogs'}
				icon={FormatBoldIcon}
			/>
			<WorkbenchSidebar>
				<div className="flex flex-col gap-2">
					<Button onClick={handleCreateBlog} variant="primary">
						Add New Blog
					</Button>
				</div>
			</WorkbenchSidebar>
			<WorkbenchContent>
				<MenuTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
				<div className="flex justify-between items-center">
					<Heading as="h2" marginTop="spacingM" marginBottom="spacingM">
						{selectedTab === 'main' ? 'Most Recent Blogs' : 'Draft Blogs'}
					</Heading>
					<Select
						onChange={(e) => handleOrderSelect(e.target.value as TOrder)}
						defaultValue="descending"
					>
						<Select.Option value="ascending">Creation day ↑</Select.Option>
						<Select.Option value="descending">Creation day ↓</Select.Option>
					</Select>
				</div>
				<div className="flex items-center justify-center">
					<TabMapper
						selectedTab={selectedTab}
						fetchBlogs={fetchBlogs}
						blogs={blogPosts}
						order={order}
					/>
				</div>
			</WorkbenchContent>
		</Workbench>
	);
};

export default Page;
