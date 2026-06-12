import { Tiled } from '@blueskyproject/tiled';
export default function TiledDataPage() {

    return (
        <div className="flex flex-col items-center justify-start gap-4 py-4 max-w-96 mx-auto">
            <Tiled apiKey='secret' size='large'/>
        </div>
    );
}