import { useState } from 'react';
import { Layout } from '../layout';
import { Card } from '../UI';
import APIWrapper from '../../utils/API';


export default function AddAssessmentCard() {
	// Initialisation -----------------------------------------------
	const defaultPublishDate = new Date().toISOString().slice(0, -8);
	const defaultSubmissionDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, -8);
	const defaultFeedbackDate = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().slice(0, -8);

	const jsonDate = Date.now();
	const adjustedTimeInMS = jsonDate + (1000 * 60 * 60 * 24 * 3);
	const adjustedDate = new Date(adjustedTimeInMS).toISOString().slice(0, -3);

	const conformance = {
		html2js : {
			AssessmentID: (value) => (value === 0 ? null : parseInt(value)),
			AssessmentName: (value) => (value === '' ? null : value),
			AssessmentPercentage: (value) => (value === 0 ? null : parseInt(value)),
			AssessmentPublishdate: (value) => (value === null ? null : new Date(value)),
			AssessmentSubmissiondate: (value) => (value === null ? null : new Date(value)),
			AssessmentFeedbackdate: (value) => (value === null ? null : new Date(value)),
			AssessmentBriefURL: (value) => (value === '' ? null : value),
			AssessmentModuleID: (value) => (value === 0 ? null : parseInt(value)),
			AssessmentAssessmenttypeID: (value) => (value === 0 ? null : parseInt(value)),
			AssessmentModuleName: (value) => (value === '' ? null : value),
			AssessmentAssessmenttypeDescription: (value) => (value === '' ? null : value),
		},

		js2html : {
			AssessmentID: (value) => (value === null ? 0 : value),
			AssessmentName: (value) => (value === null ? '' : value),
			AssessmentPercentage: (value) => (value === null ? 0 : value),
			AssessmentPublishdate: (value) => (value === null ? '' : new Date(value).toISOString().slice(0, -8)),
			AssessmentSubmissiondate: (value) => (value === null ? '' : new Date(value).toISOString().slice(0, -8)),
			AssessmentFeedbackdate: (value) => (value === null ? '' : new Date(value).toISOString().slice(0, -8)),
			AssessmentBriefURL: (value) => (value === null ? '' : value),
			AssessmentModuleID: (value) => (value === null ? 0 : value),
			AssessmentAssessmenttypeID: (value) => (value === null ? 0 : value),
			AssessmentModuleName: (value) => (value === null ? '' : value),
			AssessmentAssessmenttypeDescription: (value) => (value === null ? '' : value),
		},
	};
	const API = new APIWrapper();
	const apiURL = 'http://softwarehub.uk/unibase/api';
	const assessmentEndpoint = `${apiURL}/assessments`;

	// State --------------------------------------------------------
	const [assessment, setAssessment] = useState({
		AssessmentID: 0,
		AssessmentName: null,
		AssessmentPercentage: 0,
		AssessmentPublishdate: defaultPublishDate,
		AssessmentSubmissiondate: defaultSubmissionDate,
		AssessmentFeedbackdate: defaultFeedbackDate,
		AssessmentBriefURL: null,
		AssessmentModuleID: 1,
		AssessmentAssessmenttypeID: 0,
		AssessmentModuleName: null,
		AssessmentAssessmenttypeDescription: null,
	});
	const [modules, setModules] = useState([]);


	const apiPost = async (endpoint, record) => {
		record.AssessmentFeedbackdate = new Date(record.AssessmentFeedbackdate).toISOString();
		record.AssessmentPublishdate = new Date(record.AssessmentPublishdate).toISOString();
		record.AssessmentSubmissiondate = new Date(record.AssessmentSubmissiondate).toISOString();
		console.log(record.AssessmentFeedbackdate);

		// Build request object
		const request = {
			method: 'POST',
			body: JSON.stringify(record),
			headers: { 'Content-type': 'application/json' },
		};

		// Call the fetch
		const response = await fetch(endpoint, request);
		const result = await response.json();
		return response.status >= 200 && response.status < 300
			? { isSuccess: true }
			: { isSuccess: false, message: result.message };
	};

	(async () => {
		const data = await API.get('/modules');
		setModules(data);
	})();


	// Handlers -----------------------------------------------------
	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(name, value);
		setAssessment({ ...assessment, [name]: conformance.html2js[name](value) });
	};

	const handleSubmit = async () => {
		console.log(`Assessment=[${JSON.stringify(assessment)}]`);

		const result = await apiPost(assessmentEndpoint, assessment);

		result.isSuccess
			? console.log('Insert successful')
			: console.log(`Insert not successful: ${result.message}`);
	};

	return (
		<>
			<Layout />
			<Card title="Add an Assessment">
				<div className="row">
					<div className="col-lg-6">
						<div className="input-group">
							<label htmlFor="AssessmentID">Assessment ID</label>
							<input type="Number" className="input-field" id="AssessmentID" name="AssessmentID" value={conformance.js2html['AssessmentID'](assessment.AssessmentID)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentName">Name: </label>
							<input type="text" className="input-field" id="AssessmentName" name="AssessmentName" value={conformance.js2html['AssessmentName'](assessment.AssessmentName)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentPercentage">Percentage</label>
							<input type="Number" className="input-field" id="AssessmentPercentage" name="AssessmentPercentage" value={conformance.js2html['AssessmentPercentage'](assessment.AssessmentPercentage)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentPublishdate">Publish Date:</label>
							<input type="datetime-local" className="input-field" id="AssessmentPublishdate" name="AssessmentPublishdate" value={conformance.js2html['AssessmentPublishdate'](assessment.AssessmentPublishdate)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentSubmissiondate">Submission Date:</label>
							<input type="datetime-local" className="input-field" id="AssessmentSubmissiondate" name="AssessmentSubmissiondate" value={conformance.js2html['AssessmentSubmissiondate'](assessment.AssessmentSubmissiondate)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentFeedbackdate">Feedback Date:</label>
							<input type="datetime-local" className="input-field" id="AssessmentFeedbackdate" name="AssessmentFeedbackdate" value={conformance.js2html['AssessmentFeedbackdate'](assessment.AssessmentFeedbackdate)} onChange={handleChange} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="input-group">
							<label htmlFor="AssessmentBriefURL">Brief URL:</label>
							<input type="text" className="input-field" id="AssessmentBriefURL" name="AssessmentBriefURL" value={conformance.js2html['AssessmentBriefURL'](assessment.AssessmentBriefURL)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentModuleID">Module:</label>
							<select className="input-field" id="AssessmentModuleID" name="AssessmentModuleID" value={conformance.js2html['AssessmentModuleID'](assessment.AssessmentModuleID)} onChange={handleChange}>
								{modules.map(m => (
									<option value={m.ModuleID} key={m.ModuleID}>{m.ModuleName}</option>
								))}
							</select>
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentAssessmenttypeID">Type ID:</label>
							<input type="Number" className="input-field" id="AssessmentAssessmenttypeID" name="AssessmentAssessmenttypeID" value={conformance.js2html['AssessmentAssessmenttypeID'](assessment.AssessmentAssessmenttypeID)} onChange={handleChange} />
						</div>
						<div className="input-group">
							<label htmlFor="AssessmentAssessmenttypeDescription">Description:</label>
							<textarea type="text" className="input-field" id="AssessmentAssessmenttypeDescription" name="AssessmentAssessmenttypeDescription" value={conformance.js2html['AssessmentAssessmenttypeDescription'](assessment.AssessmentAssessmenttypeDescription)} onChange={handleChange}></textarea>
						</div>
						<button className="btn btn-secondary" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
					</div>
				</div>
			</Card>
		</>
	);
}
