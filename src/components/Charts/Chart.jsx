import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import './style.scss';

class Chart extends React.Component {
	formatDate = (date) => {
		const d = new Date(date);
		const m = d.getMonth()+1 > 9 ? d.getMonth()+1 : `0${d.getMonth()+1}`;
		return `${d.getDate()}/${m}`;
	};

	render() {
		return (
			<div className="chart">
				<XYPlot
					width={600}
					height={300}
				>
					<VerticalGridLines/>
					<HorizontalGridLines/>
					<XAxis
						title={this.props.x || "days"}
						attr="x"
						attrAxis="y"
						orientation="bottom"
						tickFormat={(d) => {return this.formatDate(d)}}
					/>
					<YAxis
						title={ this.props.y }
						attr="y"
						attrAxis="x"
						orientation="left"
					/>
					<LineSeries
						curve={'curveMonotoneX'}
						data={this.props.data}/>
					{this.props.data2 && <LineSeries
						stroke="fuchsia"
						curve={'curveMonotoneX'}
						data={this.props.data2}/> }
				</XYPlot>
			</div>
		);
	}
};

export default Chart;
