import { Component, RendererComponent } from 'typedoc/dist/lib/output/components';
import { BindOption, DeclarationOption, ParameterType } from 'typedoc';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import Emit from './emit';

export const DTS_RENDER: string = 'dts-render';

const declarationFile: DeclarationOption = {
  name: 'declarationFile',
  type: ParameterType.Mixed,
  defaultValue: false,
  help: 'The output file location to write the declaration to',
};

const declarationDir: DeclarationOption = {
  name: 'declarationDir',
  type: ParameterType.String,
  defaultValue: 'types',
  help: 'The output dir location to write the declaration to',
};

const declarationOnly: DeclarationOption = {
  name: 'declarationOnly',
  type: ParameterType.Boolean,
  defaultValue: true,
  help: 'Only declaration files are generated',
};

@Component({ name: DTS_RENDER })
export class DtsRenderPlugin extends RendererComponent {
  static options: DeclarationOption[] = [declarationFile, declarationDir, declarationOnly];

  private baseDir: string;

  @BindOption(declarationFile.name)
  private outFile: boolean | string;

  @BindOption(declarationDir.name)
  private outDir: string;

  @BindOption(declarationOnly.name)
  private only: boolean;

  private result: Promise<any>;

  protected initialize() {
    this.baseDir = this.application.project;
    this.listenTo(this.owner, {
      [RendererEvent.BEGIN]: this.onRenderBegin,
      [RendererEvent.END]: this.onRenderEnd,
    });
  }

  private onRenderBegin(event: RendererEvent) {
    const emit = Emit.of(event.project);
    // const num:number =
    if (this.outFile) {
      // 输出单声明文件
      this.result = emit.writeSingleFile(this.baseDir, this.outFile);
    } else {
      // 输出多声明文件
      this.result = emit.writeMultipleFile(this.baseDir, this.outDir);
    }
  }

  private onRenderEnd(event: RendererEvent) {
    this.result.catch(err => {
      this.application.logger.error(err.toString());
    });
  }
}
