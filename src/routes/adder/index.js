import { h, Component } from 'preact';
import style from './style';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import TextField from 'preact-material-components/TextField';
import { addUserInDb, dataFromInputToFrenchFormat } from '../../Utils'
import 'preact-material-components/Card/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/LayoutGrid/style.css';

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			placeOfBirth: ''
		};
	}

	submit() {
		let formVals = this.state;
		const oneIsNotCompleted = Object.keys(formVals).some(key => formVals[key] === '');
		if (!oneIsNotCompleted) {
			formVals.dateOfBirth = dataFromInputToFrenchFormat(formVals.dateOfBirth);
			formVals = JSON.stringify(formVals);
			addUserInDb(formVals, 'http://localhost:3000', 'dataAnniversary').then(res => {
				this.setState({
					logo: '',
					firstName: '',
					lastName: '',
					dateOfBirth: '',
					placeOfBirth: ''
				});
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
			<div className={`${style.add} page`}>
				<h1>Ajouter un anniversaire</h1>
				<LayoutGrid>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="6">
							<Card className={style.card}>
								<div className={style.cardBody}>
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
								</div>
								<Card.Actions>
									<Card.ActionIcon onClick={e => this.submit()}>add</Card.ActionIcon>
								</Card.Actions>
							</Card>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
