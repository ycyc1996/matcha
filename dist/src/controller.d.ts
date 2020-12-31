import { ResourceController, MatchaConfig, Route } from './types';
import createRouter from './isomorphic/createRouter';
export declare class BaseResourceController implements ResourceController {
    matchaConfig: MatchaConfig;
    instance: any;
    constructor(matchaConfig: MatchaConfig);
    loadInstance: () => void;
    getInstance: () => any;
    clearRequireCache: (requirePath: string) => void;
}
export declare class RouterController extends BaseResourceController {
    instance: ReturnType<typeof createRouter>;
    constructor(matchaConfig: MatchaConfig);
    loadInstance: () => void;
    getRoutes: () => Route[];
}
export declare class AssetsController extends BaseResourceController {
    instance: object;
    constructor(matchaConfig: MatchaConfig);
    loadInstance: () => void;
    getAssetsManifest: () => {};
}
