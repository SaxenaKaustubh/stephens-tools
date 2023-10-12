import * as React from "react";
import { MenuWrapper, menuImageProps } from "./MenuWrapper";
import { Image } from "@fluentui/react/lib/Image";
import { IPicture } from "../../interface/PictureModel";
import { useBoolean } from "@fluentui/react-hooks";
import { AppContext } from "../../libs/context/AppProvider";
import { getPPILevel, resizePictureFile } from "../../utils";
import { insertPicture } from "../../libs/word/picture";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Label, ChoiceGroup, IChoiceGroupOption, Checkbox, Stack, ICheckboxStyles } from "@fluentui/react";
import ModalContainer from "../ModalContainer";

/* global require document console */

const checkStyles: ICheckboxStyles = {
  text: { fontSize: 12 },
  checkbox: { width: 16, height: 16, alignSelf: "center" },
  root: { marginLeft: 20 },
};

const InsertPictures = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<IPicture[]>([]);
  const [maxPPILevel, setMaxPPILevel] = React.useState(0);
  const [selectedLevel, setSelectedLevel] = React.useState(0);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

  const { setLoadingState, openModal } = React.useContext(AppContext);

  const inputRef = React.useRef(null);
  function insertPictures() {
    inputRef?.current.click();
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setLoadingState(true);
      const selectedFiles: File[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        selectedFiles.push(event.target.files[i]);
      }

      let newFiles: IPicture[] = [];
      let ppi = 0;
      for (const file of selectedFiles) {
        const picture = await processPictures(file);
        newFiles.push(picture);
        let newPPI = getPPILevel(Math.max(picture.wppi, picture.hppi));
        ppi = Math.max(ppi, newPPI);
      }

      setSelectedFiles(newFiles);
      setMaxPPILevel(ppi);
      newFiles.length > 0 && showModal();

      setLoadingState(false);
    }
  };
  const processPictures = async (file: File) => {
    return new Promise<IPicture>((resolve) => {
      var img: HTMLImageElement;
      img = document.createElement("img");
      img.onload = function () {
        const picture: IPicture = {
          width: img.width,
          height: img.height,
          wppi: img.width / 6.5,
          hppi: img.height / 9,
          size: file.size,
          file: file,
        };
        resolve(picture);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  const onChangeChoice = (_ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) => {
    setSelectedLevel(parseInt(option.key));
  };
  const onCheckChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    console.log(isChecked);
  };
  const options: IChoiceGroupOption[] = React.useMemo(() => {
    return [
      {
        key: "5",
        text: "High fidelity: preserves quality of the original picture",
        disabled: maxPPILevel < 5,
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
      {
        key: "4",
        text: "HD (330 ppi): good quality for high-definition (HD) displays",
        disabled: maxPPILevel < 4,
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
      {
        key: "3",
        text: "Print (220 ppi): excellent quality on most printers and screens",
        disabled: maxPPILevel < 3,
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
      {
        key: "2",
        text: "Web (150 ppi): good for web pages and projectors",
        disabled: maxPPILevel < 2,
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
      {
        key: "1",
        text: "E-mail (96 ppi): minimize document size for sharing",
        disabled: maxPPILevel < 1,
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
      {
        key: "0",
        text: "Use default resolution",
        onRenderField: (props, render) => {
          return <div style={{ fontSize: 12 }}>{render!(props)}</div>;
        },
      },
    ];
  }, [maxPPILevel]);

  const onOk = async () => {
    try {
      hideModal();
      setLoadingState(true);

      let compressedPicture: IPicture[] = [];
      for (const file of selectedFiles) {
        const changedImage = await resizePictureFile(file, selectedLevel);
        compressedPicture.push(changedImage);
      }

      await insertPicture(compressedPicture);
      setLoadingState(false);
      setSelectedFiles([]);
      openModal({
        visible: true,
        message: "Photographs are inserted into document successfully!",
        status: "success",
      });
    } catch (error) {
      setLoadingState(false);
      openModal({
        visible: true,
        message: "There's no existing style with the name Photo Captions.",
        status: "error",
      });
    }
  };
  return (
    <>
      <MenuWrapper
        text="Insert Pictures"
        title="Insert Pictures"
        onClick={insertPictures}
        onRenderIcon={() => (
          <Image {...menuImageProps} src={require("../../../../assets/images/insert-pictures.png")} />
        )}
      >
        <input
          style={{ display: "none" }}
          multiple
          ref={inputRef}
          type="file"
          id="select-image"
          name="select-image"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
      </MenuWrapper>
      <ModalContainer title="Compress Pictures" isModalOpen={isModalOpen} hideModal={hideModal}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Label style={{ fontSize: 16 }}>Compression options:</Label>
          <Checkbox label="Apply only to this picture" defaultChecked onChange={onCheckChange} styles={checkStyles} />
          <Checkbox
            label="Delete cropped areas of pictures"
            defaultChecked
            onChange={onCheckChange}
            disabled
            styles={checkStyles}
          />
        </Stack>
        <ChoiceGroup
          defaultSelectedKey="0"
          options={options}
          onChange={onChangeChoice}
          label="Resolution:"
          styles={{
            label: { fontSize: 16 },
            flexContainer: { marginLeft: 20 },
          }}
        />
        <Stack enableScopedSelectors horizontal horizontalAlign="space-evenly" style={{ marginTop: 20 }}>
          <PrimaryButton text="Ok" onClick={onOk} />
          <DefaultButton text="Cancel" onClick={hideModal} />
        </Stack>
      </ModalContainer>
    </>
  );
};

export default InsertPictures;
