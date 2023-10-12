export type IStatus = "success" | "warning" | "error";

export interface IPopUp {
  message: string;
  visible: boolean;
  status: IStatus | null;
}
