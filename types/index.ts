export type DataItem = {
  id: string;
  wbs: string;
  jobName: string;
  supervisor: string;
  chairman: string;
  firstCommittee: string;
  secondCommittee:string
  jobStatus: string | number;
};

export type CommitteeMember = {
  id: string;
  roleLabel: string;
  employeeId?: string;
  name?: string;
  position?: string;
};