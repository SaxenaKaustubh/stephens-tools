import React, { ReactElement } from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { AppContext } from "../libs/context/AppProvider";
import { IModalProps, Dialog, DialogType, IDialogContentProps } from "@fluentui/react";

/* global window */

function StatusMessage(): ReactElement {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const { popup, closeModal } = React.useContext(AppContext);

  const dialogContentProps: IDialogContentProps = React.useMemo(() => {
    let headerBackground = "white";
    let title = "";
    switch (popup.status) {
      case "success":
        headerBackground = "#4c5eea";
        title = "Success";
        break;
      case "warning":
        headerBackground = "#ff5b00";
        title = "Warning";
        break;
      case "error":
        headerBackground = "#f70000";
        title = "Error";
        break;
      default:
        break;
    }
    return {
      type: DialogType.close,
      title: title,
      closeButtonAriaLabel: "Close",
      subText: popup.message,
      showCloseButton: true,
      styles: {
        header: {
          background: headerBackground,
          height: 50,
          display: "flex",
          alignItems: "center",
        },
        title: {
          color: "white",
        },
        button: {
          color: "white",
          background: headerBackground,
          bottom: 5,
        },
        content: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        },
        innerContent: {
          textAlign: "center",
        },
        inner: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          marginTop: "16px",
        },
        subText: {
          fontWeight: "500",
          fontSize: 14,
          lineHeight: 20,
        },
      },
    };
  }, [popup.status]);

  const modalProps: IModalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: {
        main: { maxWidth: 450 },
      },
    }),
    [labelId, subTextId]
  );

  React.useEffect(() => {
    let interval = 0;
    if (popup.visible) {
      toggleHideDialog();
      interval = window.setTimeout(() => {
        popup.status === "success" && onCloseModal();
      }, 2000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [popup]);

  const onCloseModal = () => {
    toggleHideDialog();
    closeModal();
  };

  if (!popup.visible) {
    return null;
  }
  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={onCloseModal}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    />
  );
}

export default StatusMessage;
