import React from 'react'

export interface AppConfig {
  port: number;
  env: string;
  mode: 'development' | 'production';
  root: string;
  src: string;
  out: string;
  publish: string;
  staticPath: string;
  publicPath: string;
}

export interface Route {
  patterns: string[];
  loader: Function;
}

export interface ControllerFactory<ModelState> {
  new (context: any): Controller<ModelState>
}

export interface Controller<ModelState> {
  ssr: boolean;
  pageId: number;
  View: React.FC<any>;

  Model: {
    initialState: ModelState;
    actions: {
      [key: string]: ModelAction<ModelState>
    }
  }

  store: Store<ModelState> | null
  beforeRender: Function;
  afterRender: Function;
  beforeUnMount: Function;

  [key: string]: any;
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

// export type Dispacher<ModelState> = (...args: any[]) => void;

export type ModelAction<ModelState> = (state: ModelState, ...args: any[]) => ModelState
