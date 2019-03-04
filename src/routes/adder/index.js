import { h, Component } from 'preact';
import style from './style';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import TextField, { Input } from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import request from 'sync-request';

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo : "",
			firstName : "",
			lastName : "",
			dateOfBirth : "",
			placeOfBirth : ""
		};
	}

	addUserInDb(newBirthday, dbName, dataName){
		return request(
			'PUT',
			`${dbName}/${dataName}/10`,
			{body: newBirthday}
		);
	}

	submit() {
		let formVals = this.state;
		const oneIsNotCompleted = Object.keys(formVals).some(key => formVals[key] === '');
		if(!oneIsNotCompleted) {
			formVals.dateOfBirth = formVals.dateOfBirth.replace('-', '/').replace('-', '/');
			this.addUserInDb(formVals, 'http://localhost:3000', 'dataAnniversary')
		}
	}

	addValueInState(e, nameInput) {
		let state = this.state;
		state[nameInput] = e.currentTarget.value;
		this.setState(state);
	}

	render() {
		return (
			<div className={`${style.add} page`}>
				<h1>Ajouter un anniversaire</h1>
				<Card className={style.card}>
					<div className={style.cardBody}>
						<div className={style.fieldInput}>
							<TextField
								helperText="Url du logo"
								helperTextPersistent
								type="text"
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e, 'logo')}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Prénom"
								helperTextPersistent
								type="text"
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e, 'firstName')}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Nom"
								helperTextPersistent
								type="text"
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e, 'lastName')}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Date de naissance"
								helperTextPersistent
								type="date"
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e, 'dateOfBirth')}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Lieu de naissance"
								helperTextPersistent
								type="text"
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e, 'placeOfBirth')}
							/>
						</div>
					</div>
					<Card.Actions>
							<Card.ActionIcon onClick={ e => this.submit() }>add</Card.ActionIcon>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
