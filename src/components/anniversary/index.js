import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import axios from 'axios';
import style from './style';

export default class Anniversary extends Component {

	constructor(props) {
		super(props);
	}

	deleteDataFromDb(dbName, dataName, id) {
		return axios.delete(`${dbName}/${dataName}/${id}`);
	}

	onClickDelete(id){
		const { context } = this.props;
		this.deleteDataFromDb('http://localhost:3000', 'dataAnniversary', id)
			.then(res => context.putDataInState())

	}

	render() {
		const { id, firstName, lastName, dateOfBirth, placeOfBirth, logo, nbDays } = this.props;
		return (
			<div className={style.card}>
				<Card>
					<div className={style.cardHeader}>
						<div>
							<img alt={firstName} src={logo} className={style.logo}/>
							<h2 className=" mdc-typography--title">{firstName} {lastName}</h2>
						</div>
						<div className=" mdc-typography--caption">Dans {nbDays} jours</div>
					</div>
					<div className={style.cardBody}>
						Née le {dateOfBirth} à {placeOfBirth}
					</div>
					<Card.Actions>
						<Card.ActionIcons>
							<Card.ActionIcon>edit</Card.ActionIcon>
						</Card.ActionIcons>
						<Card.ActionIcon onClick={ e => this.onClickDelete(id) }>delete</Card.ActionIcon>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
