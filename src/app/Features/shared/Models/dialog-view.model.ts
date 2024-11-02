import { DialogModel } from "./dialog.model";

export interface DialogView {
  data: DialogModel;
  onOkClicked(): any;
  onCancelClicked?(): any;
  onClosedClicked?(): any;
}