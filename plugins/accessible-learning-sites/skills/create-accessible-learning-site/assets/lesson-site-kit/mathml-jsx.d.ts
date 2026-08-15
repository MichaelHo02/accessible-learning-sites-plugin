import type { HTMLAttributes, ReactNode } from "react";

type MathMLProps = HTMLAttributes<MathMLElement> & {
  children?: ReactNode;
  display?: "block" | "inline";
  xmlns?: "http://www.w3.org/1998/Math/MathML";
  [attribute: string]: unknown;
};

type MathMLIntrinsicElements = {
  [Tag in keyof MathMLElementTagNameMap]: MathMLProps;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends MathMLIntrinsicElements {}
  }
}

export {};
