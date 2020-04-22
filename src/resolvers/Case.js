const getField = field => root => {
	let x = root.fields.find(x => x.name === field) || { value: '' }
	return x.value
}

const readableCaseStatus = x =>
	({
		1: 'Request',
		2: 'Pending',
		3: 'Open',
		4: 'Closed',
		5: 'Withdrawn',
		6: 'Decision Issued',
		7: 'Withdrawn (Settled)',
		8: 'Withdrawn Before CMC',
		9: 'Withdrawn Before CMC (Settled)',
		10: 'Decision Issued: Upheld',
		11: 'Decision Issued: Dismissed',
		12: 'ADR (Withdrawn Before)',
		13: 'ADR Agreement (Withdrawn)',
		14: 'ADR Agreement (Not Withdrawn)',
		15: 'ADR No Agreement',
	}[x])

export default {
	accClaimNumber: getField('reviewNumber'),
	applicantName: getField('applicantName'),
	respondent: root => root.defendant,
	status: root => ({
		id: root.status,
		name: root.statusName,
		readable: readableCaseStatus(root.status),
	}),
	type: root => ({
		id: root.caseType,
		name: root.caseTypeName,
		readable: root.caseTypeName,
	}),
	advocates: root => {
		return root.applicant ? root.applicant.parties : []
	},
}
