import BabelOptions from "./BabelOptions";
declare const opts: BabelOptions;
declare enum PresetName {
    ENV = "env",
    REACT = "react",
    TYPE_SCRIPT = "typescript"
}
declare enum PluginName {
    PROPOSAL_EXPORT_DEFAULT_FROM = "proposal-export-default-from",
    PROPOSAL_EXPORT_NAMESPACE_FROM = "proposal-export-namespace-from",
    PROPOSAL_DO_EXPRESSIONS = "proposal-do-expressions",
    PROPOSAL_OPTIONAL_CHAINING = "proposal-optional-chaining",
    PROPOSAL_DECORATORS = "proposal-decorators",
    PROPOSAL_CLASS_PROPERTIES = "proposal-class-properties",
    TRANSFORM_RUNTIME = "transform-runtime",
    IMPORT = "import"
}
export { PresetName, PluginName };
export default opts;
