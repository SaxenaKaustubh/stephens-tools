import * as React from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { mergeStyleSets, Modal, IIconProps } from "@fluentui/react";
import { IconButton, Text } from "@fluentui/react";
import { AppContext } from "../libs/context/AppProvider";

/* global window */

const StatusMessage = () => {
  const [title, setTitle] = React.useState("");
  const [titleBackground, setTitleBackground] = React.useState("");
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const titleId = useId("title");
  const cancelIcon: IIconProps = { iconName: "Cancel" };

  const { popup, closeModal } = React.useContext(AppContext);

  React.useEffect(() => {
    let interval = 0;
    if (popup.visible) {
      checkStatus();
      interval = window.setTimeout(() => {
        popup.status === "success" && onCloseModal();
      }, 2000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [popup]);

  const checkStatus = () => {
    switch (popup.status) {
      case "success":
        setTitleBackground("#4c5eea");
        setTitle("Success");
        break;
      case "warning":
        setTitleBackground("#ff5b00");
        setTitle("Warning");
        break;
      case "error":
        setTitleBackground("#f70000");
        setTitle("Error");
        break;
      default:
        break;
    }
    showModal();
  };

  const onCloseModal = () => {
    hideModal();
    closeModal();
  };
  return (
    <Modal
      titleAriaId={titleId}
      isOpen={isModalOpen}
      onDismiss={onCloseModal}
      containerClassName={contentStyles.container}
    >
      <div
        style={{
          display: "flex",
          padding: 10,
          paddingLeft: 15,
          backgroundColor: titleBackground,
          position: "relative",
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
            onClick={onCloseModal}
            style={{ backgroundColor: titleBackground, color: "white" }}
          />
        </div>
      </div>
      <div className={contentStyles.body}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
          <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 14.2, lineHeight: 1.6 }}>
            {popup.message}
          </Text>
        </div>
      </div>
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

export default StatusMessage;
