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

