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
        ["p-2 md:p-4", "rounded focus:outline-none shadow-lg"],
        props,
        "-:",
      )}
    >
      <div class="flex flex-col md:flex-row text-center md:text-left h-64px">
        <div class="flex-grow">{header}</div>

        <div class="mx-auto">{controls}</div>
      </div>

      <div class="p-2 md:p-4">{props.children}</div>
    </Display>
  );
}
