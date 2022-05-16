import { HTMLAttributeAnchorTarget } from "react";

declare module NodeJS {
    interface Global {
            MathJax: object
    }
}

declare const MathJax: {
    tex: {
      inlineMath: string[][]
    },
    svg: {
      fontCache: string
    }
};