import { ReflectionKind } from 'typedoc';
import { IRenderer } from '../index';
import ProjectRenderer from './project-renderer';
import AccessorRenderer from './accessor-renderer';
import ContainerRenderer from './container-renderer';

const renderers: { [kind: number]: IRenderer } = {
  [ReflectionKind.Global]: new ProjectRenderer(),
  [ReflectionKind.Accessor]: new AccessorRenderer(),
  [ReflectionKind.ExternalModule]: new ContainerRenderer('module'),
  [ReflectionKind.Module]: new ContainerRenderer('module'),
  [ReflectionKind.Interface]: new ContainerRenderer('interface'),
  [ReflectionKind.Class]: new ContainerRenderer('class'),
  [ReflectionKind.Enum]: new ContainerRenderer('enum'),
};

export { renderers };
