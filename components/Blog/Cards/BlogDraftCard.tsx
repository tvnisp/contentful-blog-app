import { PageAppSDK } from '@contentful/app-sdk';
import { Button } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';

interface IBlogDraftCardProps {
	id: string;
	slug: string;
	fetchBlogs: () => void;
}

export default function BlogDraftCard(props: IBlogDraftCardProps) {
	const { id, slug, fetchBlogs } = props;
	const sdk = useSDK<PageAppSDK>();

	const handleEditBlog = (id: string) => {
		sdk.navigator
			.openEntry(id, { slideIn: { waitForClose: true } })
			.then(() => fetchBlogs());
	};
	return (
		<div onClick={() => handleEditBlog(id)}>
			<h2 className="text-xl font-semibold">{id}</h2>
			<p className="text-gray-600 mb-2">{slug}</p>
			<Button variant="primary" onClick={() => handleEditBlog(id)}>
				Edit
			</Button>
		</div>
	);
}
