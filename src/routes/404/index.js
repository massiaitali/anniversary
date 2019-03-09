import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class NotFound extends Component {
	render() {
		return (
			<div className={`${style.home} page`}>
				<h2 className=" mdc-typography--title">La page n'existe pas</h2>
				<Card>
					<Card.Title className={style.cardBody}>
						Si le problème persiste, merci de le signaler
					</Card.Title>
					<Card.Actions>
						<Card.ActionButton><button><a className="mailto" href="mailto:massi.aitali@gmail.com">Signaler</a></button></Card.ActionButton>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
