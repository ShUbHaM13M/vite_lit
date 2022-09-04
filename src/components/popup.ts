import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

enum PopupVariant {
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

@customElement('custom-popup')
export class Popup extends LitElement {

	@property({
		type: {} as PopupProps, converter: (value, _) => {
			return value && JSON.parse(value) as PopupProps
		}
	})
	props!: PopupProps

	@property({ type: PopupVariant })
	variant: PopupVariant = PopupVariant.PRIMARY

	@property({ type: Function, attribute: false })
	onPrimaryActionClickedCB: Function = () => { }

	@property({ type: Function, attribute: false })
	onSecondaryActionClickedCB!: Function

	_hidePopup() {
		this.props = { ...this.props, isShown: false }
	}

	_onCancelClick() {
		this._hidePopup()
		this.onSecondaryActionClickedCB && this.onSecondaryActionClickedCB()
	}

	_onAcceptClick() {
		this._hidePopup()
		this.onPrimaryActionClickedCB && this.onPrimaryActionClickedCB()
	}

	render() {

		return html`
			<div 
				@click=${ this._hidePopup }
				style="backdrop-filter: ${ this.props?.isBackdropBlurred && 'blur(4px)' }" 
				class="overlay ${ this.props.isShown && 'active' }">

				<div 
					class="body ${ this.variant }" 
					@click=${ (e: MouseEvent) => e.stopPropagation() }
				>
					<h3 class="title">${ this.props?.title }</h3>
					<p class="description">${ this.props?.description }</p>
					<div class="actions">
						<button class="secondary" @click=${ this._onCancelClick }>
							${ this.props?.secondaryActionLabel || "Cancel" }
						</button>
						<button class="primary" @click=${ this._onAcceptClick }>
							${ this.props?.primaryActionLabel || "Accept" }
						</button>
					</div>
				</div>

			</div>
		`
	}

	static styles = css`
		:host { }
		:host * {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		.overlay {
			background-color: rgba(0, 0, 0, 0.4);
			height: 100%;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			display: grid;
			place-items: center;
			opacity: 0;
			pointer-events: none;
			user-select: none;
			transition: all ease-out 350ms;
		}
		.overlay.active {
			opacity: 1;
			pointer-events: all;
			user-select: auto;		
		}
		.body {
			overflow: hidden;
			min-width: 350px;
			max-width: 350px;
			background-color: white;
			border-radius: 8px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			box-shadow: 4px 4px 60px 0 rgba(0, 0, 0, 0.1);
		}
		.body.danger .title {
			background-color: rgba(255, 0, 0);
			color: white;
		}
		.body.warning .title {
			background-color: rgba(255, 140, 0);
			color: white;
		}
		.title {
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			padding: 0.8em;
			text-align: center;
		}
		.description {
			margin: 1em;
			min-height: 100px
		}
		.actions {
			display: flex;
			gap: 1em;
			margin: 1em;
			justify-content: center;
		}
		.actions button {
			font-size: 1rem;
			cursor: pointer;
			border: none;
			border-radius: 4px;
			outline: none;
			padding: 0.8em 1.2em;
			border: 2px solid transparent;
			transition: all ease-out 150ms;
		}
		button.primary {
			background-color: rgba(0, 125, 255);
			color: white;
		}
		button:hover, button:focus {
			border: 2px dotted rgba(0, 0, 0, 0.8);
		}
		button.primary:hover, button.primary:focus {
			background-color: rgba(0, 125, 255, 0.4);
			color: black
		}
	`;

}

declare global {
	interface HTMLElementTagNameMap {
		'custom-popup': Popup
	}
}