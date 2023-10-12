import * as React from "react";
import { useId } from "@fluentui/react-hooks";
import { mergeStyleSets, Modal, IIconProps } from "@fluentui/react";
import { IconButton, Text } from "@fluentui/react";

type Props = {
  isModalOpen: boolean;
  hideModal: () => void;
  children?: React.ReactNode;
  title: string;
};
const ModalContainer = ({ isModalOpen, hideModal, title, children }: Props) => {
  const titleId = useId("title");
  const cancelIcon: IIconProps = { iconName: "Cancel" };

  return (
    <Modal
      titleAriaId={titleId}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      containerClassName={contentStyles.container}
    >
      <div
        style={{
          display: "flex",
          padding: 15,
          backgroundColor: "white",
          position: "relative",
          background: "#4c5eea",
        }}
      >
        <Text variant="xLarge" style={{ color: "white" }}>
          {title}
        </Text>
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            iconProps={cancelIcon}
            ariaLabel="Close"
            onClick={hideModal}
            style={{ backgroundColor: "#4c5eea", color: "white" }}
          />
        </div>
      </div>
      <div className={contentStyles.body}>{children}</div>
    </Modal>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  body: {
    padding: "24px 12px 24px 12px",
    overflowY: "hidden",
  },
});

export default ModalContainer;
