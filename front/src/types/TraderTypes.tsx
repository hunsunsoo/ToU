/** 거래명세서 상세조회 type */
export interface StatementData {
  statementSeq: number;
  tradeDate: string;
  totalPrice: number;
  reqInfo: CompanyInfo | null;
  resInfo: CompanyInfo | null;
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


export interface TraderStateTableProps {
  selectedRole: string;
  statementList: Array<{
    reqORres: number;
    statementSeq: number;
    branchName: string;
    productName: string;
    tradeDate: string;
    statementStatus: string;
  }>;
}
