import TiledLinePlotMaker from '@/features/TiledLinePlotMaker';
import { useTiledApiUrls } from '@/utils/apiUtils';
export default function TiledPlotMakerPage() {
    const { httpBaseUrl } = useTiledApiUrls();
    return (
        <TiledLinePlotMaker tiledBaseUrl={httpBaseUrl} />
    );
}