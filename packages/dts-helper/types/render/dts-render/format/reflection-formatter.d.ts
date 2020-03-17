import { Reflection } from 'typedoc';
import { SourceFile } from 'typedoc/dist/lib/models';
/**
 * Sort flags
 */
declare enum ReflectionSortFlags {
    none = 0,
    /**
     * @internal
     */
    tag = 1,
    container = 2,
    leaf = 4,
    all = 7
}
declare const sortMapping: {
    [key: string]: ReflectionSortFlags | undefined;
};
declare class ReflectionFormatter {
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
