export type DataItem = {
  id: string;
  wbs: string;
  con_name: string;
  con_sup: string;
  board: string;
  status: string | number;
};

export type CommitteeMember = {
  id: string;
  roleLabel: string;
  employeeId?: string;
  name?: string;
  position?: string;
};