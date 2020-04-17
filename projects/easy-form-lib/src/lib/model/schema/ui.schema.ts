import {TemplateRef} from '@angular/core';
import {ErrorSchema} from '../error/error';

export type EtPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type EtTrigger = 'click' | 'focus' | 'hover';

export type EtLSSize = 'large' | 'small';

export type EtDLSSize = 'default' | 'large' | 'small';

export interface EtGridSizeSchema {
  span?: number | null;
  order?: number | null;
  offset?: number | null;
  push?: number | null;
  pull?: number | null;
}

export interface EtGridSchema {
  /**
   * 栅格间隔
   */
  gutter?: number | null;
  /**
   * 栅格占位格数，为 `0` 时相当于 `display: none`
   */
  span?: number | null;
  /**
   * 数据栅格占位格数，为 `0` 时相当于 `display: none`
   */
  arraySpan?: number | null;
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  offset?: number | null;
  xs?: number | EtGridSizeSchema;
  sm?: number | EtGridSizeSchema;
  md?: number | EtGridSizeSchema;
  lg?: number | EtGridSizeSchema;
  xl?: number | EtGridSizeSchema;
  xxl?: number | EtGridSizeSchema;
}

export interface EtRenderSchema {
  /**
   * 指定采用什么小部件渲染，所有小部件名可[查阅文档](https://ng-alain.com/)
   */
  widget?: string;
  /**
   * 自定义类，等同 `[ngClass]` 值
   */
  class?: string | string[];
  /**
   * 元素组件大小
   */
  size?: EtDLSSize;
  /**
   * 指定宽度，单位：`px`
   */
  width?: number;
  /**
   * 响应式属性
   */
  grid?: EtGridSchema;
  /**
   * 标签可选信息
   */
  optional?: string;
  /**
   * 标签可选帮助，使用 `nz-tooltip` 展示
   */
  optionalHelp?: string | EtOptionalHelp;
}

export interface EtOptionalHelp {
  text?: string;
  i18n?: string;
  /** 图标，默认：`question-circle` */
  icon?: string;
  placement?: EtPlacement;
  trigger?: EtTrigger;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: { [key: string]: string };
}

export interface EtHorizontalLayoutSchema {
  /**
   * `label` 栅格占位格数，默认：`5`
   * - `0` 时相当于 `display: none`
   * - 限 `horizontal` 水平布局有效
   */
  spanLabel?: number | null;

  /**
   * `control` 栅格占位格数，默认：`19`
   * - `0` 时相当于 `display: none`
   * - 限 `horizontal` 水平布局有效
   */
  spanControl?: number | null;

  /**
   * `control` 栅格左侧的间隔格数，间隔内不可以有栅格
   * - 限 `horizontal` 水平布局有效
   */
  offsetControl?: number | null;

  /**
   * `label` 固定宽度
   * - 限 `horizontal` 水平布局有效
   */
  spanLabelFixed?: number | null;
}

export interface EtSchemaI18n {
  /**
   * 指 `schema.title` 的国际化键值
   */
  i18n?: string;
  /**
   * 对应 `schema.description` 国际化
   */
  descriptionI18n?: string;
}

/** 指定如何渲染 `Schema` */
export interface EtUISchemaItem extends EtRenderSchema, EtHorizontalLayoutSchema, ErrorSchema, EtSchemaI18n {
  [key: string]: any;

  /** 是否开启调试模式，在数据变更、校验会打印出相信信息，不建议在生产环境中使用 */
  debug?: boolean;

  /**
   * 属性顺序
   *
   * 当你只想某几个属性靠前时，则允许使用通配符 `*` 来表示剩余部分，且只允许出现一次
   *
   * @example
   *
   * [ 'a', 'b', 'c', 'd' ] + [ 'c', 'b', '*' ] = [ 'c', 'b', 'a', 'd']
   */
  order?: string[];
  /**
   * 是否隐藏
   */
  hidden?: boolean;
  /**
   * 指定条件时才显示，但需要**注意**：
   * - 键值表示监听对象属性名
   * - JSON Schema 校验是各属性独立运行，监听对象属性每一次值变化都会重新做一次整个JSON结构计算
   *
   * 有效格式包括：
   * - `visibleIf: { shown: [ true ] }`：当 `shown: true` 时才显示当前属性
   * - `visibleIf: { shown: [ '$ANY$' ] }`：当 `shown` 包括任意值时
   * - `visibleIf: { shown: (value: any) => value > 0 }`：复杂表达式
   */
  visibleIf?: { [key: string]: any[] | ((value: any) => boolean) };

}

/**
 * UI Schema，KEY名**务必**是 `$` 开头（例如：`$name`、`$id`），以便能区分KEY值还是UI选项
 * - 结构层级应同 `SFSchema` 一致
 * - 当KEY为 `*` 时表示对所有子表单元素都有效
 */
export interface EtUISchema {
  [key: string]: EtUISchemaItem | EtUISchemaItemRun;
}

/**
 * 内部运行时使用
 */
export interface EtUISchemaItemRun extends EtUISchemaItem {
  /** @internal 自定义模板 */
  _render?: TemplateRef<void>;
  /** @internal 是否必填 */
  _required?: boolean;
}
