import PropTypes from 'prop-types';
import Modal from './Modal';
import { useState } from 'react';
import './Accordion.scss';

export default function Accordion({ assessment, id }) {
	const [active, setActive] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Modal id={id} title={`Edit: ${assessment.AssessmentName}`} show={showModal} setShowModal={setShowModal}>
				<p>Hello this is some test data</p>
			</Modal>

			<div className="accordion" id="accordionExample">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button className={`accordion-button row ${active ? '' : 'collapsed'}`} type="button" onClick={() => setActive(!active)}>
							<div className="col-sm-8">{assessment.AssessmentName}</div>
							<div className="col-sm-3">{new Date(assessment.AssessmentPublishdate).toLocaleDateString('en-GB')}</div>
						</button>
					</h2>
					<div id={`collapse_${id}`} className={`accordion-collapse collapse ${active ? 'show' : ''}`}>
						<div className="accordion-body">
							<p>{assessment.AssessmentAssessmenttypeDescription}</p>
							<p>Page URL: <a href={assessment.AssessmentBriefURL}>{assessment.AssessmentBriefURL}</a></p>
							<button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
								Launch static backdrop modal
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Accordion.propTypes = {
	id: PropTypes.number,
	assessment: PropTypes.object,
	/* assessment: PropTypes.shape({
		AssessmentID: PropTypes.number,
		AssessmentName: PropTypes.string,
		AssessmentPublishdate: PropTypes.string,
		AssessmentSubmissiondate:PropTypes.string,
		AssessmentFeedbackdate:PropTypes.string,
		AssessmentBriefURL: PropTypes.string,
		AssessmentModuleID: PropTypes.string,
		AssessmentAssessmentTypeID: PropTypes.number,
		AssessmentModuleName: PropTypes.string,
		AssessmenttypeDescription: PropTypes.string,
	}), */
};
