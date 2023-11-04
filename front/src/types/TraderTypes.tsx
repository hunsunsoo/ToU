/** 거래명세서 상세조회 type */
export interface StatementData {
  statementSeq: number;
  tradeDate: string;
  totalPrice: number;
  reqInfo: CompanyInfo;
  resInfo: CompanyInfo;
  itemList: Item[];
}

interface CompanyInfo {
  companySeq: number;
  companyName: string;
  registrationNumber: string;
  branchName: string;
  branchLocation: string;
  branchContact: string;
  branchType: string;
  workerSeq: number;
  workerName: string;
}

interface Item {
  stockSeq: number;
  stockCode: string;
  stockQuantity: number;
  stockUnit: string;
  stockPrice: number;
  stockTotalPrice: number;
  note: string | null;
}


/** 현재 접속정보 type */
// export interface CurrentConnectionResponse {
//   status: number;
//   data: CurrentConnectionData;
// }

// export interface CurrentConnectionData {
//   worker: Worker;
//   company: Company;
//   branches: Branch[];
// }

// interface Worker {
//   workerName: string;
//   loginId: string;
// }

// interface Company {
//   companySeq: number;
//   companyName: string;
//   registrationNumber: string;
//   companyLocation: string;
//   companyContact: string;
//   logoImage: string;
// }

// interface Branch {
//   branchSeq: number;
//   branchName: string;
//   branchType: string;
// }
