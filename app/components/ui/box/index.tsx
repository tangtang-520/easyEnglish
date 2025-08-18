import React from "react";
import { View, ViewProps } from "react-native";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { boxStyle } from "./styles";

type IBoxProps = ViewProps &
  VariantProps<typeof boxStyle> & { className?: string };

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  function Box({ className, ...props }, ref) {
    return (
      <View
        ref={ref}
        {...props}
        className={
          "border border-solid border-[#d5d5d5] " +
          boxStyle({ class: className })
        }
      />
    );
  }
);

Box.displayName = "Box";
export { Box };
