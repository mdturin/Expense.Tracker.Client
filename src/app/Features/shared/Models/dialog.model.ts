import { Type } from "@angular/core";

export interface IDialogModel{
    input: any;
    title: string;
    disabled: boolean;
    component?: Type<any>;
    okCaption: string;
    cancleCaption: string;
}

export class DialogModel implements IDialogModel{
    input: any = {};
    title!: string;
    component?: Type<any>;
    okCaption: string = "Ok";
    disabled: boolean = false;
    cancleCaption: string = "Cancle";

    constructor(options: {
        title: string,
        component?: Type<any>,
        input?: any,
        okCaption?: string,
        cancleCaption?: string,
        disabled?: boolean
    }){
        this.title = options.title;
        this.component = options.component;
        this.input = options.input ?? {};
        this.disabled = options.disabled ?? false;
        this.okCaption = options.okCaption ?? "Ok";
        this.cancleCaption = options.cancleCaption ?? "Cancle";
    }
}