import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';
import request from 'sync-request';

export default class Anniversary extends Component {

	constructor(props) {
		super(props);
	}

	deleteDataFromDb(dbName, dataName, id) {
		return request(
			'DELETE',
			`${dbName}/${dataName}/${id}`
		);
	}

	onClickDelete(id){
		const { context } = this.props;
		this.deleteDataFromDb('http://localhost:3000', 'dataAnniversary', id);
		context.putDataInState();
	}

	render() {
		const { id, firstName, lastName, dateOfBirth, placeOfBirth, logo, nbDays } = this.props;
		return (
			<div className={style.card}>
				<Card>
					<div className={style.cardHeader}>
						<h2 className=" mdc-typography--title">{firstName} {lastName}</h2>
						<img alt={firstName} src={'../../assets/profiles/'+logo} className={style.logo}/>
						<div className=" mdc-typography--caption">Dans {nbDays} jours</div>
					</div>
					<div className={style.cardBody}>
						Née le {dateOfBirth} à {placeOfBirth}
					</div>
					<Card.Actions>
						<Card.ActionIcons>
							<Card.ActionIcon onClick={ e => this.onClickDelete(id) }>delete</Card.ActionIcon>
						</Card.ActionIcons>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
