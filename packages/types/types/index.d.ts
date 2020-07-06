import { DevTool } from 'webpack-chain';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
export declare enum BundlerConfigType {
    csr = "csr",
    ssr = "ssr"
}
export declare type IBundlerConfigType = keyof typeof BundlerConfigType;
export declare type WithFalse<T> = {
    [P in keyof T]?: T[P] | false;
};
interface BaseIConfig {
    alias?: {
        [key: string]: string;
    };
    devtool?: DevTool;
    devServer?: WebpackDevServer.Configuration;
    inlineLimit?: boolean | number | string;
    externals?: webpack.ExternalsElement | webpack.ExternalsElement[];
    define?: {
        [key: string]: webpack.DefinePlugin.CodeValueObject;
    };
    ssr?: any;
    hash?: boolean;
    outputPath?: string;
    publicPath?: string;
    [key: string]: any;
}
export declare type IConfig = WithFalse<BaseIConfig>;
export {};
