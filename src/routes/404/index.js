import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class NotFound extends Component {
	render() {
		return (
			<div className={`${style.home} page`}>
				<Card>
					<div className={style.cardHeader}>
						<h2 className=" mdc-typography--title">Aucune url éxiste</h2>
					</div>
					<div className={style.cardBody}>
						Si le problème persiste, merci de le signaler
					</div>
				</Card>
			</div>
		);
	}
}
