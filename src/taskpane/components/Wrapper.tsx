import { IStackStyles, Stack } from "@fluentui/react";
import React, { ReactElement, ReactNode } from "react";
import color from "../utils/color";

interface WrapperProps {
  children: ReactNode;
}
const wrapperStackStyles: IStackStyles = {
  root: {
    height: "100vh",
    backgroundColor: color.background,
  },
};

function Wrapper({ children }: WrapperProps): ReactElement {
  return (
    <Stack verticalFill styles={wrapperStackStyles}>
      {children}
    </Stack>
  );
}

export default Wrapper;
