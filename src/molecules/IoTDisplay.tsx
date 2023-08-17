import {
  classSet,
  ComponentChildren,
  Display,
  DisplayProps,
} from "../src.deps.ts";

export type IoTDisplayProps = DisplayProps & {
  icon: ComponentChildren;

  controls: ComponentChildren;
};

export function IoTDisplay(props: IoTDisplayProps) {
  const { icon, title, controls, ...rest } = props;

  const header = (
    <div class="flex items-center">
      {icon}

      <div>{title}</div>
    </div>
  );

  return (
    <Display
      {...rest}
      class={classSet(
        props,
        "p-2 md:p-4",
        "m-3 md:m-6 rounded focus:outline-none shadow-lg",
      )}
    >
      <div class="flex h-64px">
        <div class="flex-grow">{header}</div>

        <div>{controls}</div>
      </div>

      <div class="p-2 md:p-4">{props.children}</div>
    </Display>
  );
}
