import Babel, { PluginObj, PluginPass } from '@babel/core';
import { NodePath, Visitor } from '@babel/traverse';
import t from '@babel/types';
import { extname } from 'path';

export interface AutoCssModulesOptions {
  /**
   * @description
   * @see https://webpack.js.org/configuration/module/#ruleresourcequery
   */
  query?: string;
  /**
   * @description 匹配的文件扩展名
   * @default ['.css', '.less', '.sass', '.scss', '.stylus', '.styl']
   */
  exts?: Array<string>;
}

interface AutoCssModulesState extends PluginPass {
  opts: AutoCssModulesOptions;
}

type BabelPluginFn<State = PluginPass> = (
  babel: typeof Babel,
  opts: object | undefined,
  filename: string,
) => PluginObj<State>;

const CSS_EXT_NAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];

const autoCssModulesPlugin: BabelPluginFn<AutoCssModulesState> = () => {
  return {
    name: 'auto-css-modules',
    visitor: {
      ImportDeclaration(path: NodePath<t.ImportDeclaration>, { opts }: AutoCssModulesState) {
        const {
          specifiers,
          source,
          source: { value },
        } = path.node as t.ImportDeclaration;
        if (specifiers.length && (opts.exts || CSS_EXT_NAMES).includes(extname(value))) {
          source.value = `${value}?${opts.query || 'modules'}`;
        }
      },
    } as Visitor<AutoCssModulesState>,
  };
};

export default autoCssModulesPlugin;
