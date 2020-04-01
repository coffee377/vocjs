declare module "dts-helper/application" {
    import { Application } from 'typedoc';
    import { ProjectReflection } from 'typedoc/dist/lib/models';
    export class DtsApplication extends Application {
        /**
         * 输出声明文件
         * @param project
         * @param out 输出文件或输出目录
         */
        generateDts(project: ProjectReflection, out?: string): boolean;
    }
}
declare module "dts-helper/utils/error" {
    import ts from 'typescript';
    const TsError: (diagnostics: ts.Diagnostic[]) => Error;
    export { TsError };
}
declare module "dts-helper/options" {
    export interface IOptions {
        /**
         * @description 基本目录
         * @default process.cwd()
         */
        baseDir?: string;
        /**
         * @description tsconfig.json 配置文件
         * @default tsconfig.json
         */
        tsConfig?: string;
        /**
         * @description
         * @default false
         */
        removeComments?: boolean;
        /**
         * @description 模块前缀(默认使用项目名称或者自定义)
         * @default true
         */
        modulePrefix?: boolean | string;
        /**
         * @description 声明文件目录
         */
        outDir?: string;
        /**
         * @description 输出单个声明文件
         * @default false
         */
        outFile?: boolean | string;
        /**
         * @description exportEquals 导出功能
         * @default false
         */
        exportEquals?: boolean;
        /**
         * @description
         * @default false
         */
        noEmit?: boolean;
        include?: string[];
        /**
         * @description 排除文件 glob
         * @default
         */
        exclude?: string[];
        eol?: string;
        indent?: string;
        log?: (message: any, ...optionalParams: any[]) => void;
        verbose?: boolean;
    }
    export const DEFAULT_OPTS: IOptions;
}
declare module "dts-helper/utils/sort" {
    type Selector<T> = (obj: T) => any;
    export type Compare<T> = (a: T, b: T) => number;
    export function propertySorter<T>(selector: Selector<T>): Compare<T>;
}
declare module "dts-helper/utils" {
    import { propertySorter } from "dts-helper/utils/sort";
    const slash: (path: string) => string;
    function join(delimiter: string, ...values: any[]): string;
    function resolveFileName(fileName: string, baseDir?: string): string;
    export { slash, join, resolveFileName, propertySorter };
}
declare module "dts-helper/utils/tsconfig" {
    import ts from 'typescript';
    import { IOptions } from "dts-helper/options";
    export interface TSConfig {
        basePath: string;
        files: string[];
        compilerOptions: ts.CompilerOptions;
        options: IOptions;
    }
    /**
     * 读取配置文件
     * @param file
     */
    const readConfig: (file: string) => TSConfig;
    const mergeConfig: (tsConfig: TSConfig, options: IOptions) => TSConfig;
    const getConfig: (file: string, options: IOptions) => TSConfig;
    export { readConfig, mergeConfig, getConfig };
}
declare module "dts-helper/declaration/transform/visitor/abstract" {
    import ts from 'typescript';
    import { IOptions } from "dts-helper/options";
    export enum VisitorType {
        /** Custom transformers to evaluate before built-in .js transformations. */
        BEFORE = "before",
        /** Custom transformers to evaluate after built-in .js transformations. */
        AFTER = "after",
        /** Custom transformers to evaluate after built-in .d.ts transformations. */
        AFTER_DECLARATIONS = "afterDeclarations"
    }
    export interface VisitorOptions extends IOptions {
        /**
         * @description 模块名称前缀
         */
        modulePrefix?: string;
        /**
         * @description 访问者类型
         * @default VisitorType.BEFORE
         */
        visitorType?: VisitorType;
        [key: string]: any;
    }
    export interface IVisitor {
        /**
         * @description 访问类型
         */
        readonly visitorType: VisitorType;
        /**
         * @description 配置参数
         */
        readonly options?: VisitorOptions;
        /**
         * @description 满足条件的节点
         * @param node AST 节点
         */
        test: (node: ts.Node) => boolean;
        /**
         * @description 访问者
         * @param sourceFile
         */
        visitor: (sourceFile: ts.SourceFile) => ts.Visitor;
    }
    abstract class AbstractVisitor implements IVisitor {
        readonly visitorType: VisitorType;
        readonly options: VisitorOptions;
        constructor(options?: VisitorOptions);
        /**
         * @description 获取外部模块名称
         * @param sf
         */
        private static getExternalModuleNames;
        /**
         * @description 是否外面模块
         * @param node
         * @param moduleName
         */
        isExternalModule(node: any, moduleName: string): boolean;
        /**
         * @description 是否内部模块
         * @param node
         * @param moduleName
         */
        isInternalModule(node: any, moduleName: string): boolean;
        /**
         * @description 获取完整模块名称
         * @param name
         */
        getModuleName(name: string): string;
        abstract test: (node: ts.Node) => boolean;
        abstract visitor: (sourceFile: ts.SourceFile) => ts.Visitor;
    }
    export default AbstractVisitor;
}
declare module "dts-helper/declaration/transform/visitor/import-path-resolve" {
    import AbstractVisitor from "dts-helper/declaration/transform/visitor/abstract";
    class ImportPathResolveVisitor extends AbstractVisitor {
        test: (node: any) => boolean;
        visitor: (sourceFile: any) => (node: any) => any;
    }
    export default ImportPathResolveVisitor;
}
declare module "dts-helper/declaration/transform/visitor/export-path-resolve" {
    import AbstractVisitor from "dts-helper/declaration/transform/visitor/abstract";
    class ExportPathResolveVisitor extends AbstractVisitor {
        test: (node: any) => boolean;
        visitor: (sourceFile: any) => (node: any) => any;
    }
    export default ExportPathResolveVisitor;
}
declare module "dts-helper/declaration/transform/visitor/module-name-resolve" {
    import AbstractVisitor from "dts-helper/declaration/transform/visitor/abstract";
    class ModuleNameResolveVisitor extends AbstractVisitor {
        test: (node: any) => boolean;
        visitor: (sourceFile: any) => (node: any) => any;
    }
    export default ModuleNameResolveVisitor;
}
declare module "dts-helper/declaration/transform/visitor/export-equals-resolve" {
    import AbstractVisitor from "dts-helper/declaration/transform/visitor/abstract";
    class ExportEqualsResolveVisitor extends AbstractVisitor {
        test: (node: any) => boolean;
        visitor: (sourceFile: any) => (node: any) => any;
    }
    export default ExportEqualsResolveVisitor;
}
declare module "dts-helper/declaration/transform/visitor" {
    import BaseVisitor, { IVisitor, VisitorOptions, VisitorType } from "dts-helper/declaration/transform/visitor/abstract";
    class Visitors {
        private static ins;
        private readonly options;
        private readonly visitorMap;
        constructor(options?: VisitorOptions);
        run(): IVisitor[];
        add: (visitor: IVisitor, opts?: any) => void;
        remove: () => void;
        static instance(options?: any): Visitors;
    }
    export { VisitorType, IVisitor, BaseVisitor, Visitors };
}
declare module "dts-helper/declaration/transform/transformer" {
    import ts from 'typescript';
    import { IVisitor } from "dts-helper/declaration/transform/visitor";
    class Transformer implements ts.CustomTransformer {
        private readonly context;
        private readonly visitors;
        constructor(context: ts.TransformationContext, visitors?: IVisitor[]);
        transformBundle(bundle: any): any;
        transformSourceFile(source: any): any;
    }
    export default Transformer;
}
declare module "dts-helper/declaration/transform/compiler" {
    import ts from 'typescript';
    import { IOptions } from "dts-helper/options";
    interface ICompiler {
        run: () => ts.CustomTransformers;
    }
    class Compiler implements ICompiler {
        private static ins;
        private readonly options;
        constructor(options: Partial<IOptions>);
        private getCustomTransformerFactory;
        run: () => ts.CustomTransformers;
        static instance(options?: Partial<IOptions>): Compiler;
    }
    export default Compiler;
}
declare module "dts-helper/declaration/transform" {
    export { VisitorType, IVisitor, BaseVisitor, Visitors } from "dts-helper/declaration/transform/visitor";
    export { default as Transformer } from "dts-helper/declaration/transform/transformer";
    export { default as Compiler } from "dts-helper/declaration/transform/compiler";
}
declare module "dts-helper/declaration/source" {
    import { TSConfig } from "dts-helper/utils/tsconfig";
    export interface DeclarationFile {
        fileName: string;
        contents: string;
    }
    function getDeclarationFiles(tsconfig: TSConfig): DeclarationFile[];
    export default getDeclarationFiles;
}
declare module "dts-helper/output/write" {
    import { WriteStream } from 'fs-extra';
    abstract class WriteFile {
        protected readonly baseDir?: string;
        protected constructor(baseDir: string);
        protected write<T = any>(fileName: string, callback?: (stream: WriteStream) => void, baseDir?: string): Promise<T>;
        abstract emit(): Promise<any>;
    }
    export default WriteFile;
}
declare module "dts-helper/output/multiple-file" {
    import WriteFile from "dts-helper/output/write";
    class MultipleFile extends WriteFile {
        protected readonly files: Map<string, string>;
        constructor(files: Map<string, string>, baseDir?: string);
        emit(): Promise<any>;
    }
    export default MultipleFile;
}
declare module "dts-helper/declaration/multiple" {
    import { DeclarationFile } from "dts-helper/declaration/source";
    function multiple(declarationFiles: DeclarationFile[], baseDir?: string): Promise<any>;
    export default multiple;
}
declare module "dts-helper/output/single-file" {
    import MultipleFile from "dts-helper/output/multiple-file";
    class SingleFile extends MultipleFile {
        constructor(fileName: string, content: string, baseDir?: string);
    }
    export default SingleFile;
}
declare module "dts-helper/declaration/single" {
    import { DeclarationFile } from "dts-helper/declaration/source";
    function single(declarationFile: DeclarationFile, baseDir?: string): Promise<any>;
    export default single;
}
declare module "dts-helper/declaration/emit" {
    import { TSConfig } from "dts-helper/utils/tsconfig";
    import { IOptions } from "dts-helper/options";
    export function run(tsconfig: TSConfig, options: IOptions): Promise<any>;
    export default function (options?: Partial<IOptions>): Promise<any>;
}
declare module "dts-helper/declaration" {
    export { default as MultipleFile } from "dts-helper/declaration/multiple";
    export { default as SingleFile } from "dts-helper/declaration/single";
    export { default as emit, run } from "dts-helper/declaration/emit";
}
declare module "dts-helper" {
    import { emit } from "dts-helper/declaration";
    export { emit };
}
declare module "dts-helper/client/options" {
    export interface CommandOptions {
        version: string;
        outDir: string;
        outFile: boolean | string;
        module: boolean | string;
        noEmit: boolean;
        exportEquals: boolean;
        comment: boolean;
        verbose: boolean;
        include: string[];
        exclude: string[];
        lineBreak: string;
        indent: string;
    }
    const cmdOpts: CommandOptions;
    export { cmdOpts };
}
declare module "dts-helper/client" { }
declare module "dts-helper/declaration/transform/visitor/comment-resolve" {
    import ts from 'typescript';
    import AbstractVisitor from "dts-helper/declaration/transform/visitor/abstract";
    class CommentResolveVisitor extends AbstractVisitor {
        test: (node: any) => boolean;
        visitor: (sourceFile: ts.SourceFile) => (node: any) => any;
    }
    export default CommentResolveVisitor;
}
declare module "dts-helper/render/dts-render/output/Indent" {
    export default class Indent {
        private readonly indentCache;
        private indentString;
        constructor(indentString?: string);
        getIndent(size: number): string;
        private static ins;
        static instance(): Indent;
    }
}
declare module "dts-helper/render/dts-render/format/renderers/comment-renderer" {
    import { Reflection } from 'typedoc/dist/lib/models';
    import { IRenderer } from "dts-helper/render/dts-render/format";
    export default class CommentRenderer implements IRenderer {
        render(node: Reflection): string;
        private renderMultilineComment;
    }
}
declare module "dts-helper/render/dts-render/format/renderers/reflection-renderer" {
    import { Reflection } from 'typedoc';
    import Indent from "dts-helper/render/dts-render/output/Indent";
    import CommentRenderer from "dts-helper/render/dts-render/format/renderers/comment-renderer";
    import { IRenderer } from "dts-helper/render/dts-render/format";
    export abstract class ReflectionRenderer implements IRenderer {
        protected indention: Indent;
        protected commentRenderer: CommentRenderer;
        constructor();
        abstract render(node: Reflection, terminationCharacter?: string): string;
        protected getModifiers(node: Reflection, parent?: Reflection): string[];
        protected renderComment(node: Reflection): string;
        protected encodeName(name: string): string;
        protected isTop(node: Reflection): boolean;
        protected getTag(node: Reflection, tag: string): import("typedoc/dist/lib/models").CommentTag;
        protected pushIfTruthy<T>(array: T[], value: T): void;
    }
}
declare module "dts-helper/render/dts-render/format/renderers/container-renderer" {
    import { DeclarationReflection, Reflection } from 'typedoc';
    import { ReflectionRenderer } from "dts-helper/render/dts-render/format/renderers/reflection-renderer";
    export default class ContainerRenderer extends ReflectionRenderer {
        private readonly type;
        constructor(type: string);
        render(node: Reflection, terminationCharacter?: string): string;
        protected renderTypeParameters(node: DeclarationReflection): string;
        protected renderBody(node: DeclarationReflection, indentBy?: number, delimiter?: string): string;
        private isSortFlag;
        private getSortOption;
    }
}
declare module "dts-helper/render/dts-render/format/renderers/project-renderer" {
    import { Reflection } from 'typedoc/dist/lib/models';
    import ContainerRenderer from "dts-helper/render/dts-render/format/renderers/container-renderer";
    export default class ProjectRenderer extends ContainerRenderer {
        constructor();
        render(node: Reflection): string;
    }
}
declare module "dts-helper/render/dts-render/format/renderers/accessor-renderer" {
    import { Reflection } from 'typedoc';
    import { ReflectionRenderer } from "dts-helper/render/dts-render/format/renderers/reflection-renderer";
    export default class AccessorRenderer extends ReflectionRenderer {
        render(node: Reflection, terminationCharacter?: string): string;
    }
}
declare module "dts-helper/render/dts-render/format/renderers" {
    import { IRenderer } from "dts-helper/render/dts-render/format";
    const renderers: {
        [kind: number]: IRenderer;
    };
    export { renderers };
}
declare module "dts-helper/render/dts-render/format/reflection-formatter" {
    import { Reflection } from 'typedoc';
    import { SourceFile } from 'typedoc/dist/lib/models';
    /**
     * Sort flags
     */
    enum ReflectionSortFlags {
        none = 0,
        /**
         * @internal
         */
        tag = 1,
        container = 2,
        leaf = 4,
        all = 7
    }
    const sortMapping: {
        [key: string]: ReflectionSortFlags | undefined;
    };
    class ReflectionFormatter {
        private static ins;
        static sortOption: ReflectionSortFlags;
        /**
         *
         * @param reflection 反射对象
         * @param terminationCharacter 终止字符
         */
        render(reflection?: Reflection, terminationCharacter?: string): string;
        renderSourceFile(sourceFile: SourceFile, root: boolean): string;
        static instance(): ReflectionFormatter;
    }
    export { ReflectionSortFlags, sortMapping, ReflectionFormatter };
}
declare module "dts-helper/render/dts-render/format/type-formatter" {
    import { Type } from 'typedoc/dist/lib/models/types';
    export interface TypeFormatterOptions {
        isOptionalType?: boolean;
        includeConstraints?: boolean;
    }
    export default class TypeFormatter {
        static format(type: Type, options?: TypeFormatterOptions): string;
    }
}
declare module "dts-helper/render/dts-render/format" {
    import { Reflection } from 'typedoc';
    import TypeFormatter from "dts-helper/render/dts-render/format/type-formatter";
    /**
     * @description 渲染接口
     */
    export interface IRenderer {
        render(node: Reflection, ...args: any[]): string;
    }
    export * from "dts-helper/render/dts-render/format/reflection-formatter";
    export { TypeFormatter };
}
declare module "dts-helper/render/dts-render/output/emit" {
    import { ProjectReflection } from 'typedoc/dist/lib/models';
    export default class Emit {
        private readonly project;
        constructor(project: ProjectReflection);
        static of(project: ProjectReflection): Emit;
        writeSingleFile(baseDir: string, outFile?: boolean | string): Promise<any>;
        writeMultipleFile(baseDir: string, outDir: string): Promise<never>;
    }
}
declare module "dts-helper/render/dts-render" {
    import { RendererComponent } from 'typedoc/dist/lib/output/components';
    import { DeclarationOption } from 'typedoc';
    import { ReflectionFormatter } from "dts-helper/render/dts-render/format";
    const DTS_RENDER: string;
    class DtsRender extends RendererComponent {
        static options: DeclarationOption[];
        private baseDir;
        private outFile;
        private outDir;
        private only;
        private result;
        protected initialize(): void;
        private onRenderBegin;
        private onRenderEnd;
    }
    export { DTS_RENDER, DtsRender, ReflectionFormatter };
}
declare module "dts-helper/render" {
    export * from "dts-helper/render/dts-render";
}
declare module "dts-helper/plugin/typedoc" {
    import { PluginHost } from 'typedoc/dist/lib/utils';
    export function load(host: PluginHost): void;
}
declare module "dts-helper/render/dts-render/option/dts-options" {
    export interface DtsOptions {
        /**
         * @description 基本目录
         * @default process.cwd()
         */
        baseDir: string;
        /**
         * @description tsconfig.json 配置文件
         * @default tsconfig.json
         */
        tsc: string;
        /**
         * @description 声明文件目录
         * @default types
         */
        outDir: string;
        /**
         * @description 输出单个声明文件
         * @default false
         */
        outFile: boolean | string;
        /**
         * @description
         * @default false
         */
        noEmit: boolean;
        /**
         * @description 排除文件 glob
         * @default
         */
        exclude: string[];
        main?: string;
        externals?: string[];
        types?: string[];
        eol?: string;
        indent?: string;
        log?: (message: any, ...optionalParams: any[]) => void;
        verbose?: boolean;
    }
}
declare module "dts-helper/render/dts-render/option" {
    export { DtsOptions } from "dts-helper/render/dts-render/option/dts-options";
}
declare module "dts-helper/render/dts-render/output/module" {
    export interface Module {
        /**
         * @description 模块 ID
         */
        id: string;
        /**
         * @description 当前模块文件名
         */
        fileName: string;
        /**
         * @description 模块路径
         */
        path: string[];
        /**
         * @description 模块名称
         */
        name: string;
    }
}
