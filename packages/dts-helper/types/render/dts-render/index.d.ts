import { RendererComponent } from 'typedoc/dist/lib/output/components';
import { DeclarationOption } from 'typedoc';
import { ReflectionFormatter } from './format';
declare const DTS_RENDER: string;
declare class DtsRender extends RendererComponent {
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
