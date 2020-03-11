import { ReflectionKind } from 'typedoc';
import ReflectionRenderer from './reflection-renderer';
import AccessorRenderer from './impl/accessor-renderer';
import ContainerRenderer from './impl/container-renderer';
import ProjectRenderer from './impl/project-renderer';

export const renderers: { [kind: number]: ReflectionRenderer } = {
  [ReflectionKind.Global]: new ProjectRenderer(),
  [ReflectionKind.Accessor]: new AccessorRenderer(),
  [ReflectionKind.ExternalModule]: new ContainerRenderer('module'),
  [ReflectionKind.Module]: new ContainerRenderer('module'),
  [ReflectionKind.Interface]: new ContainerRenderer('interface'),
  [ReflectionKind.Class]: new ContainerRenderer('class'),
  [ReflectionKind.Enum]: new ContainerRenderer('enum'),
};
