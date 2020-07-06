export interface ReactOptions {
    /**
     * @description Replace the function used when compiling JSX expressions
     * @default React.createElement
     */
    pragma?: string;
    /**
     * @description Replace the component used when compiling JSX fragments
     * @default React.Fragment
     */
    pragmaFrag?: string;
    /**
     * @description Will use the native built-in instead of trying to polyfill
     * behavior for any plugins that require one
     * @default false
     */
    useBuiltIns?: boolean;
    /**
     * @description When spreading props, use inline object with spread elements
     * directly instead of Babel's extend helper or Object.assign
     * @default false
     */
    useSpread?: boolean;
    /**
     * @description Toggles plugins that aid in development, such as @babel/plugin-transform-react-jsx-self
     * and @babel/plugin-transform-react-jsx-source.
     * @default false
     */
    development?: boolean;
    /**
     * @description Toggles whether or not to throw an error if a XML namespaced tag name is used
     * @default true
     */
    throwIfNamespace?: boolean;
}
