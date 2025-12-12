import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from 'react';

export interface Tab {
    id: string;
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
    component: ReactNode;
    closeable?: boolean;
}

interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string | null;
    addTab: (tab: Omit<Tab, 'id'> & { id?: string }) => void;
    removeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    closeAllTabs: () => void;
    hasTab: (id: string) => boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabs debe ser usado dentro de un TabsProvider');
    }
    return context;
}

interface TabsProviderProps {
    children: ReactNode;
}

export function TabsProvider({ children }: TabsProviderProps) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const generateTabId = useCallback((title: string) => {
        return `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    }, []);

    const addTab = useCallback(
        (tab: Omit<Tab, 'id'> & { id?: string }) => {
            const tabId = tab.id || generateTabId(tab.title);

            setTabs((prevTabs) => {
                // Si la tab ya existe, solo la activamos
                const existingTab = prevTabs.find((t) => t.id === tabId);
                if (existingTab) {
                    setActiveTabId(tabId);
                    return prevTabs;
                }

                // Agregar nueva tab
                const newTab: Tab = {
                    ...tab,
                    id: tabId,
                    closeable: tab.closeable !== false, // Por defecto closeable = true
                };

                setActiveTabId(tabId);
                return [...prevTabs, newTab];
            });
        },
        [generateTabId],
    );

    const removeTab = useCallback(
        (id: string) => {
            setTabs((prevTabs) => {
                const filteredTabs = prevTabs.filter((tab) => tab.id !== id);

                // Si cerramos la tab activa, activar otra
                if (activeTabId === id && filteredTabs.length > 0) {
                    const currentIndex = prevTabs.findIndex(
                        (tab) => tab.id === id,
                    );
                    const newActiveIndex =
                        currentIndex > 0 ? currentIndex - 1 : 0;
                    setActiveTabId(filteredTabs[newActiveIndex]?.id || null);
                } else if (filteredTabs.length === 0) {
                    setActiveTabId(null);
                }

                return filteredTabs;
            });
        },
        [activeTabId],
    );

    const setActiveTab = useCallback((id: string) => {
        setTabs((prevTabs) => {
            const tabExists = prevTabs.some((tab) => tab.id === id);
            if (tabExists) {
                setActiveTabId(id);
            }
            return prevTabs;
        });
    }, []);

    const closeAllTabs = useCallback(() => {
        setTabs([]);
        setActiveTabId(null);
    }, []);

    const hasTab = useCallback(
        (id: string) => {
            return tabs.some((tab) => tab.id === id);
        },
        [tabs],
    );

    const value: TabsContextValue = {
        tabs,
        activeTabId,
        addTab,
        removeTab,
        setActiveTab,
        closeAllTabs,
        hasTab,
    };

    return (
        <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
    );
}
