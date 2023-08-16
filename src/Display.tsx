import { ComponentChildren, JSX } from "../src.deps.ts";
import { classSet } from "../utils/jsx.utils.tsx";

export type DisplayProps = JSX.HTMLAttributes<HTMLDivElement> & {
  title?: string | ComponentChildren;
};

export function Display(props: DisplayProps) {
  const displayTitle = typeof props.title === "string"
    ? (
      <h1
        class={classSet(
          undefined,
          "font-bold",
          "text-2xl md:text-3xl inline-block",
        )}
      >
        {props.title}
      </h1>
    )
    : props.title as ComponentChildren;

  return (
    <div
      {...props}
      class={classSet(
        props,
        "flex flex-col",
      )}
    >
      {displayTitle}
      {props.children}
    </div>
  );
}