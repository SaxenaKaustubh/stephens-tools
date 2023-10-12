import React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react";
import { IPopUp } from "../../interface/Common";
import Progress from "../../components/Progress";
import CONST from "../../CONST";

/* global Office require */

type AppContextType = {
  setLoadingState: (value: boolean) => void;
  popup: IPopUp;
  openModal: (popup: IPopUp) => void;
  closeModal: () => void;
};

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

type Props = {
  children: React.ReactNode;
};

function AppProvider({ children }: Props) {
  const [isReady, setIsReady] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [popup, setPopup] = React.useState<IPopUp>({
    visible: false,
    message: "",
    status: null,
  });

  const setLoadingState = (value: boolean) => {
    setLoading(value);
  };
  const openModal = (newPopup: IPopUp) => {
    setPopup(newPopup);
  };
  const closeModal = () => {
    setPopup({
      visible: false,
      message: "",
      status: null,
    });
  };
  React.useEffect(() => {
    Office.onReady(() => {
      setIsReady(true);
    });
  }, [popup]);

  const contextValue = React.useMemo(
    () => ({
      setLoadingState,
      popup,
      openModal,
      closeModal,
    }),
    [popup]
  );

  if (!isReady) {
    return (
      <Progress
        title={CONST.APP_TITLE}
        logo={require("../../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
      {loading && (
        <Stack
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
          verticalAlign="center"
        >
          <Spinner size={SpinnerSize.large} />
        </Stack>
      )}
    </>
  );
}

export default AppProvider;
