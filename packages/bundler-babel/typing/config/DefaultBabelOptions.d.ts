import BabelOptions from './BabelOptions';
declare enum PresetName {
    ENV = "env",
    REACT = "react",
    TYPE_SCRIPT = "typescript"
}
declare enum PluginName {
    TRANSFORM_RUNTIME = "transform-runtime",
    IMPORT = "import",
    AUTO_CSS_MODULES = "auto-css-modules"
}
export { PresetName, PluginName };
declare class DefaultBabelOptions extends BabelOptions {
    constructor();
    initPreset(): void;
    initPlugins(): void;
}
export default DefaultBabelOptions;
