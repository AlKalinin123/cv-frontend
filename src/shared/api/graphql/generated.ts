/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
import { api } from '@/shared/api/graphql/base-api'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Void: { input: unknown; output: unknown }
}

export type AddCvProjectInput = {
  cvId: Scalars['ID']['input']
  end_date?: InputMaybe<Scalars['String']['input']>
  projectId: Scalars['ID']['input']
  responsibilities: Array<Scalars['String']['input']>
  roles: Array<Scalars['String']['input']>
  start_date: Scalars['String']['input']
}

export type AddCvSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  cvId: Scalars['ID']['input']
  mastery: Mastery
  name: Scalars['String']['input']
}

export type AddProfileLanguageInput = {
  name: Scalars['String']['input']
  proficiency: Proficiency
  userId: Scalars['ID']['input']
}

export type AddProfileSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  mastery: Mastery
  name: Scalars['String']['input']
  userId: Scalars['ID']['input']
}

export type AuthInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type AuthResult = {
  __typename?: 'AuthResult'
  access_token: Scalars['String']['output']
  refresh_token: Scalars['String']['output']
  user: User
}

export type CreateCvInput = {
  description: Scalars['String']['input']
  education?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type CreateDepartmentInput = {
  name: Scalars['String']['input']
}

export type CreateLanguageInput = {
  iso2: Scalars['String']['input']
  name: Scalars['String']['input']
  native_name?: InputMaybe<Scalars['String']['input']>
}

export type CreatePositionInput = {
  name: Scalars['String']['input']
}

export type CreateProfileInput = {
  first_name?: InputMaybe<Scalars['String']['input']>
  last_name?: InputMaybe<Scalars['String']['input']>
}

export type CreateProjectInput = {
  description: Scalars['String']['input']
  domain: Scalars['String']['input']
  end_date?: InputMaybe<Scalars['String']['input']>
  environment: Array<Scalars['String']['input']>
  name: Scalars['String']['input']
  start_date: Scalars['String']['input']
}

export type CreateSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
}

export type CreateUserInput = {
  auth: AuthInput
  cvsIds: Array<Scalars['String']['input']>
  departmentId?: InputMaybe<Scalars['ID']['input']>
  positionId?: InputMaybe<Scalars['ID']['input']>
  profile: CreateProfileInput
  role: UserRole
}

export type Cv = {
  __typename?: 'Cv'
  created_at: Scalars['String']['output']
  description: Scalars['String']['output']
  education?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  languages: Array<LanguageProficiency>
  name: Scalars['String']['output']
  projects?: Maybe<Array<CvProject>>
  skills: Array<SkillMastery>
  user?: Maybe<User>
}

export type CvProject = {
  __typename?: 'CvProject'
  description: Scalars['String']['output']
  domain: Scalars['String']['output']
  end_date?: Maybe<Scalars['String']['output']>
  environment: Array<Scalars['String']['output']>
  id: Scalars['ID']['output']
  internal_name: Scalars['String']['output']
  name: Scalars['String']['output']
  project: Project
  responsibilities: Array<Scalars['String']['output']>
  roles: Array<Scalars['String']['output']>
  start_date: Scalars['String']['output']
}

export type DeleteAvatarInput = {
  userId: Scalars['ID']['input']
}

export type DeleteCvInput = {
  cvId: Scalars['ID']['input']
}

export type DeleteCvSkillInput = {
  cvId: Scalars['ID']['input']
  name: Array<Scalars['String']['input']>
}

export type DeleteDepartmentInput = {
  departmentId: Scalars['ID']['input']
}

export type DeleteLanguageInput = {
  languageId: Scalars['ID']['input']
}

export type DeletePositionInput = {
  positionId: Scalars['ID']['input']
}

export type DeleteProfileInput = {
  userId: Scalars['ID']['input']
}

export type DeleteProfileLanguageInput = {
  name: Array<Scalars['String']['input']>
  userId: Scalars['ID']['input']
}

export type DeleteProfileSkillInput = {
  name: Array<Scalars['String']['input']>
  userId: Scalars['ID']['input']
}

export type DeleteProjectInput = {
  projectId: Scalars['ID']['input']
}

export type DeleteResult = {
  __typename?: 'DeleteResult'
  affected: Scalars['Int']['output']
}

export type DeleteSkillInput = {
  skillId: Scalars['ID']['input']
}

export type Department = {
  __typename?: 'Department'
  created_at: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type ExportPdfInput = {
  html: Scalars['String']['input']
  margin?: InputMaybe<MarginInput>
}

export type ForgotPasswordInput = {
  email: Scalars['String']['input']
}

export type Language = {
  __typename?: 'Language'
  created_at: Scalars['String']['output']
  id: Scalars['ID']['output']
  iso2: Scalars['String']['output']
  name: Scalars['String']['output']
  native_name?: Maybe<Scalars['String']['output']>
}

export type LanguageProficiency = {
  __typename?: 'LanguageProficiency'
  name: Scalars['String']['output']
  proficiency: Proficiency
}

export type LanguageProficiencyInput = {
  name: Scalars['String']['input']
  proficiency: Proficiency
}

export type Mail = {
  __typename?: 'Mail'
  created_at: Scalars['String']['output']
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  otp: Scalars['String']['output']
}

export type MarginInput = {
  bottom: Scalars['String']['input']
  left: Scalars['String']['input']
  right: Scalars['String']['input']
  top: Scalars['String']['input']
}

export enum Mastery {
  Advanced = 'Advanced',
  Competent = 'Competent',
  Expert = 'Expert',
  Novice = 'Novice',
  Proficient = 'Proficient',
}

export type Mutation = {
  __typename?: 'Mutation'
  addCvProject: Cv
  addCvSkill: Cv
  addProfileLanguage: Profile
  addProfileSkill: Profile
  createCv: Cv
  createDepartment: Department
  createLanguage: Language
  createPosition: Position
  createProject: Project
  createSkill: Skill
  createUser: User
  deleteAvatar?: Maybe<Scalars['Void']['output']>
  deleteCv: DeleteResult
  deleteCvSkill: Cv
  deleteDepartment: DeleteResult
  deleteLanguage: DeleteResult
  deletePosition: DeleteResult
  deleteProfileLanguage: Profile
  deleteProfileSkill: Profile
  deleteProject: DeleteResult
  deleteSkill: DeleteResult
  deleteUser: DeleteResult
  exportPdf: Scalars['String']['output']
  forgotPassword?: Maybe<Scalars['Void']['output']>
  removeCvProject: Cv
  resetPassword?: Maybe<Scalars['Void']['output']>
  signup: AuthResult
  updateCv: Cv
  updateCvProject: Cv
  updateCvSkill: Cv
  updateDepartment: Department
  updateLanguage: Language
  updatePosition: Position
  updateProfile: Profile
  updateProfileLanguage: Profile
  updateProfileSkill: Profile
  updateProject: Project
  updateSkill: Skill
  updateToken: UpdateTokenResult
  updateUser: User
  uploadAvatar: Scalars['String']['output']
  verifyMail?: Maybe<Scalars['Void']['output']>
}

export type MutationAddCvProjectArgs = {
  project: AddCvProjectInput
}

export type MutationAddCvSkillArgs = {
  skill: AddCvSkillInput
}

export type MutationAddProfileLanguageArgs = {
  language: AddProfileLanguageInput
}

export type MutationAddProfileSkillArgs = {
  skill: AddProfileSkillInput
}

export type MutationCreateCvArgs = {
  cv: CreateCvInput
}

export type MutationCreateDepartmentArgs = {
  department: CreateDepartmentInput
}

export type MutationCreateLanguageArgs = {
  language: CreateLanguageInput
}

export type MutationCreatePositionArgs = {
  position: CreatePositionInput
}

export type MutationCreateProjectArgs = {
  project: CreateProjectInput
}

export type MutationCreateSkillArgs = {
  skill: CreateSkillInput
}

export type MutationCreateUserArgs = {
  user: CreateUserInput
}

export type MutationDeleteAvatarArgs = {
  avatar: DeleteAvatarInput
}

export type MutationDeleteCvArgs = {
  cv: DeleteCvInput
}

export type MutationDeleteCvSkillArgs = {
  skill: DeleteCvSkillInput
}

export type MutationDeleteDepartmentArgs = {
  department: DeleteDepartmentInput
}

export type MutationDeleteLanguageArgs = {
  language: DeleteLanguageInput
}

export type MutationDeletePositionArgs = {
  position: DeletePositionInput
}

export type MutationDeleteProfileLanguageArgs = {
  language: DeleteProfileLanguageInput
}

export type MutationDeleteProfileSkillArgs = {
  skill: DeleteProfileSkillInput
}

export type MutationDeleteProjectArgs = {
  project: DeleteProjectInput
}

export type MutationDeleteSkillArgs = {
  skill: DeleteSkillInput
}

export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input']
}

export type MutationExportPdfArgs = {
  pdf: ExportPdfInput
}

export type MutationForgotPasswordArgs = {
  auth: ForgotPasswordInput
}

export type MutationRemoveCvProjectArgs = {
  project: RemoveCvProjectInput
}

export type MutationResetPasswordArgs = {
  auth: ResetPasswordInput
}

export type MutationSignupArgs = {
  auth: AuthInput
}

export type MutationUpdateCvArgs = {
  cv: UpdateCvInput
}

export type MutationUpdateCvProjectArgs = {
  project: UpdateCvProjectInput
}

export type MutationUpdateCvSkillArgs = {
  skill: UpdateCvSkillInput
}

export type MutationUpdateDepartmentArgs = {
  department: UpdateDepartmentInput
}

export type MutationUpdateLanguageArgs = {
  language: UpdateLanguageInput
}

export type MutationUpdatePositionArgs = {
  position: UpdatePositionInput
}

export type MutationUpdateProfileArgs = {
  profile: UpdateProfileInput
}

export type MutationUpdateProfileLanguageArgs = {
  language: UpdateProfileLanguageInput
}

export type MutationUpdateProfileSkillArgs = {
  skill: UpdateProfileSkillInput
}

export type MutationUpdateProjectArgs = {
  project: UpdateProjectInput
}

export type MutationUpdateSkillArgs = {
  skill: UpdateSkillInput
}

export type MutationUpdateUserArgs = {
  user: UpdateUserInput
}

export type MutationUploadAvatarArgs = {
  avatar: UploadAvatarInput
}

export type MutationVerifyMailArgs = {
  mail: VerifyMailInput
}

export type Position = {
  __typename?: 'Position'
  created_at: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export enum Proficiency {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  Native = 'Native',
}

export type Profile = {
  __typename?: 'Profile'
  avatar?: Maybe<Scalars['String']['output']>
  created_at: Scalars['String']['output']
  first_name?: Maybe<Scalars['String']['output']>
  full_name?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  languages: Array<LanguageProficiency>
  last_name?: Maybe<Scalars['String']['output']>
  skills: Array<SkillMastery>
}

export type Project = {
  __typename?: 'Project'
  created_at: Scalars['String']['output']
  description: Scalars['String']['output']
  domain: Scalars['String']['output']
  end_date?: Maybe<Scalars['String']['output']>
  environment: Array<Scalars['String']['output']>
  id: Scalars['ID']['output']
  internal_name: Scalars['String']['output']
  name: Scalars['String']['output']
  start_date: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  cv: Cv
  cvs: Array<Cv>
  departments: Array<Department>
  languages: Array<Maybe<Language>>
  login: AuthResult
  position: Position
  positions: Array<Position>
  profile: Profile
  project: Project
  projects: Array<Project>
  skillCategories: Array<SkillCategory>
  skills: Array<Skill>
  user: User
  users: Array<User>
}

export type QueryCvArgs = {
  cvId: Scalars['ID']['input']
}

export type QueryLoginArgs = {
  auth: AuthInput
}

export type QueryPositionArgs = {
  id: Scalars['ID']['input']
}

export type QueryProfileArgs = {
  userId: Scalars['ID']['input']
}

export type QueryProjectArgs = {
  projectId: Scalars['ID']['input']
}

export type QueryUserArgs = {
  userId: Scalars['ID']['input']
}

export type RemoveCvProjectInput = {
  cvId: Scalars['ID']['input']
  projectId: Scalars['ID']['input']
}

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input']
}

export type Skill = {
  __typename?: 'Skill'
  category?: Maybe<SkillCategory>
  category_name?: Maybe<Scalars['String']['output']>
  category_parent_name?: Maybe<Scalars['String']['output']>
  created_at: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type SkillCategory = {
  __typename?: 'SkillCategory'
  children: Array<SkillCategory>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  order: Scalars['Int']['output']
  parent?: Maybe<SkillCategory>
}

export type SkillMastery = {
  __typename?: 'SkillMastery'
  categoryId?: Maybe<Scalars['ID']['output']>
  mastery: Mastery
  name: Scalars['String']['output']
}

export type SkillMasteryInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  mastery: Mastery
  name: Scalars['String']['input']
}

export type UpdateCvInput = {
  cvId: Scalars['ID']['input']
  description: Scalars['String']['input']
  education?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type UpdateCvProjectInput = {
  cvId: Scalars['ID']['input']
  end_date?: InputMaybe<Scalars['String']['input']>
  projectId: Scalars['ID']['input']
  responsibilities: Array<Scalars['String']['input']>
  roles: Array<Scalars['String']['input']>
  start_date: Scalars['String']['input']
}

export type UpdateCvSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  cvId: Scalars['ID']['input']
  mastery: Mastery
  name: Scalars['String']['input']
}

export type UpdateDepartmentInput = {
  departmentId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type UpdateLanguageInput = {
  iso2: Scalars['String']['input']
  languageId: Scalars['ID']['input']
  name: Scalars['String']['input']
  native_name?: InputMaybe<Scalars['String']['input']>
}

export type UpdatePositionInput = {
  name: Scalars['String']['input']
  positionId: Scalars['ID']['input']
}

export type UpdateProfileInput = {
  first_name?: InputMaybe<Scalars['String']['input']>
  last_name?: InputMaybe<Scalars['String']['input']>
  userId: Scalars['ID']['input']
}

export type UpdateProfileLanguageInput = {
  name: Scalars['String']['input']
  proficiency: Proficiency
  userId: Scalars['ID']['input']
}

export type UpdateProfileSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  mastery: Mastery
  name: Scalars['String']['input']
  userId: Scalars['ID']['input']
}

export type UpdateProjectInput = {
  description: Scalars['String']['input']
  domain: Scalars['String']['input']
  end_date?: InputMaybe<Scalars['String']['input']>
  environment: Array<Scalars['String']['input']>
  name: Scalars['String']['input']
  projectId: Scalars['ID']['input']
  start_date: Scalars['String']['input']
}

export type UpdateSkillInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
  skillId: Scalars['ID']['input']
}

export type UpdateTokenResult = {
  __typename?: 'UpdateTokenResult'
  access_token: Scalars['String']['output']
  refresh_token: Scalars['String']['output']
}

export type UpdateUserInput = {
  cvsIds?: InputMaybe<Array<Scalars['String']['input']>>
  departmentId?: InputMaybe<Scalars['ID']['input']>
  positionId?: InputMaybe<Scalars['ID']['input']>
  role?: InputMaybe<UserRole>
  userId: Scalars['ID']['input']
}

export type UploadAvatarInput = {
  base64: Scalars['String']['input']
  size: Scalars['Int']['input']
  type: Scalars['String']['input']
  userId: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  created_at: Scalars['String']['output']
  cvs?: Maybe<Array<Cv>>
  department?: Maybe<Department>
  department_name?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  is_verified: Scalars['Boolean']['output']
  position?: Maybe<Position>
  position_name?: Maybe<Scalars['String']['output']>
  profile: Profile
  role: UserRole
}

export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
}

export type VerifyMailInput = {
  otp: Scalars['String']['input']
}

export type GetCvsQueryVariables = Exact<{ [key: string]: never }>

export type GetCvsQuery = { cvs: Array<{ id: string; name: string }> }

export type GetDepartmentsQueryVariables = Exact<{ [key: string]: never }>

export type GetDepartmentsQuery = {
  departments: Array<{ id: string; name: string }>
}

export type CreateDepartmentMutationVariables = Exact<{
  input: CreateDepartmentInput
}>

export type CreateDepartmentMutation = { createDepartment: { name: string } }

export type UpdateDepartmentMutationVariables = Exact<{
  input: UpdateDepartmentInput
}>

export type UpdateDepartmentMutation = {
  updateDepartment: { id: string; name: string }
}

export type DeleteDepartmentMutationVariables = Exact<{
  input: DeleteDepartmentInput
}>

export type DeleteDepartmentMutation = {
  deleteDepartment: { affected: number }
}

export type LoginQueryVariables = Exact<{
  auth: AuthInput
}>

export type LoginQuery = {
  login: {
    access_token: string
    refresh_token: string
    user: { id: string; email: string; role: UserRole }
  }
}

export type GetPositionsQueryVariables = Exact<{ [key: string]: never }>

export type GetPositionsQuery = {
  positions: Array<{ id: string; name: string }>
}

export type CreatePositionMutationVariables = Exact<{
  input: CreatePositionInput
}>

export type CreatePositionMutation = { createPosition: { name: string } }

export type UpdateProfileMutationVariables = Exact<{
  profile: UpdateProfileInput
}>

export type UpdateProfileMutation = {
  updateProfile: {
    id: string
    first_name: string | null
    last_name: string | null
    avatar: string | null
  }
}

export type SignupMutationVariables = Exact<{
  auth: AuthInput
}>

export type SignupMutation = {
  signup: {
    access_token: string
    refresh_token: string
    user: { id: string; email: string; role: UserRole }
  }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  users: Array<{
    id: string
    created_at: string
    email: string
    role: UserRole
    profile: {
      avatar: string | null
      first_name: string | null
      last_name: string | null
    }
    cvs: Array<{ id: string; name: string }> | null
    department: { id: string; name: string } | null
    position: { id: string; name: string } | null
  }>
}

export type GetUserByIdQueryVariables = Exact<{
  userId: string | number
}>

export type GetUserByIdQuery = {
  user: {
    id: string
    created_at: string
    is_verified: boolean
    email: string
    role: UserRole
    profile: {
      avatar: string | null
      first_name: string | null
      last_name: string | null
    }
    cvs: Array<{ id: string; name: string }> | null
    department: { id: string; name: string } | null
    position: { id: string; name: string } | null
  }
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = {
  createUser: {
    email: string
    role: UserRole
    profile: { first_name: string | null; last_name: string | null }
  }
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = { updateUser: { id: string } }

export type DeleteUserMutationVariables = Exact<{
  input: string | number
}>

export type DeleteUserMutation = { deleteUser: { affected: number } }

export const GetCvsDocument = `
    query GetCvs {
  cvs {
    id
    name
  }
}
    `
export const GetDepartmentsDocument = `
    query GetDepartments {
  departments {
    id
    name
  }
}
    `
export const CreateDepartmentDocument = `
    mutation CreateDepartment($input: CreateDepartmentInput!) {
  createDepartment(department: $input) {
    name
  }
}
    `
export const UpdateDepartmentDocument = `
    mutation UpdateDepartment($input: UpdateDepartmentInput!) {
  updateDepartment(department: $input) {
    id
    name
  }
}
    `
export const DeleteDepartmentDocument = `
    mutation DeleteDepartment($input: DeleteDepartmentInput!) {
  deleteDepartment(department: $input) {
    affected
  }
}
    `
export const LoginDocument = `
    query Login($auth: AuthInput!) {
  login(auth: $auth) {
    access_token
    refresh_token
    user {
      id
      email
      role
    }
  }
}
    `
export const GetPositionsDocument = `
    query GetPositions {
  positions {
    id
    name
  }
}
    `
export const CreatePositionDocument = `
    mutation CreatePosition($input: CreatePositionInput!) {
  createPosition(position: $input) {
    name
  }
}
    `
export const UpdateProfileDocument = `
    mutation UpdateProfile($profile: UpdateProfileInput!) {
  updateProfile(profile: $profile) {
    id
    first_name
    last_name
    avatar
  }
}
    `
export const SignupDocument = `
    mutation Signup($auth: AuthInput!) {
  signup(auth: $auth) {
    access_token
    refresh_token
    user {
      id
      email
      role
    }
  }
}
    `
export const GetUsersDocument = `
    query GetUsers {
  users {
    id
    created_at
    email
    role
    profile {
      avatar
      first_name
      last_name
    }
    cvs {
      id
      name
    }
    department {
      id
      name
    }
    position {
      id
      name
    }
  }
}
    `
export const GetUserByIdDocument = `
    query GetUserById($userId: ID!) {
  user(userId: $userId) {
    id
    created_at
    is_verified
    email
    role
    profile {
      avatar
      first_name
      last_name
    }
    cvs {
      id
      name
    }
    department {
      id
      name
    }
    position {
      id
      name
    }
  }
}
    `
export const CreateUserDocument = `
    mutation CreateUser($input: CreateUserInput!) {
  createUser(user: $input) {
    profile {
      first_name
      last_name
    }
    email
    role
  }
}
    `
export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(user: $input) {
    id
  }
}
    `
export const DeleteUserDocument = `
    mutation DeleteUser($input: ID!) {
  deleteUser(userId: $input) {
    affected
  }
}
    `

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: import.meta.hot != null,
  endpoints: (build) => ({
    GetCvs: build.query<GetCvsQuery, GetCvsQueryVariables | void>({
      query: (variables) => ({ document: GetCvsDocument, variables }),
    }),
    GetDepartments: build.query<
      GetDepartmentsQuery,
      GetDepartmentsQueryVariables | void
    >({
      query: (variables) => ({ document: GetDepartmentsDocument, variables }),
    }),
    CreateDepartment: build.mutation<
      CreateDepartmentMutation,
      CreateDepartmentMutationVariables
    >({
      query: (variables) => ({ document: CreateDepartmentDocument, variables }),
    }),
    UpdateDepartment: build.mutation<
      UpdateDepartmentMutation,
      UpdateDepartmentMutationVariables
    >({
      query: (variables) => ({ document: UpdateDepartmentDocument, variables }),
    }),
    DeleteDepartment: build.mutation<
      DeleteDepartmentMutation,
      DeleteDepartmentMutationVariables
    >({
      query: (variables) => ({ document: DeleteDepartmentDocument, variables }),
    }),
    Login: build.query<LoginQuery, LoginQueryVariables>({
      query: (variables) => ({ document: LoginDocument, variables }),
    }),
    GetPositions: build.query<
      GetPositionsQuery,
      GetPositionsQueryVariables | void
    >({
      query: (variables) => ({ document: GetPositionsDocument, variables }),
    }),
    CreatePosition: build.mutation<
      CreatePositionMutation,
      CreatePositionMutationVariables
    >({
      query: (variables) => ({ document: CreatePositionDocument, variables }),
    }),
    UpdateProfile: build.mutation<
      UpdateProfileMutation,
      UpdateProfileMutationVariables
    >({
      query: (variables) => ({ document: UpdateProfileDocument, variables }),
    }),
    Signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: (variables) => ({ document: SignupDocument, variables }),
    }),
    GetUsers: build.query<GetUsersQuery, GetUsersQueryVariables | void>({
      query: (variables) => ({ document: GetUsersDocument, variables }),
    }),
    GetUserById: build.query<GetUserByIdQuery, GetUserByIdQueryVariables>({
      query: (variables) => ({ document: GetUserByIdDocument, variables }),
    }),
    CreateUser: build.mutation<CreateUserMutation, CreateUserMutationVariables>(
      {
        query: (variables) => ({ document: CreateUserDocument, variables }),
      },
    ),
    UpdateUser: build.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
      {
        query: (variables) => ({ document: UpdateUserDocument, variables }),
      },
    ),
    DeleteUser: build.mutation<DeleteUserMutation, DeleteUserMutationVariables>(
      {
        query: (variables) => ({ document: DeleteUserDocument, variables }),
      },
    ),
  }),
})

export { injectedRtkApi as api }
export const {
  useGetCvsQuery,
  useLazyGetCvsQuery,
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useLoginQuery,
  useLazyLoginQuery,
  useGetPositionsQuery,
  useLazyGetPositionsQuery,
  useCreatePositionMutation,
  useUpdateProfileMutation,
  useSignupMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = injectedRtkApi
