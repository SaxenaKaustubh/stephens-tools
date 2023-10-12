import * as React from "react";
import { ActionButton, IButtonProps, IButtonStyles } from "@fluentui/react/lib/Button";
import { IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import color from "../../utils/color";

const menuStyles: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  minWidth: 100,
  width: 120,
  color: color.textColor,
  borderWidth: 0,
  paddingLeft: 10,
  marginBottom: 10,
};
export const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: color.textColor,
  borderWidth: 0,
  background: "transparent",
  marginTop: 5,
};
export const labelButtonStyles: IButtonStyles = {
  label: {
    fontWeight: "normal",
  },
};
export const menuImageProps: IImageProps = {
  imageFit: ImageFit.contain,
  width: 28,
  height: 28,
};

interface Props extends IButtonProps {
  children?: React.ReactNode;
}
export const MenuWrapper: React.FunctionComponent<Props> = (props) => {
  const { disabled, checked, children } = props;

  return (
    <ActionButton
      {...props}
      allowDisabledFocus
      style={menuStyles}
      disabled={disabled}
      checked={checked}
      styles={{
        rootHovered: {
          background: color.hoverColor,
          fontWeight: "600",
        },
        root: {
          background: color.background,
        },
      }}
    >
      {children}
    </ActionButton>
  );
};
