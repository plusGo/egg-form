import {AfterViewInit, ChangeDetectorRef, HostBinding, Inject, Injector} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {takeUntil} from 'rxjs/operators';
import {FormProperty} from '../property/form.property';
import {EtOptionalHelp, EtUISchemaItem} from '../schema/ui.schema';
import {EtSchema} from '../schema/json.schema';
import {LocaleData} from '../local/local.type';
import {ErrorData} from '../error/error';
import {debug} from '../util/util';
import {EtValue} from '../schema/value.schema';
import {EtArrayWidgetSchema} from '../schema/widget/array-widget.schema';
import {EtObjectWidgetSchema} from '../schema/widget/object-widget.schema';


export abstract class Widget<T extends FormProperty, UIT extends EtUISchemaItem> implements AfterViewInit {
  formProperty: T;
  error: string;
  showError = false;
  id = '';
  schema: EtSchema;
  ui: UIT;
  firstVisual = false;

  @HostBinding('class')
  get cls() {
    return this.ui.class || '';
  }

  get disabled(): boolean | null {
    if (this.schema.readOnly === true || this.formComponent!.disabled) {
      return true;
    }

    return null;
  }

  get l(): LocaleData {
    return this.formProperty.root.widget.formComponent!.locale;
  }

  get oh() {
    return this.ui.optionalHelp as EtOptionalHelp;
  }

  get dom(): DomSanitizer {
    return this.injector.get(DomSanitizer);
  }

  constructor(
    @Inject(ChangeDetectorRef) protected readonly cd: ChangeDetectorRef,
    @Inject(Injector) protected readonly injector: Injector,
    @Inject(EtFormItemComponent) protected readonly formItemComponent?: EtFormItemComponent,
    @Inject(EtFormComponent) protected readonly formComponent?: EtFormComponent,
  ) {
  }

  ngAfterViewInit(): void {
    this.formProperty.errorsChanges.pipe(takeUntil(this.formItemComponent!.unsubscribe$)).subscribe((errors: ErrorData[] | null) => {
      if (errors == null) {
        return;
      }
      debug(this.ui, 'errorsChanges', this.formProperty.path, errors);

      // 不显示首次校验视觉
      if (this.firstVisual) {
        this.showError = errors.length > 0;
        this.error = this.showError ? (errors[0].message as string) : '';

        this.cd.detectChanges();
      }
      this.firstVisual = true;
    });
  }

  setValue(value: EtValue) {
    this.formProperty.setValue(value, false);
    debug(this.ui, 'valueChanges', this.formProperty.path, this.formProperty);
  }

  get value() {
    return this.formProperty.value;
  }

  detectChanges(onlySelf = false) {
    if (onlySelf) {
      this.cd.markForCheck();
    } else {
      this.formProperty.root.widget.cd.markForCheck();
    }
  }

  abstract reset(value: EtValue): void;
}

export class ControlWidget extends Widget<FormProperty, EtUISchemaItem> {
  reset(_value: EtValue) {
  }
}

export class ControlUIWidget<UIT extends EtUISchemaItem> extends Widget<FormProperty, UIT> {
  reset(_value: EtValue) {
  }
}

export class ArrayLayoutWidget extends Widget<ArrayProperty, EtArrayWidgetSchema> implements AfterViewInit {
  reset(_value: EtValue) {
  }

  ngAfterViewInit() {
    this.formProperty.errorsChanges.pipe(takeUntil(this.formItemComponent!.unsubscribe$)).subscribe(() => this.cd.detectChanges());
  }
}

export class ObjectLayoutWidget extends Widget<ObjectProperty, EtObjectWidgetSchema> implements AfterViewInit {
  reset(_value: EtValue) {
  }

  ngAfterViewInit() {
    this.formProperty.errorsChanges.pipe(takeUntil(this.formItemComponent!.unsubscribe$)).subscribe(() => this.cd.detectChanges());
  }
}
