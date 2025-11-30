export type Employee = {
  id: number;
  employeeId: string;
  title: string;
  firstName: string;
  lastName: string;
  position: string;
  businessArea: string;
  businessAreaName: string;
  deptChangeCode: string;
  positionWithDeptName: string;
};

export type DataItem = {
  id: number; // เปลี่ยนจาก string เป็น number
  wbs: string;
  jobName: string;
  businessAreaCode: string;
  createdDate: string;
  jobId: number;
  jobStatus: string; // ลบ | number ออก
  jobStatusTH: string;
  planNo: string;
  planVersion: number;
  sapStatus: string;
  description: string;
  constructOffice: string;
  manageOffice: string;
  subdistrict: string;
  district: string;
  latitude: string;
  longtitude: string;
  factorId: string;
  documentNo: string;
  documentEstDate: string;
  factorValue: number;
  extraCost: number;
  deptChangeCode: string;
  estimator: Employee | null;
  supervisor: Employee | null;
  chairman: Employee | null;
  firstCommittee: Employee | null;
  secondCommittee: Employee | null;
  isSupervisor: boolean | null;
  total : number;
};

export type CommitteeMember = {
  id: string;
  roleLabel: string;
  employeeId: string;
  name: string;
  position: string;
};

export type Person = {
  title?: string;
  firstName?: string;
  lastName?: string;
};