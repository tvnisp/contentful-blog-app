import { PageAppSDK } from '@contentful/app-sdk';
import { DateTime, Button } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import { createClient } from 'contentful-management';
import { useState, useEffect } from 'react';

export default function BlogCard(props: any) {
	const { sys, fields, fetchBlogs } = props;
	const [imageUrl, setImageUrl] = useState<string | undefined>();
	const sdk = useSDK<PageAppSDK>();

	const locale = 'en-US';
	const title = fields?.title?.[locale] || 'Title Not Available';
	const description =
		fields?.description?.[locale] || 'Description Not Available';
	const category = fields?.category?.[locale] || 'Category Not Available';
	const tags = fields?.tags?.[locale] || [];
	const imageId = fields?.featuredImage?.[locale]?.sys.id;

	const getImageUrl = async () => {
		try {
			const cma = createClient({ apiAdapter: sdk.cmaAdapter as any });
			const space = await cma.getSpace(sdk.ids.space);
			const environment = await space.getEnvironment(sdk.ids.environment);
			const image = await environment.getAsset(imageId);
			const imageUrl = image.fields.file[locale].url;
			setImageUrl(`https:${imageUrl}?w=400&h=250`);
		} catch (error) {
			console.error('Error fetching image', error);
		}
	};

	useEffect(() => {
		getImageUrl();
	}, []);

	const handleEditBlog = (id: string) => {
		sdk.navigator
			.openEntry(id, { slideIn: { waitForClose: true } })
			.then(() => fetchBlogs());
	};
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div style={{ minHeight: '250px' }}>
				<img className="rounded-t-lg" src={imageUrl} />
			</div>
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</h5>
				<DateTime date={sys.createdAt} />
				<p className="my-3 font-normal text-gray-700 dark:text-gray-400">
					{description.length < 130
						? description
						: `${description.slice(0, 130)}...`}
				</p>

				<p className="my-3 font-normal text-gray-700 dark:text-gray-400">
					<b>Category:</b> {category}
				</p>

				<p className="my-3 font-normal text-gray-700 dark:text-gray-400">
					<b>Tags:</b>{' '}
					{tags.map((tag: any, index: number) =>
						index === tags.length - 1 ? `#${tag}` : `#${tag}, `,
					)}
				</p>
				<Button variant="primary" onClick={() => handleEditBlog(sys.id)}>
					Edit
				</Button>
			</div>
		</div>
	);
}
