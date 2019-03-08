import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';
import style from './style';
import { dataFromFrenchFormatToInput, updateUserInDb, dataFromInputToFrenchFormat } from '../../Utils'
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/TextField/style.css';


export default class Editer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: this.props.logo,
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			dateOfBirth: dataFromFrenchFormatToInput(this.props.dateOfBirth),
			placeOfBirth: this.props.placeOfBirth
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			logo: nextProps.logo,
			firstName: nextProps.firstName,
			lastName: nextProps.lastName,
			dateOfBirth: dataFromFrenchFormatToInput(nextProps.dateOfBirth),
			placeOfBirth: nextProps.placeOfBirth
		});
	}

	submit() {
		const { id, grandParentContext } = this.props
		let formVals = this.state;
		const oneIsNotCompleted = Object.keys(formVals).some(key => formVals[key] === '');
		if (!oneIsNotCompleted) {
			formVals.dateOfBirth = dataFromInputToFrenchFormat(formVals.dateOfBirth);
			formVals = JSON.stringify(formVals);
			updateUserInDb(formVals, 'http://localhost:3000', 'dataAnniversary', id)
				.then(res => {
					formVals = JSON.parse(formVals);
					formVals.dateOfBirth = dataFromFrenchFormatToInput(formVals.dateOfBirth);
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
