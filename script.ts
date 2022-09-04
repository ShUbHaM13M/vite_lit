import { getUsers } from './src/services/user-service'
import { User } from './src/types/user'
import { UserCard } from './src/user-card'
import { Popup } from './src/components/popup'

const cardContainer = document.querySelector('.card-container')
const showPopupBtn = document.querySelector('#showPopupBtn')
const popup = document.querySelector('#custom-popup') as Popup

getUsers(500).then(data => renderUsers(data))

function onPopupCancel() {
	console.log("Popup canceled")
}
function onAcceptClicked() {
	console.log("Accepted the terms")
}

popup.onSecondaryActionClickedCB = onPopupCancel
popup.onPrimaryActionClickedCB = onAcceptClicked

function renderUsers(users: User[]) {
	for (let user of users) {
		const userCard = document.createElement("user-card") as UserCard
		userCard.setAttribute('user', JSON.stringify(user));
		userCard.onFollowClickedCB = onFollowClicked
		cardContainer?.appendChild(userCard)
	}
}

showPopupBtn?.addEventListener('click', () => {
	popup.props = { ...popup.props, isShown: true }
})

function onFollowClicked(data: User) {
	console.log(data)
}