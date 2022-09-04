
import users from '../data/users.json';

function delay(amount: number) {
	return new Promise(resolve => setTimeout(resolve, amount))
}

export async function getUsers(delayAmount = 3000) {
	await delay(delayAmount);
	return users;
}
