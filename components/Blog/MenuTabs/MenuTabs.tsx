import { TMenuTabs } from '../TabMapper/TabMapper';

interface IMenuTabsProps {
  selectedTab: TMenuTabs;
  setSelectedTab: React.Dispatch<React.SetStateAction<TMenuTabs>>;
}
const tabStyles = {
    active: 'text-blue-600 bg-gray-100',
    hover: 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
  };
export default function MenuTabs(props: IMenuTabsProps) {
  const { selectedTab, setSelectedTab } = props;

  

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {['main', 'draft'].map((tab) => (
        <li key={tab} className="mr-2">
          <button
            onClick={() => setSelectedTab(tab as TMenuTabs)}
            className={`inline-block p-4 rounded-t-lg ${
              selectedTab === tab ? tabStyles.active : tabStyles.hover
            }`}
          >
            {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
          </button>
        </li>
      ))}
    </ul>
  );
}
