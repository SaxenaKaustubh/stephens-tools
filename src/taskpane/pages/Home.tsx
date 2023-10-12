import * as React from "react";
import { Logo } from "../components/Logo";
import { Label } from "@fluentui/react/lib/Label";
import { Stack, IStackStyles } from "@fluentui/react/lib/Stack";
import InsertPictures from "../components/menu/InsertPictures";
import RearrangePictures from "../components/menu/RearrangePictures";
import IncreaseSize from "../components/menu/IncreaseSize";
import DecreaseSize from "../components/menu/DecreaseSize";
import color from "../utils/color";

const stackStyles: IStackStyles = {
  root: {
    width: "100%",
    overflow: "visible",
    background: color.background,
  },
};

export default function Home() {
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        <Logo />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Label
          style={{
            color: "#484644",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 20,
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "lightgray",
            borderBottomStyle: "solid",
          }}
        >
          Photograph Tools
        </Label>
        <div style={{ height: "100%", width: "100%" }}>
          <Stack
            enableScopedSelectors
            horizontal
            verticalFill
            wrap
            horizontalAlign="center"
            verticalAlign="space-between"
            styles={stackStyles}
            tokens={{ childrenGap: 10 }}
          >
            <InsertPictures />
            <RearrangePictures />
            <IncreaseSize />
            <DecreaseSize />
          </Stack>
        </div>
      </div>
    </div>
  );
}
