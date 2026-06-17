import { TiledHeatmapSelector } from 'react-vite-library';
import { useTiledApiUrls } from '@/utils/apiUtils';
export default function HeatmapPage() {
    const { httpBaseUrl } = useTiledApiUrls();
    return (
        <section className="w-full">

            <TiledHeatmapSelector tiledBaseUrl={httpBaseUrl} />
        </section>
    );
}