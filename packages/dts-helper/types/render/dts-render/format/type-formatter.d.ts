import { Type } from 'typedoc/dist/lib/models/types';
export interface TypeFormatterOptions {
    isOptionalType?: boolean;
    includeConstraints?: boolean;
}
export default class TypeFormatter {
    static format(type: Type, options?: TypeFormatterOptions): string;
}
