/// <reference types="react" />
import { Controller, ControllerFactory, RequestContext } from '../types';
declare const createApp: (AppCtrlClass: ControllerFactory<any>, context: RequestContext) => Promise<{
    renderView: () => JSX.Element;
    getCtrl: () => Controller<any>;
}>;
export default createApp;
