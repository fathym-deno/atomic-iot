import { ComponentChildren, Display, DisplayProps } from "../src.deps.ts";

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
    <Display {...rest}>
      <div class="flex">
        <div class="flex-grow">{header}</div>
        <div>{controls}</div>
      </div>

      {props.children}
    </Display>
  );
}