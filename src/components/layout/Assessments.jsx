import Card from '../UI/Card';
import Accordion from '../UI/Accordion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import APIWrapper from '../../utils/API';
import './Assessments.scss';

export default function Assessments({ moduleID }) {
	const API = new APIWrapper();
	const [studentAssessments, setStudentAssessments] = useState(null);

	// Function for updating assessment list based on search query
	function autoComplete(e) {
		const search = e.target.value;
		if (search) {
			setStudentAssessments(studentAssessments.filter(c => c.moduleName.startsWith(search)));
		} else {
			fetchStudentAssessments();
		}
	}

	// Function for sorting assessment list based on option
	async function sortChange(e) {
		const sort = e.target.value;

		switch (sort) {
			case 'oldest': {
				const assessments = await fetchStudentAssessments();
				return setStudentAssessments(assessments.sort((a, b) => new Date(b.AssessmentPublishdate) - new Date(a.AssessmentPublishdate)));
			}
			case 'newest': {
				const assessments = await fetchStudentAssessments();
				return setStudentAssessments(assessments.sort((a, b) => new Date(a.AssessmentPublishdate) - new Date(b.AssessmentPublishdate)));
			}
			default:
				setStudentAssessments(await fetchStudentAssessments());
		}
	}

	// Function for fetching students assessments
	const fetchStudentAssessments = async (updateState = false) => {
		try {
			const response = await API.get('assessments');
			if (response.error) throw new Error('Error');
			if (updateState) setStudentAssessments(response);
			return response;
		} catch (err) {
			console.log(err);
			if (updateState) setStudentAssessments([]);
			return [];
		}
	};

	// Fetch student assessments on page load
	useEffect(() => {
		fetchStudentAssessments(true);
	}, []);

	// Filter based on input
	let moduleAssessments = [];
	if (moduleID == null || moduleID == 1) {
		moduleAssessments = studentAssessments;
	} else {
		moduleAssessments = studentAssessments.filter(sa => sa.AssessmentModuleName == moduleID);
	}

	return (
		<Card title={'Assessment'}>
			<>
				<div className="row">
					<div className="col-sm-8">
						<input type="text" className="form-control" placeholder="Search" onChange={(e) => autoComplete(e)}/>
					</div>
					<div className="col-sm-3">
						<select name="sort" id="sortSelect" className="form-control" onChange={(e) => sortChange(e)}>
							<option value="relevant">Relevant</option>
							<option value="oldest">Oldest</option>
							<option value="newest">Newest</option>
						</select>
					</div>
				</div>
				{moduleAssessments == null || moduleAssessments.length == 0 ?
					<p>No Assessments</p> :
					<>
						{moduleAssessments.map(task => (
							<Accordion task={task} id={task.AssessmentID} key={task.AssessmentID} />
						))}
					</>
				}
			</>
		</Card>
	);
}

Assessments.propTypes = {
	moduleID: PropTypes.string,
};
