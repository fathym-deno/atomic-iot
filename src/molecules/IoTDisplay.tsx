import { ComponentChildren, JSX } from "../src.deps.ts";
import { classSet } from "../utils/jsx.utils.tsx";
import { Display, DisplayProps } from "./Display.tsx";

export interface IoTDisplayProps extends DisplayProps {
  icon: string;
  controls: ComponentChildren;
}

export function IoTDisplay(props: IoTDisplayProps) {
  const { icon, title, controls, ...rest } = props;

  const header = (
    <div class="flex items-center">
      <div class="mr-2">{icon}</div>
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
