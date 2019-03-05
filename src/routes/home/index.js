import { h, Component } from 'preact';
import style from './style';
import Anniversary from '../../components/anniversary';
import axios from 'axios';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Icon/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
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
		this.getDataFromDb('http://localhost:3000', 'dataAnniversary')
			.then( anniversaryArray => {
				anniversaryArray = this.addNbDaysInObject(anniversaryArray.data).sort(this.compare);
				this.setState({ dataFromDb: anniversaryArray });
			});
	}

	getDataFromDb(dbName, dataName) {
		//return request('get',`${dbName}/${dataName}`);
		return axios.get(`${dbName}/${dataName}`);
	}


	howManyDays(date) {
		const dateArray = date.split('/');
		const todayDate = new Date();
		const isBeforeTodayAndBirthday = todayDate.getMonth() * 30 + todayDate.getDay() - dateArray[1] * 30 + dateArray[0] < 0;
		let annivDate;
		if (isBeforeTodayAndBirthday)
			annivDate = new Date(todayDate.getFullYear(),dateArray[1]-1,dateArray[0]);
		else  annivDate = new Date(todayDate.getFullYear()+1,dateArray[1]-1,dateArray[0]);
		return Math.round((annivDate-todayDate)/(1000*60*60*24));
	}

	addNbDaysInObject(annivArray) {
		return annivArray.map(anniv => anniv = { ...anniv, nbDays: this.howManyDays(anniv.dateOfBirth) });
	}

	compare(a, b) {
		if (a.nbDays < b.nbDays) return -1;
		if (a.nbDays > b.nbDays) return 1;
		return 0;
	}

	getFinalData(dataFromDb) {
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
							{this.getFinalData(this.state.dataFromDb)}
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			</div>
		);
	}
}
