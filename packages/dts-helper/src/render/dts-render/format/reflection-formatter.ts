import { Reflection } from 'typedoc';
import { renderers } from './renderers';

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
  all = 7,
}

const sortMapping: { [key: string]: ReflectionSortFlags | undefined } = {
  none: ReflectionSortFlags.none,
  tag: ReflectionSortFlags.tag,
  container: ReflectionSortFlags.container,
  leaf: ReflectionSortFlags.leaf,
  all: ReflectionSortFlags.all,
};

class ReflectionFormatter {
  private static ins: ReflectionFormatter;

  public static sortOption: ReflectionSortFlags = ReflectionSortFlags.none;

  /**
   *
   * @param reflection 反射对象
   * @param terminationCharacter 终止字符
   */
  public render(reflection?: Reflection, terminationCharacter?: string): string {
    if (reflection) {
      const renderer = renderers[reflection.kind];

      if (renderer) {
        return renderer.render(reflection, terminationCharacter);
      }
      console.log(`Unrecognised reflection for kind ${reflection.kindString} ${reflection.name}`);
      // throw new Error(`Unrecognised reflection for kind ${reflection.kindString} ${reflection.name}`);
    }

    return '';
  }

  public static instance() {
    if (!ReflectionFormatter.ins) {
      ReflectionFormatter.ins = new ReflectionFormatter();
    }
    return ReflectionFormatter.ins;
  }
}

export { ReflectionSortFlags, sortMapping, ReflectionFormatter };
