import Card from '../UI/Card';
import PropTypes from 'prop-types';
import '../../styles/Tasks.scss';

export default function Tasks({ tasks }) {
	return (
		<Card title={'Assessment'}>
			<div className="accordion" id="accordionExample">
				{tasks.map(task => (
					<div className="accordion-item" key={task.id}>
						<h2 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse_${tasks.indexOf(task)}`} aria-expanded="false" aria-controls="collapseOne">
								{task.AssessmentName} <span className="time">{task.AssessmentPublishdate.split(',')[0]}</span>
							</button>
						</h2>
						<div id={`collapse_${tasks.indexOf(task)}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
							<div className="accordion-body">
								{task.AssessmentTypeDescription}
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}

Tasks.propTypes = {
	tasks: PropTypes.array,
};
