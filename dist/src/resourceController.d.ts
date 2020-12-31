import { AppResourceController, MatchaConfig, Route } from './types';
export default class ResourceController implements AppResourceController {
    matchaConfig: MatchaConfig;
    routes: Route[];
    assets: object;
    constructor(matchaConfig: MatchaConfig);
    getAssetsManifest: () => {};
    getRoutesManifest: () => {};
    getAssets: () => {};
    getRoutes: () => Route[];
    clearRequireCache: (requirePath: string) => void;
    requireAssets: () => void;
    requireRoutes: () => void;
    requireModule: () => void;
}
