import { LitElement } from "lit";
declare enum PopupVariant {
    DANGER = "danger",
    PRIMARY = "primary",
    WARNING = "warning"
}
interface PopupProps {
    title: string;
    description: string;
    primaryActionLabel: string;
    secondaryActionLabel: string;
    isShown: boolean;
    isBackdropBlurred: boolean;
}
export declare class Popup extends LitElement {
    props: PopupProps;
    variant: PopupVariant;
    onPrimaryActionClickedCB: Function;
    onSecondaryActionClickedCB: Function;
    _hidePopup(): void;
    _onCancelClick(): void;
    _onAcceptClick(): void;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'custom-popup': Popup;
    }
}
export {};
