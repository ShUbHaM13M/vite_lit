import { LitElement } from 'lit';
import { User } from './types/user';
export declare class UserCard extends LitElement {
    user: User;
    onFollowClickedCB: Function;
    isFollowing: boolean;
    onFollowBtnClicked(): void;
    constructor();
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-card': UserCard;
    }
}
