import { h, Component } from 'preact';
import style from './style';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import TextField, { Input } from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import FormField from 'preact-material-components/FormField';
import 'preact-material-components/FormField/style.css';

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	submit() {
		console.log(this.state);
		/*const { formData } = this.state;
		const oneIsNotCompleted = formData.some(input => input.value === '');
		if(oneIsNotCompleted) {
			console.log('in process');
		}*/
		return false;
	}

	addValueInState(e) {
		console.log('before add', this.state);
		this.setState({value: e.currentTarget.value});
		console.log('after add', this.state);
	}

	render() {
		return (
			<div className={`${style.add} page`}>
				<h1>Ajouter un anniversaire</h1>
				<Card className={style.card}>
					<div className={style.cardBody}>
						<FormField>
							<TextField
								label="Your name"
								type="text"
								outlined={true}
								fullwidth={true}
								onKeyUp={(e) => this.addValueInState(e)}
							/>
						</FormField>
					</div>
					<Card.Actions>
							<Card.ActionIcon onClick={ e => this.submit() }>add</Card.ActionIcon>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
