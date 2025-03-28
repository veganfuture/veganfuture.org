import { useState } from "react";

export type TabProps = {
  title: string;
}

export type TabsProps = {
  tabs: Array<TabProps>;
  initialActiveTab?: number;
  onActiveTabChange?: (idx: number) => void,
}

export function Tabs({ tabs, onActiveTabChange, initialActiveTab }: TabsProps) {
  const [activeTabState, setActiveTabState] = useState(initialActiveTab);

  const setActiveTab = (idx: number) => {
    setActiveTabState(idx);
    if (onActiveTabChange) onActiveTabChange(idx);
  }

  return <div className="text-sm font-medium text-center border-b text-gray-600 border-gray-400">
    <ul className="flex flex-wrap -mb-px">
      {tabs.map(({ title }, idx) => {
        const isActive = idx === activeTabState;
        return (
          <li key={idx} className="me-2">
            <a
              href="#"
              onClick={isActive ? undefined : () => setActiveTab(idx)}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "inline-block p-4 text-green-800 rounded-t-lg active"
                  : "inline-block p-4 no-underline hover:underline hover:text-gray-800 hover:border-gray-300"
              }
            >
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  </div>;
}
