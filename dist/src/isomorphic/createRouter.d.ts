import { Route } from '../types';
declare const createRouter: (routes: Route[]) => (path: string) => Route | null;
export default createRouter;
