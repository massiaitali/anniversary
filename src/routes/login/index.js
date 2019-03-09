import { h, Component } from 'preact';
import style from './style';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/LayoutGrid/style.css';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`${style.login} page`}>
				<h1>Connexion</h1>
				<LayoutGrid>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="6">
							<Card className={style.card}>
								<Card.Body className={style.cardBody}>
									<div className={style.fieldInput}>
										<TextField
											label="Mail"
											type="mail"
											fullwidth
										/>
										<div className={style.fieldInput}>
											<TextField
												label="Mot de passe"
												type="password"
												fullwidth
											/>
										</div>
									</div>
								</Card.Body>
								<Card.Actions>
									<Card.ActionIcon>check</Card.ActionIcon>
								</Card.Actions>
							</Card>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
