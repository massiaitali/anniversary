import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Editer from '../editer'
import style from './style';
import { deleteDataFromDb } from '../../Utils'
import 'preact-material-components/Card/style.css';

export default class Anniversary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			logo: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			placeOfBirth: '',
		};
	}

	onClickDelete(id){
		const { parentContext } = this.props;
		deleteDataFromDb('http://localhost:3000', 'dataAnniversary', id)
			.then(res => parentContext.putDataInState());

	}

	render() {
		const { id, firstName, lastName, dateOfBirth, placeOfBirth, logo, nbDays } = this.props;
		return (
			<div className={style.card}>
				<Card>
					<Card.Title className={style.cardHeader}>
						<div>
							<img alt={firstName} src={logo} className={style.logo}/>
							<h2 className=" mdc-typography--title">{firstName} {lastName}</h2>
						</div>
						<div className=" mdc-typography--caption">Dans {nbDays} jours</div>
					</Card.Title>
					<Card.Body className={style.cardBody}>
						Née le {dateOfBirth} à {placeOfBirth}
					</Card.Body>
					<Card.Actions>
						<Card.ActionIcons>
							<Editer
								id={id}
								grandParentContext={this.props.parentContext}
								firstName={firstName}
								lastName={lastName}
								dateOfBirth={dateOfBirth}
								placeOfBirth={placeOfBirth}
								logo={logo}
							/>
						</Card.ActionIcons>
						<Card.ActionIcon onClick={e => this.onClickDelete(id)}>delete</Card.ActionIcon>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
