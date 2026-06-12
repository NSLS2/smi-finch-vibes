import './App.css';
import '@blueskyproject/tiled/style.css';

import { FinchConfigProvider } from './FinchConfigProvider';
import TiledDataPage from './pages/TiledDataPage';
import TiledPlotMakerPage from './pages/TiledPlotMakerPage';
import HeatmapPage from './pages/HeatmapPage';
import Documentation from './pages/Documentation';

import HubAppLayout from '@/components/HubAppLayout';

import { RouteItem } from '@/types/navigationRouterTypes';

import { ChartLine, Table, ChartScatter, Question } from '@phosphor-icons/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import bnlLogo from './images/bnl_logo.png';
const queryClient = new QueryClient();

function App() {
    const routes: RouteItem[] = [
        {
            element: <TiledDataPage />, 
            path: '/tiled-data', 
            label: 'Data', 
            icon: <Table size={32} />,
            isBackgroundTransparent: true
        },
        {element: <TiledPlotMakerPage />, 
            path: '/tiled-plot-maker', 
            label: 'Plot Maker',
             icon: <ChartLine size={32} />,
             isBackgroundTransparent: true
            },
        {
            element: <HeatmapPage />,
            path: '/heatmap',
            label: 'Heatmap',
            icon: <ChartScatter size={32} />,
            isBackgroundTransparent: true
        },
        {
            element: <Documentation />,
            path: '/documentation',
            label: 'Help',
            icon: <Question size={32} />,
        },
    ];
    return (
        <FinchConfigProvider
            config={{
                tiledApiUrl: import.meta.env.VITE_TILED_API_URL,
                tiledApiKey: 'secret',
                ophydApiUrl: import.meta.env.VITE_OPHYD_API_URL,
                qServerApiUrl: import.meta.env.VITE_QSERVER_API_URL,
                qServerApiKey: import.meta.env.VITE_QSERVER_API_KEY,
                finchApiUrl: import.meta.env.VITE_FINCH_API_URL,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <HubAppLayout
                    routes={routes}
                    headerTitle="SMI Finch Vibes"
                    headerLogoUrl={'/images/bnlLogoCube.png'}
                />
            </QueryClientProvider>
        </FinchConfigProvider>
    );
}

export default App;
