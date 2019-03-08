import axios from 'axios';

export function  getDataFromDb(dbName, dataName) {
	//return request('get',`${dbName}/${dataName}`);
	return axios.get(`${dbName}/${dataName}`);
}

export function addNbDaysInObject(annivArray) {
	return annivArray.map(anniv => anniv = { ...anniv, nbDays: howManyDays(anniv.dateOfBirth) });
}

export function dataFromInputToFrenchFormat(date) {
	const dateArray = date.split('-');
	return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

export function dataFromFrenchFormatToInput(date) {
	const dateArray = date.split('/');
	return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}

export function deleteDataFromDb(dbName, dataName, id) {
	return axios.delete(`${dbName}/${dataName}/${id}`);
}

export function howManyDays(date) {
	const dateArray = date.split('/');
	const todayDate = new Date();
	const isBeforeTodayAndBirthday = todayDate.getMonth() * 30 + todayDate.getDay() - dateArray[1] * 30 + dateArray[0] < 0;
	let annivDate;
	if (isBeforeTodayAndBirthday)
		annivDate = new Date(todayDate.getFullYear(),dateArray[1]-1,dateArray[0]);
	else  annivDate = new Date(todayDate.getFullYear()+1,dateArray[1]-1,dateArray[0]);
	return Math.round((annivDate-todayDate)/(1000*60*60*24));
}

export function addUserInDb(newBirthday, dbName, dataName){
	return axios.post(
		`${dbName}/${dataName}`,
		newBirthday,
		{
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			}
		}
	);
}

export function updateUserInDb(newBirthday, dbName, dataName, id){
	return axios.put(
		`${dbName}/${dataName}/${id}`,
		newBirthday,
		{
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			}
		}
	);
}

export function ascSort(a, b) {
	if (a.nbDays < b.nbDays) return -1;
	if (a.nbDays > b.nbDays) return 1;
	return 0;
}

const Utils = {
	getDataFromDb,
	addNbDaysInObject,
	howManyDays,
	ascSort,
	dataFromInputToFrenchFormat,
	deleteDataFromDb,
	dataFromFrenchFormatToInput,
	updateUserInDb
};

export default Utils;