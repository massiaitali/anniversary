import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/TextField/style.css';
import style from './style';
import axios from 'axios';


export default class Editer extends Component {
	constructor(props) {
		super(props);
		const dateArray = this.props.dateOfBirth.split('/');
		this.state = {
			logo: this.props.logo,
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			dateOfBirth: `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`,
			placeOfBirth: this.props.placeOfBirth
		};
	}

	addUserInDb(newBirthday, dbName, dataName, id){
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

	submit() {
		const { id, grandParentContext } = this.props
		let formVals = this.state;
		const oneIsNotCompleted = Object.keys(formVals).some(key => formVals[key] === '');
		if (!oneIsNotCompleted) {
			const dateArray = formVals.dateOfBirth.split('-');
			formVals.dateOfBirth = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
			formVals = JSON.stringify(formVals);
			this.addUserInDb(formVals, 'http://localhost:3000', 'dataAnniversary', id)
				.then(res => {
					formVals = JSON.parse(formVals);
					const dateArray = formVals.dateOfBirth.split('/');
					formVals.dateOfBirth = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
					this.setState(formVals);
					grandParentContext.putDataInState();
				});
		}
	}

	addValueInState(e, nameInput) {
		let state = this.state;
		state[nameInput] = e.currentTarget.value;
		this.setState(state);
	}

	render() {
		const { firstName, lastName, dateOfBirth, placeOfBirth, logo } = this.props;
		return (
			<div>
				<Card.ActionIcon onClick={ ()=>{ this.editBirthday.MDComponent.show(); } }>edit</Card.ActionIcon>
				<Dialog ref={scrollingDlg=>{this.editBirthday=scrollingDlg;}}>
					<Dialog.Header>Mettre à jour l'anniversaire</Dialog.Header>
					<Dialog.Body>
						<div className={style.fieldInput}>
							<TextField
								helperText="Url du logo"
								helperTextPersistent
								type="text"
								fullwidth
								onKeyUp={(e) => this.addValueInState(e, 'logo')}
								value={this.state.logo}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Prenom"
								helperTextPersistent
								type="text"
								fullwidth
								onKeyUp={(e) => this.addValueInState(e, 'firstName')}
								value={this.state.firstName}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Nom"
								helperTextPersistent
								type="text"
								fullwidth
								onKeyUp={(e) => this.addValueInState(e, 'lastName')}
								value={this.state.lastName}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Date de naissance"
								helperTextPersistent
								type="date"
								fullwidth
								onKeyUp={(e) => this.addValueInState(e, 'dateOfBirth')}
								value={this.state.dateOfBirth}
							/>
						</div>
						<div className={style.fieldInput}>
							<TextField
								helperText="Lieu de naissance"
								helperTextPersistent
								type="text"
								fullwidth
								onKeyUp={(e) => this.addValueInState(e, 'placeOfBirth')}
								value={this.state.placeOfBirth}
							/>
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel={true}>Annuler</Dialog.FooterButton>
						<Dialog.FooterButton onClick={e => this.submit()} accept={true}>Accepter</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
