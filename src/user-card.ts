import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { User } from './types/user'

const dicebearApi = 'https://avatars.dicebear.com/api/micah/'

@customElement('user-card')
export class UserCard extends LitElement {

  @property({ type: Object })
  user!: User;

  @property({
    type: Function, attribute: false
  })
  onFollowClickedCB: Function

  @state()
  isFollowing = false;

  onFollowBtnClicked() {
    this.isFollowing = !this.isFollowing;
    this.onFollowClickedCB(this.user)
  }

  constructor() {
    super();
    this.onFollowClickedCB = () => { }
  }

  render() {
    return html`
      <div class="header">
        <img class="avatar" src="${ `${ dicebearApi }${ this.user.username }.svg` }" alt="" />
        <button @click=${ this.onFollowBtnClicked } class="follow-btn ${ this.isFollowing && 'following' }">
          ${ this.isFollowing ? "Following" : "Follow" }
        </button>
      </div>

      <div class="body">
        <h3>${ this.user.name }</h3>
        <p class="username">@${ this.user.username }</p>
        <p class="company">
          Working at <strong> ${ this.user.company.name } </strong>. <br />
          ${ this.user.company.catchPhrase }. <br />
          ${ this.user.company.bs }.
        </p>
      </div>
    `
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      border-radius: 10px;
      background-color: white;
      min-width: 350px;
      box-shadow: 2px 2px 60px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.1)
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center
    }
    .avatar {
      height: 50px;
      width: 50px;
      border-radius: 50px;
      border: 2px solid rgba(0, 0, 255, 0.4)
    }
    .follow-btn {
      border-radius: 24px;
      border: 1px solid transparent;
      padding: 0.6em 1.4em;
      cursor: pointer;
      background-color: black;
      color: white;
      transition: all 150ms ease-out;
    }
    .follow-btn:hover, .follow-btn:focus {
      background-color: rgba(0, 0, 0, 0.6)
    }
    .follow-btn.following {
      background-color: white;
      color: rgba(0, 0, 0, 0.4);
      border-color: rgba(0, 0, 0, 0.4);
    }
    .body * {
      margin: 0;
      padding: 0;
    }
    .body .username {
      margin-top: 4px;
      font-weight: 300;
      font-size: 14px;
      color: #aaa;
    }
    .company {
      margin-top: 16px;
      line-height: 20px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'user-card': UserCard
  }
}
