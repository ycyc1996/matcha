import React from 'react';
export interface MatchaConfig {
    port: number;
    env: string;
    mode: 'development' | 'production';
    root: string;
    src: string;
    temp: string;
    out: string;
    staticPath: string;
    publicPath: string;
}
export interface ResourceController {
    matchaConfig: MatchaConfig;
    instance: any;
    loadInstance: () => void;
    getInstance: () => void;
}
export interface Route {
    patterns: string[];
    loader: Function;
}
export interface ControllerFactory<ModelState> {
    new (context: any): Controller<ModelState>;
}
export interface Controller<ModelState> {
    ssr: boolean;
    pageId: number;
    context: RequestContext;
    View: React.FC<any>;
    Model: {
        initialState: ModelState;
        actions: {
            [key: string]: ModelAction<ModelState>;
        };
    };
    store: Store<ModelState> | null;
    beforeRender: Function;
    afterRender: Function;
    beforeUnMount: Function;
    [key: string]: any;
}
export interface RequestContext {
    isServer: boolean;
    isClient: boolean;
    location: {
        protocol: string;
        hostname: string;
        baseUrl: string;
        path: string;
        query: object;
    };
    prefetch: {
        state: object;
    };
    req?: any;
}
export interface Store<ModelState> {
    getState: () => ModelState;
    getDispatchers: (...args: any[]) => void;
    replaceState: (nextState: ModelState) => void;
    subscribe: (callback: Function) => Function;
}
export interface Work {
    createTime: Number;
    callback: Function;
}
export declare type ModelAction<ModelState> = (state: ModelState, ...args: any[]) => ModelState;
