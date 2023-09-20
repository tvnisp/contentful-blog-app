import { MouseEventHandler } from 'react';

interface IButtonProps {
	variant: 'primary';
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: React.PropsWithChildren<IButtonProps>) {
	const { variant, onClick, children } = props;

	if (variant === 'primary')
		return (
			<button
				onClick={onClick}
				type="button"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>
				{children}
			</button>
		);

	return null;
}
