import { Component } from 'preact';
import style from './style';
import Anniversary from '../../components/anniversary';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import { getDataFromDb, addNbDaysInObject, ascSort } from '../../Utils'
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Icon/style.css';
import 'preact-material-components/LayoutGrid/style.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { dataFromDb: [] };
	}

	componentDidMount() {
		this.putDataInState();
	}

	putDataInState() {
		getDataFromDb('http://localhost:3000', 'dataAnniversary')
			.then( anniversaryArray => {
				anniversaryArray = addNbDaysInObject(anniversaryArray.data).sort(ascSort);
				this.setState({ dataFromDb: anniversaryArray });
			});
	}

	getAllAnniversary(dataFromDb) {
		const allAnniversary = dataFromDb.map(single => (
			<LayoutGrid.Cell cols="4">
				<Anniversary
					id={single.id}
					firstName={single.firstName}
					lastName={single.lastName}
					dateOfBirth={single.dateOfBirth}
					placeOfBirth={single.placeOfBirth}
					logo={single.logo}
					nbDays={single.nbDays}
					parentContext={this}
				/>
			</LayoutGrid.Cell>));
		return allAnniversary;
	}

	render() {
		return (
			<div className={`${style.home} page`}>
				<h1>Les anniversaires à venir</h1>
				<div className={`${style.containerCard}`}>
					<LayoutGrid>
						<LayoutGrid.Inner>
							{this.getAllAnniversary(this.state.dataFromDb)}
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			</div>
		);
	}
}
