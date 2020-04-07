interface IRegisterBabelOpts {
    cwd: string;
    only: string[];
}
declare const registerBabel: (opts: IRegisterBabelOpts) => void;
export default registerBabel;
