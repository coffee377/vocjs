import { Application, DeclarationOption, TSConfigReader, TypeDocReader } from 'typedoc';
import { PluginHost } from 'typedoc/dist/lib/utils';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import { Context } from 'typedoc/dist/lib/converter';
import { DTS_RENDER, DtsRenderPlugin } from './dts-render-plugin';

const options: DeclarationOption[] = [...DtsRenderPlugin.options];

export function load(host: PluginHost) {
  const app: Application = host.application;

  if (app.converter.hasComponent(DTS_RENDER)) {
    return;
  }

  app.options.addDeclarations(options);

  // app.bootstrap();
  // app.logger.warn(JSON.stringify(app.options.getRawValues()));
  // app.logger.warn(JSON.stringify(app.options.getCompilerOptions()));

  // app.renderer.on(RendererEvent.BEGIN, (event: RendererEvent) => {
  //   console.log('RendererEvent.BEGIN', 1);
  // });
  const declarationOnly = app.options.getValue('declarationOnly') || false;
  console.log('====>', declarationOnly);
  if (declarationOnly) {
    // app.renderer.removeAllComponents();
    // app.renderer.getComponents().filter(c => c.componentName !== DTS_RENDER);
  }
  app.renderer.addComponent(DTS_RENDER, new DtsRenderPlugin(app.renderer));

  // app.renderer.getComponents().forEach(v => {
  //   console.log(v.componentName);
  // });

  // dts.apply();
  console.log(' =====> ', app.project);

  // const src = app.expandInputFiles(['src']);
  // app.logger.verbose(JSON.stringify(src));
  // const project = app.convert(src);
  // DtsRenderPlugin.generateDts(project);
  // app.converter.addComponent<DtsPlugin>('dts', new DtsPlugin() as DtsPlugin);
}
