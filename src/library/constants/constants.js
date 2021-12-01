const role = {
  Management: 'Site Yönetimi',
  CompanyAdmin: 'Şirket Yönetimi',
  UserManagement: 'Kullanıcı Yönetimi',
  TemplateManagement: 'Template Yönetimi',
  ProjectManagement: 'Project Manager',
  HR: 'HR',
  FinanceManager: 'FinanceManager'
}

const language = {
  TR: 'tr',
  EN: 'en'
}

const logType = {
  ERROR: 4,
  WARNING: 2,
  INFO: 1
}

const timeAm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const timePm = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const UserExists = '11001'
const UserNotFoundInAd = '11002'

const GroupExists = '12001'
const GroupHasUser = '12002'

const Failed = '10001'

// File error messages,
const UPLOAD_FILE_FAILED = '20000'
const UPLOAD_FILE_PARTIAL_FAILED = '20001'
const UPLOAD_FILE_BULK_SUCCESS = '20002'
const UPLOAD_FILE_BULK_FAILED = '20003'

const RECORD_FOUND = '30000'
const RECORD_NOT_FOUND = '30001'
const EMAIL_FAILED = '40001'

const ActiveUserControl = {
  SetActiveUser: 'SetActiveUser',
  RemoveActiveUser: 'RemoveActiveUser'
}

const ReportType = {
  Payroll: 'Payroll',
  Invoice: 'Invoice',
  Expense: 'Expense'
}

const ForecastServiceFieldTypes = {
  Money: 1,
  Text: 2,
  Number: 3,
  Percent: 4
}

const GridFieldTypes = {
  Money: 'money',
  Text: 'text',
  Label: 'label',
  Number: 'number',
  Link: 'link',
  Percent: 'percent'
}

const ProjectTypes = {
  ClientProject: 1,
  InternalProject: 2,
  BD: 3,
  Corporate: 4,
  Pricing: 5,
  PricingBD: 6
}

const ProjectStatus = {
  Active: 1,
  Passive: 2,
  Draft: 3,
  WaitingForApproval: 4
}

const ScopeTypes = {
  Project: 1,
  Forecast: 2
}

export default {
  role: role,
  language: language,
  logType: logType,
  timeAm: timeAm,
  timePm: timePm,
  userExists: UserExists,
  userNotFoundInAd: UserNotFoundInAd,
  groupExists: GroupExists,
  groupHasUser: GroupHasUser,
  failed: Failed,
  UPLOAD_FILE_FAILED: UPLOAD_FILE_FAILED,
  UPLOAD_FILE_PARTIAL_FAILED: UPLOAD_FILE_PARTIAL_FAILED,
  UPLOAD_FILE_BULK_SUCCESS: UPLOAD_FILE_BULK_SUCCESS,
  UPLOAD_FILE_BULK_FAILED: UPLOAD_FILE_BULK_FAILED,
  RECORD_FOUND: RECORD_FOUND,
  RECORD_NOT_FOUND: RECORD_NOT_FOUND,
  EMAIL_FAILED: EMAIL_FAILED,
  activeUserControl: ActiveUserControl,

  reportType: ReportType,
  GridFieldTypes: GridFieldTypes,
  ForecastServiceFieldTypes: ForecastServiceFieldTypes,
  ProjectTypes: ProjectTypes,
  ProjectStatus: ProjectStatus,
  ScopeTypes: ScopeTypes
}
