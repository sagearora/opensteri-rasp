import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  citext: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  smallint: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "appointment" */
export type Appointment = {
  __typename?: 'appointment';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  emr_id?: Maybe<Scalars['String']['output']>;
  endtime_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  patient: Patient;
  patient_id: Scalars['uuid']['output'];
  starttime_at: Scalars['timestamptz']['output'];
  state?: Maybe<Appointment_State_Enum>;
  /** An array relationship */
  steri_labels: Array<Steri_Label>;
  /** An aggregate relationship */
  steri_labels_aggregate: Steri_Label_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "appointment" */
export type AppointmentSteri_LabelsArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


/** columns and relationships of "appointment" */
export type AppointmentSteri_Labels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};

/** aggregated selection of "appointment" */
export type Appointment_Aggregate = {
  __typename?: 'appointment_aggregate';
  aggregate?: Maybe<Appointment_Aggregate_Fields>;
  nodes: Array<Appointment>;
};

/** aggregate fields of "appointment" */
export type Appointment_Aggregate_Fields = {
  __typename?: 'appointment_aggregate_fields';
  avg?: Maybe<Appointment_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Appointment_Max_Fields>;
  min?: Maybe<Appointment_Min_Fields>;
  stddev?: Maybe<Appointment_Stddev_Fields>;
  stddev_pop?: Maybe<Appointment_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Appointment_Stddev_Samp_Fields>;
  sum?: Maybe<Appointment_Sum_Fields>;
  var_pop?: Maybe<Appointment_Var_Pop_Fields>;
  var_samp?: Maybe<Appointment_Var_Samp_Fields>;
  variance?: Maybe<Appointment_Variance_Fields>;
};


/** aggregate fields of "appointment" */
export type Appointment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Appointment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Appointment_Avg_Fields = {
  __typename?: 'appointment_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "appointment". All fields are combined with a logical 'AND'. */
export type Appointment_Bool_Exp = {
  _and?: InputMaybe<Array<Appointment_Bool_Exp>>;
  _not?: InputMaybe<Appointment_Bool_Exp>;
  _or?: InputMaybe<Array<Appointment_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  emr_id?: InputMaybe<String_Comparison_Exp>;
  endtime_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  patient?: InputMaybe<Patient_Bool_Exp>;
  patient_id?: InputMaybe<Uuid_Comparison_Exp>;
  starttime_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  state?: InputMaybe<Appointment_State_Enum_Comparison_Exp>;
  steri_labels?: InputMaybe<Steri_Label_Bool_Exp>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "appointment" */
export enum Appointment_Constraint {
  /** unique or primary key constraint on columns "emr_id", "clinic_id" */
  AppointmentClinicIdSyncIdKey = 'appointment_clinic_id_sync_id_key',
  /** unique or primary key constraint on columns "id" */
  AppointmentPkey = 'appointment_pkey'
}

/** input type for incrementing numeric columns in table "appointment" */
export type Appointment_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "appointment" */
export type Appointment_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  endtime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  patient?: InputMaybe<Patient_Obj_Rel_Insert_Input>;
  patient_id?: InputMaybe<Scalars['uuid']['input']>;
  starttime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  state?: InputMaybe<Appointment_State_Enum>;
  steri_labels?: InputMaybe<Steri_Label_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Appointment_Max_Fields = {
  __typename?: 'appointment_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  emr_id?: Maybe<Scalars['String']['output']>;
  endtime_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  patient_id?: Maybe<Scalars['uuid']['output']>;
  starttime_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Appointment_Min_Fields = {
  __typename?: 'appointment_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  emr_id?: Maybe<Scalars['String']['output']>;
  endtime_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  patient_id?: Maybe<Scalars['uuid']['output']>;
  starttime_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "appointment" */
export type Appointment_Mutation_Response = {
  __typename?: 'appointment_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Appointment>;
};

/** input type for inserting object relation for remote table "appointment" */
export type Appointment_Obj_Rel_Insert_Input = {
  data: Appointment_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Appointment_On_Conflict>;
};

/** on_conflict condition type for table "appointment" */
export type Appointment_On_Conflict = {
  constraint: Appointment_Constraint;
  update_columns?: Array<Appointment_Update_Column>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};

/** Ordering options when selecting data from "appointment". */
export type Appointment_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  emr_id?: InputMaybe<Order_By>;
  endtime_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  patient?: InputMaybe<Patient_Order_By>;
  patient_id?: InputMaybe<Order_By>;
  starttime_at?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: appointment */
export type Appointment_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "appointment" */
export enum Appointment_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  EmrId = 'emr_id',
  /** column name */
  EndtimeAt = 'endtime_at',
  /** column name */
  Id = 'id',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  StarttimeAt = 'starttime_at',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "appointment" */
export type Appointment_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  endtime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  patient_id?: InputMaybe<Scalars['uuid']['input']>;
  starttime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  state?: InputMaybe<Appointment_State_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "appointment_state" */
export type Appointment_State = {
  __typename?: 'appointment_state';
  id: Scalars['String']['output'];
};

/** aggregated selection of "appointment_state" */
export type Appointment_State_Aggregate = {
  __typename?: 'appointment_state_aggregate';
  aggregate?: Maybe<Appointment_State_Aggregate_Fields>;
  nodes: Array<Appointment_State>;
};

/** aggregate fields of "appointment_state" */
export type Appointment_State_Aggregate_Fields = {
  __typename?: 'appointment_state_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Appointment_State_Max_Fields>;
  min?: Maybe<Appointment_State_Min_Fields>;
};


/** aggregate fields of "appointment_state" */
export type Appointment_State_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Appointment_State_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "appointment_state". All fields are combined with a logical 'AND'. */
export type Appointment_State_Bool_Exp = {
  _and?: InputMaybe<Array<Appointment_State_Bool_Exp>>;
  _not?: InputMaybe<Appointment_State_Bool_Exp>;
  _or?: InputMaybe<Array<Appointment_State_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "appointment_state" */
export enum Appointment_State_Constraint {
  /** unique or primary key constraint on columns "id" */
  AppointmentStatePkey = 'appointment_state_pkey'
}

export enum Appointment_State_Enum {
  Finished = 'finished',
  InProgress = 'in_progress',
  NotStarted = 'not_started'
}

/** Boolean expression to compare columns of type "appointment_state_enum". All fields are combined with logical 'AND'. */
export type Appointment_State_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Appointment_State_Enum>;
  _in?: InputMaybe<Array<Appointment_State_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Appointment_State_Enum>;
  _nin?: InputMaybe<Array<Appointment_State_Enum>>;
};

/** input type for inserting data into table "appointment_state" */
export type Appointment_State_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Appointment_State_Max_Fields = {
  __typename?: 'appointment_state_max_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Appointment_State_Min_Fields = {
  __typename?: 'appointment_state_min_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "appointment_state" */
export type Appointment_State_Mutation_Response = {
  __typename?: 'appointment_state_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Appointment_State>;
};

/** on_conflict condition type for table "appointment_state" */
export type Appointment_State_On_Conflict = {
  constraint: Appointment_State_Constraint;
  update_columns?: Array<Appointment_State_Update_Column>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};

/** Ordering options when selecting data from "appointment_state". */
export type Appointment_State_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: appointment_state */
export type Appointment_State_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "appointment_state" */
export enum Appointment_State_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "appointment_state" */
export type Appointment_State_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "appointment_state" */
export type Appointment_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Appointment_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Appointment_State_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "appointment_state" */
export enum Appointment_State_Update_Column {
  /** column name */
  Id = 'id'
}

export type Appointment_State_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Appointment_State_Set_Input>;
  /** filter the rows which have to be updated */
  where: Appointment_State_Bool_Exp;
};

/** aggregate stddev on columns */
export type Appointment_Stddev_Fields = {
  __typename?: 'appointment_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Appointment_Stddev_Pop_Fields = {
  __typename?: 'appointment_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Appointment_Stddev_Samp_Fields = {
  __typename?: 'appointment_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "appointment" */
export type Appointment_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Appointment_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Appointment_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  endtime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  patient_id?: InputMaybe<Scalars['uuid']['input']>;
  starttime_at?: InputMaybe<Scalars['timestamptz']['input']>;
  state?: InputMaybe<Appointment_State_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Appointment_Sum_Fields = {
  __typename?: 'appointment_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "appointment" */
export enum Appointment_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  EmrId = 'emr_id',
  /** column name */
  EndtimeAt = 'endtime_at',
  /** column name */
  Id = 'id',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  StarttimeAt = 'starttime_at',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Appointment_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Appointment_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Appointment_Set_Input>;
  /** filter the rows which have to be updated */
  where: Appointment_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Appointment_Var_Pop_Fields = {
  __typename?: 'appointment_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Appointment_Var_Samp_Fields = {
  __typename?: 'appointment_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Appointment_Variance_Fields = {
  __typename?: 'appointment_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['citext']['input']>;
  _gt?: InputMaybe<Scalars['citext']['input']>;
  _gte?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']['input']>;
  _in?: InputMaybe<Array<Scalars['citext']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']['input']>;
  _lt?: InputMaybe<Scalars['citext']['input']>;
  _lte?: InputMaybe<Scalars['citext']['input']>;
  _neq?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']['input']>;
  _nin?: InputMaybe<Array<Scalars['citext']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']['input']>;
};

/** columns and relationships of "clinic" */
export type Clinic = {
  __typename?: 'clinic';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  default_printer?: Maybe<Printer>;
  default_printer_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['citext']['output'];
  /** An array relationship */
  printers: Array<Printer>;
  /** An aggregate relationship */
  printers_aggregate: Printer_Aggregate;
  steri_item_expiry_days: Scalars['Int']['output'];
  /** An array relationship */
  steri_items: Array<Steri_Item>;
  /** An aggregate relationship */
  steri_items_aggregate: Steri_Item_Aggregate;
  /** An array relationship */
  sterilizers: Array<Sterilizer>;
  /** An aggregate relationship */
  sterilizers_aggregate: Sterilizer_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  users: Array<User>;
  /** An aggregate relationship */
  users_aggregate: User_Aggregate;
};


/** columns and relationships of "clinic" */
export type ClinicPrintersArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicPrinters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicSteri_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicSteri_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicSterilizersArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicSterilizers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "clinic" */
export type ClinicUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** aggregated selection of "clinic" */
export type Clinic_Aggregate = {
  __typename?: 'clinic_aggregate';
  aggregate?: Maybe<Clinic_Aggregate_Fields>;
  nodes: Array<Clinic>;
};

/** aggregate fields of "clinic" */
export type Clinic_Aggregate_Fields = {
  __typename?: 'clinic_aggregate_fields';
  avg?: Maybe<Clinic_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Clinic_Max_Fields>;
  min?: Maybe<Clinic_Min_Fields>;
  stddev?: Maybe<Clinic_Stddev_Fields>;
  stddev_pop?: Maybe<Clinic_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Clinic_Stddev_Samp_Fields>;
  sum?: Maybe<Clinic_Sum_Fields>;
  var_pop?: Maybe<Clinic_Var_Pop_Fields>;
  var_samp?: Maybe<Clinic_Var_Samp_Fields>;
  variance?: Maybe<Clinic_Variance_Fields>;
};


/** aggregate fields of "clinic" */
export type Clinic_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Clinic_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Clinic_Avg_Fields = {
  __typename?: 'clinic_avg_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "clinic". All fields are combined with a logical 'AND'. */
export type Clinic_Bool_Exp = {
  _and?: InputMaybe<Array<Clinic_Bool_Exp>>;
  _not?: InputMaybe<Clinic_Bool_Exp>;
  _or?: InputMaybe<Array<Clinic_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  default_printer?: InputMaybe<Printer_Bool_Exp>;
  default_printer_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<Citext_Comparison_Exp>;
  printers?: InputMaybe<Printer_Bool_Exp>;
  printers_aggregate?: InputMaybe<Printer_Aggregate_Bool_Exp>;
  steri_item_expiry_days?: InputMaybe<Int_Comparison_Exp>;
  steri_items?: InputMaybe<Steri_Item_Bool_Exp>;
  steri_items_aggregate?: InputMaybe<Steri_Item_Aggregate_Bool_Exp>;
  sterilizers?: InputMaybe<Sterilizer_Bool_Exp>;
  sterilizers_aggregate?: InputMaybe<Sterilizer_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
  users_aggregate?: InputMaybe<User_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "clinic" */
export enum Clinic_Constraint {
  /** unique or primary key constraint on columns "id" */
  ClinicPkey = 'clinic_pkey'
}

/** input type for incrementing numeric columns in table "clinic" */
export type Clinic_Inc_Input = {
  steri_item_expiry_days?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "clinic" */
export type Clinic_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_printer?: InputMaybe<Printer_Obj_Rel_Insert_Input>;
  default_printer_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  printers?: InputMaybe<Printer_Arr_Rel_Insert_Input>;
  steri_item_expiry_days?: InputMaybe<Scalars['Int']['input']>;
  steri_items?: InputMaybe<Steri_Item_Arr_Rel_Insert_Input>;
  sterilizers?: InputMaybe<Sterilizer_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Clinic_Max_Fields = {
  __typename?: 'clinic_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_printer_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  steri_item_expiry_days?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Clinic_Min_Fields = {
  __typename?: 'clinic_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_printer_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  steri_item_expiry_days?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "clinic" */
export type Clinic_Mutation_Response = {
  __typename?: 'clinic_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Clinic>;
};

/** input type for inserting object relation for remote table "clinic" */
export type Clinic_Obj_Rel_Insert_Input = {
  data: Clinic_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Clinic_On_Conflict>;
};

/** on_conflict condition type for table "clinic" */
export type Clinic_On_Conflict = {
  constraint: Clinic_Constraint;
  update_columns?: Array<Clinic_Update_Column>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};

/** Ordering options when selecting data from "clinic". */
export type Clinic_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_printer?: InputMaybe<Printer_Order_By>;
  default_printer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  printers_aggregate?: InputMaybe<Printer_Aggregate_Order_By>;
  steri_item_expiry_days?: InputMaybe<Order_By>;
  steri_items_aggregate?: InputMaybe<Steri_Item_Aggregate_Order_By>;
  sterilizers_aggregate?: InputMaybe<Sterilizer_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
};

/** primary key columns input for table: clinic */
export type Clinic_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "clinic" */
export enum Clinic_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultPrinterId = 'default_printer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SteriItemExpiryDays = 'steri_item_expiry_days',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "clinic" */
export type Clinic_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_printer_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  steri_item_expiry_days?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Clinic_Stddev_Fields = {
  __typename?: 'clinic_stddev_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Clinic_Stddev_Pop_Fields = {
  __typename?: 'clinic_stddev_pop_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Clinic_Stddev_Samp_Fields = {
  __typename?: 'clinic_stddev_samp_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "clinic" */
export type Clinic_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Clinic_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Clinic_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_printer_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  steri_item_expiry_days?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Clinic_Sum_Fields = {
  __typename?: 'clinic_sum_fields';
  steri_item_expiry_days?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "clinic" */
export enum Clinic_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultPrinterId = 'default_printer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SteriItemExpiryDays = 'steri_item_expiry_days',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Clinic_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Clinic_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Clinic_Set_Input>;
  /** filter the rows which have to be updated */
  where: Clinic_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Clinic_Var_Pop_Fields = {
  __typename?: 'clinic_var_pop_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Clinic_Var_Samp_Fields = {
  __typename?: 'clinic_var_samp_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Clinic_Variance_Fields = {
  __typename?: 'clinic_variance_fields';
  steri_item_expiry_days?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "count" */
export type Count = {
  __typename?: 'count';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  expected_counts: Scalars['jsonb']['output'];
  final_count: Scalars['jsonb']['output'];
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['bigint']['output'];
  /** An array relationship */
  steri_labels: Array<Steri_Label>;
  /** An aggregate relationship */
  steri_labels_aggregate: Steri_Label_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "count" */
export type CountExpected_CountsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "count" */
export type CountFinal_CountArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "count" */
export type CountSteri_LabelsArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


/** columns and relationships of "count" */
export type CountSteri_Labels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};

/** aggregated selection of "count" */
export type Count_Aggregate = {
  __typename?: 'count_aggregate';
  aggregate?: Maybe<Count_Aggregate_Fields>;
  nodes: Array<Count>;
};

/** aggregate fields of "count" */
export type Count_Aggregate_Fields = {
  __typename?: 'count_aggregate_fields';
  avg?: Maybe<Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Count_Max_Fields>;
  min?: Maybe<Count_Min_Fields>;
  stddev?: Maybe<Count_Stddev_Fields>;
  stddev_pop?: Maybe<Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Count_Stddev_Samp_Fields>;
  sum?: Maybe<Count_Sum_Fields>;
  var_pop?: Maybe<Count_Var_Pop_Fields>;
  var_samp?: Maybe<Count_Var_Samp_Fields>;
  variance?: Maybe<Count_Variance_Fields>;
};


/** aggregate fields of "count" */
export type Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Count_Append_Input = {
  expected_counts?: InputMaybe<Scalars['jsonb']['input']>;
  final_count?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type Count_Avg_Fields = {
  __typename?: 'count_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "count". All fields are combined with a logical 'AND'. */
export type Count_Bool_Exp = {
  _and?: InputMaybe<Array<Count_Bool_Exp>>;
  _not?: InputMaybe<Count_Bool_Exp>;
  _or?: InputMaybe<Array<Count_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expected_counts?: InputMaybe<Jsonb_Comparison_Exp>;
  final_count?: InputMaybe<Jsonb_Comparison_Exp>;
  finish_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  steri_labels?: InputMaybe<Steri_Label_Bool_Exp>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "count" */
export enum Count_Constraint {
  /** unique or primary key constraint on columns "id" */
  CountPkey = 'count_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Count_Delete_At_Path_Input = {
  expected_counts?: InputMaybe<Array<Scalars['String']['input']>>;
  final_count?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Count_Delete_Elem_Input = {
  expected_counts?: InputMaybe<Scalars['Int']['input']>;
  final_count?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Count_Delete_Key_Input = {
  expected_counts?: InputMaybe<Scalars['String']['input']>;
  final_count?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "count" */
export type Count_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "count" */
export type Count_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_counts?: InputMaybe<Scalars['jsonb']['input']>;
  final_count?: InputMaybe<Scalars['jsonb']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  steri_labels?: InputMaybe<Steri_Label_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Count_Max_Fields = {
  __typename?: 'count_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Count_Min_Fields = {
  __typename?: 'count_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "count" */
export type Count_Mutation_Response = {
  __typename?: 'count_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Count>;
};

/** input type for inserting object relation for remote table "count" */
export type Count_Obj_Rel_Insert_Input = {
  data: Count_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Count_On_Conflict>;
};

/** on_conflict condition type for table "count" */
export type Count_On_Conflict = {
  constraint: Count_Constraint;
  update_columns?: Array<Count_Update_Column>;
  where?: InputMaybe<Count_Bool_Exp>;
};

/** Ordering options when selecting data from "count". */
export type Count_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expected_counts?: InputMaybe<Order_By>;
  final_count?: InputMaybe<Order_By>;
  finish_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: count */
export type Count_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Count_Prepend_Input = {
  expected_counts?: InputMaybe<Scalars['jsonb']['input']>;
  final_count?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "count" */
export enum Count_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpectedCounts = 'expected_counts',
  /** column name */
  FinalCount = 'final_count',
  /** column name */
  FinishAt = 'finish_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "count" */
export type Count_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_counts?: InputMaybe<Scalars['jsonb']['input']>;
  final_count?: InputMaybe<Scalars['jsonb']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Count_Stddev_Fields = {
  __typename?: 'count_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Count_Stddev_Pop_Fields = {
  __typename?: 'count_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Count_Stddev_Samp_Fields = {
  __typename?: 'count_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "count" */
export type Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Count_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_counts?: InputMaybe<Scalars['jsonb']['input']>;
  final_count?: InputMaybe<Scalars['jsonb']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Count_Sum_Fields = {
  __typename?: 'count_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "count" */
export enum Count_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpectedCounts = 'expected_counts',
  /** column name */
  FinalCount = 'final_count',
  /** column name */
  FinishAt = 'finish_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Count_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Count_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Count_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Count_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Count_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Count_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Count_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Count_Set_Input>;
  /** filter the rows which have to be updated */
  where: Count_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Count_Var_Pop_Fields = {
  __typename?: 'count_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Count_Var_Samp_Fields = {
  __typename?: 'count_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Count_Variance_Fields = {
  __typename?: 'count_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Fuzzy_Search_Patient_Args = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

export type Login = {
  __typename?: 'login';
  access_token: Scalars['String']['output'];
};

export type Login_Input = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "appointment" */
  delete_appointment?: Maybe<Appointment_Mutation_Response>;
  /** delete single row from the table: "appointment" */
  delete_appointment_by_pk?: Maybe<Appointment>;
  /** delete data from the table: "appointment_state" */
  delete_appointment_state?: Maybe<Appointment_State_Mutation_Response>;
  /** delete single row from the table: "appointment_state" */
  delete_appointment_state_by_pk?: Maybe<Appointment_State>;
  /** delete data from the table: "clinic" */
  delete_clinic?: Maybe<Clinic_Mutation_Response>;
  /** delete single row from the table: "clinic" */
  delete_clinic_by_pk?: Maybe<Clinic>;
  /** delete data from the table: "count" */
  delete_count?: Maybe<Count_Mutation_Response>;
  /** delete single row from the table: "count" */
  delete_count_by_pk?: Maybe<Count>;
  /** delete data from the table: "patient" */
  delete_patient?: Maybe<Patient_Mutation_Response>;
  /** delete single row from the table: "patient" */
  delete_patient_by_pk?: Maybe<Patient>;
  /** delete data from the table: "printer" */
  delete_printer?: Maybe<Printer_Mutation_Response>;
  /** delete single row from the table: "printer" */
  delete_printer_by_pk?: Maybe<Printer>;
  /** delete data from the table: "printer_command" */
  delete_printer_command?: Maybe<Printer_Command_Mutation_Response>;
  /** delete single row from the table: "printer_command" */
  delete_printer_command_by_pk?: Maybe<Printer_Command>;
  /** delete data from the table: "printer_command_type" */
  delete_printer_command_type?: Maybe<Printer_Command_Type_Mutation_Response>;
  /** delete single row from the table: "printer_command_type" */
  delete_printer_command_type_by_pk?: Maybe<Printer_Command_Type>;
  /** delete data from the table: "steri_cycle" */
  delete_steri_cycle?: Maybe<Steri_Cycle_Mutation_Response>;
  /** delete single row from the table: "steri_cycle" */
  delete_steri_cycle_by_pk?: Maybe<Steri_Cycle>;
  /** delete data from the table: "steri_cycle_status" */
  delete_steri_cycle_status?: Maybe<Steri_Cycle_Status_Mutation_Response>;
  /** delete single row from the table: "steri_cycle_status" */
  delete_steri_cycle_status_by_pk?: Maybe<Steri_Cycle_Status>;
  /** delete data from the table: "steri_item" */
  delete_steri_item?: Maybe<Steri_Item_Mutation_Response>;
  /** delete single row from the table: "steri_item" */
  delete_steri_item_by_pk?: Maybe<Steri_Item>;
  /** delete data from the table: "steri_label" */
  delete_steri_label?: Maybe<Steri_Label_Mutation_Response>;
  /** delete single row from the table: "steri_label" */
  delete_steri_label_by_pk?: Maybe<Steri_Label>;
  /** delete data from the table: "steri_template" */
  delete_steri_template?: Maybe<Steri_Template_Mutation_Response>;
  /** delete single row from the table: "steri_template" */
  delete_steri_template_by_pk?: Maybe<Steri_Template>;
  /** delete data from the table: "sterilizer" */
  delete_sterilizer?: Maybe<Sterilizer_Mutation_Response>;
  /** delete single row from the table: "sterilizer" */
  delete_sterilizer_by_pk?: Maybe<Sterilizer>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "appointment" */
  insert_appointment?: Maybe<Appointment_Mutation_Response>;
  /** insert a single row into the table: "appointment" */
  insert_appointment_one?: Maybe<Appointment>;
  /** insert data into the table: "appointment_state" */
  insert_appointment_state?: Maybe<Appointment_State_Mutation_Response>;
  /** insert a single row into the table: "appointment_state" */
  insert_appointment_state_one?: Maybe<Appointment_State>;
  /** insert data into the table: "clinic" */
  insert_clinic?: Maybe<Clinic_Mutation_Response>;
  /** insert a single row into the table: "clinic" */
  insert_clinic_one?: Maybe<Clinic>;
  /** insert data into the table: "count" */
  insert_count?: Maybe<Count_Mutation_Response>;
  /** insert a single row into the table: "count" */
  insert_count_one?: Maybe<Count>;
  /** insert data into the table: "patient" */
  insert_patient?: Maybe<Patient_Mutation_Response>;
  /** insert a single row into the table: "patient" */
  insert_patient_one?: Maybe<Patient>;
  /** insert data into the table: "printer" */
  insert_printer?: Maybe<Printer_Mutation_Response>;
  /** insert data into the table: "printer_command" */
  insert_printer_command?: Maybe<Printer_Command_Mutation_Response>;
  /** insert a single row into the table: "printer_command" */
  insert_printer_command_one?: Maybe<Printer_Command>;
  /** insert data into the table: "printer_command_type" */
  insert_printer_command_type?: Maybe<Printer_Command_Type_Mutation_Response>;
  /** insert a single row into the table: "printer_command_type" */
  insert_printer_command_type_one?: Maybe<Printer_Command_Type>;
  /** insert a single row into the table: "printer" */
  insert_printer_one?: Maybe<Printer>;
  /** insert data into the table: "steri_cycle" */
  insert_steri_cycle?: Maybe<Steri_Cycle_Mutation_Response>;
  /** insert a single row into the table: "steri_cycle" */
  insert_steri_cycle_one?: Maybe<Steri_Cycle>;
  /** insert data into the table: "steri_cycle_status" */
  insert_steri_cycle_status?: Maybe<Steri_Cycle_Status_Mutation_Response>;
  /** insert a single row into the table: "steri_cycle_status" */
  insert_steri_cycle_status_one?: Maybe<Steri_Cycle_Status>;
  /** insert data into the table: "steri_item" */
  insert_steri_item?: Maybe<Steri_Item_Mutation_Response>;
  /** insert a single row into the table: "steri_item" */
  insert_steri_item_one?: Maybe<Steri_Item>;
  /** insert data into the table: "steri_label" */
  insert_steri_label?: Maybe<Steri_Label_Mutation_Response>;
  /** insert a single row into the table: "steri_label" */
  insert_steri_label_one?: Maybe<Steri_Label>;
  /** insert data into the table: "steri_template" */
  insert_steri_template?: Maybe<Steri_Template_Mutation_Response>;
  /** insert a single row into the table: "steri_template" */
  insert_steri_template_one?: Maybe<Steri_Template>;
  /** insert data into the table: "sterilizer" */
  insert_sterilizer?: Maybe<Sterilizer_Mutation_Response>;
  /** insert a single row into the table: "sterilizer" */
  insert_sterilizer_one?: Maybe<Sterilizer>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  login?: Maybe<Login>;
  signup?: Maybe<Signup>;
  /** update data of the table: "appointment" */
  update_appointment?: Maybe<Appointment_Mutation_Response>;
  /** update single row of the table: "appointment" */
  update_appointment_by_pk?: Maybe<Appointment>;
  /** update multiples rows of table: "appointment" */
  update_appointment_many?: Maybe<Array<Maybe<Appointment_Mutation_Response>>>;
  /** update data of the table: "appointment_state" */
  update_appointment_state?: Maybe<Appointment_State_Mutation_Response>;
  /** update single row of the table: "appointment_state" */
  update_appointment_state_by_pk?: Maybe<Appointment_State>;
  /** update multiples rows of table: "appointment_state" */
  update_appointment_state_many?: Maybe<Array<Maybe<Appointment_State_Mutation_Response>>>;
  /** update data of the table: "clinic" */
  update_clinic?: Maybe<Clinic_Mutation_Response>;
  /** update single row of the table: "clinic" */
  update_clinic_by_pk?: Maybe<Clinic>;
  /** update multiples rows of table: "clinic" */
  update_clinic_many?: Maybe<Array<Maybe<Clinic_Mutation_Response>>>;
  /** update data of the table: "count" */
  update_count?: Maybe<Count_Mutation_Response>;
  /** update single row of the table: "count" */
  update_count_by_pk?: Maybe<Count>;
  /** update multiples rows of table: "count" */
  update_count_many?: Maybe<Array<Maybe<Count_Mutation_Response>>>;
  /** update data of the table: "patient" */
  update_patient?: Maybe<Patient_Mutation_Response>;
  /** update single row of the table: "patient" */
  update_patient_by_pk?: Maybe<Patient>;
  /** update multiples rows of table: "patient" */
  update_patient_many?: Maybe<Array<Maybe<Patient_Mutation_Response>>>;
  /** update data of the table: "printer" */
  update_printer?: Maybe<Printer_Mutation_Response>;
  /** update single row of the table: "printer" */
  update_printer_by_pk?: Maybe<Printer>;
  /** update data of the table: "printer_command" */
  update_printer_command?: Maybe<Printer_Command_Mutation_Response>;
  /** update single row of the table: "printer_command" */
  update_printer_command_by_pk?: Maybe<Printer_Command>;
  /** update multiples rows of table: "printer_command" */
  update_printer_command_many?: Maybe<Array<Maybe<Printer_Command_Mutation_Response>>>;
  /** update data of the table: "printer_command_type" */
  update_printer_command_type?: Maybe<Printer_Command_Type_Mutation_Response>;
  /** update single row of the table: "printer_command_type" */
  update_printer_command_type_by_pk?: Maybe<Printer_Command_Type>;
  /** update multiples rows of table: "printer_command_type" */
  update_printer_command_type_many?: Maybe<Array<Maybe<Printer_Command_Type_Mutation_Response>>>;
  /** update multiples rows of table: "printer" */
  update_printer_many?: Maybe<Array<Maybe<Printer_Mutation_Response>>>;
  /** update data of the table: "steri_cycle" */
  update_steri_cycle?: Maybe<Steri_Cycle_Mutation_Response>;
  /** update single row of the table: "steri_cycle" */
  update_steri_cycle_by_pk?: Maybe<Steri_Cycle>;
  /** update multiples rows of table: "steri_cycle" */
  update_steri_cycle_many?: Maybe<Array<Maybe<Steri_Cycle_Mutation_Response>>>;
  /** update data of the table: "steri_cycle_status" */
  update_steri_cycle_status?: Maybe<Steri_Cycle_Status_Mutation_Response>;
  /** update single row of the table: "steri_cycle_status" */
  update_steri_cycle_status_by_pk?: Maybe<Steri_Cycle_Status>;
  /** update multiples rows of table: "steri_cycle_status" */
  update_steri_cycle_status_many?: Maybe<Array<Maybe<Steri_Cycle_Status_Mutation_Response>>>;
  /** update data of the table: "steri_item" */
  update_steri_item?: Maybe<Steri_Item_Mutation_Response>;
  /** update single row of the table: "steri_item" */
  update_steri_item_by_pk?: Maybe<Steri_Item>;
  /** update multiples rows of table: "steri_item" */
  update_steri_item_many?: Maybe<Array<Maybe<Steri_Item_Mutation_Response>>>;
  /** update data of the table: "steri_label" */
  update_steri_label?: Maybe<Steri_Label_Mutation_Response>;
  /** update single row of the table: "steri_label" */
  update_steri_label_by_pk?: Maybe<Steri_Label>;
  /** update multiples rows of table: "steri_label" */
  update_steri_label_many?: Maybe<Array<Maybe<Steri_Label_Mutation_Response>>>;
  /** update data of the table: "steri_template" */
  update_steri_template?: Maybe<Steri_Template_Mutation_Response>;
  /** update single row of the table: "steri_template" */
  update_steri_template_by_pk?: Maybe<Steri_Template>;
  /** update multiples rows of table: "steri_template" */
  update_steri_template_many?: Maybe<Array<Maybe<Steri_Template_Mutation_Response>>>;
  /** update data of the table: "sterilizer" */
  update_sterilizer?: Maybe<Sterilizer_Mutation_Response>;
  /** update single row of the table: "sterilizer" */
  update_sterilizer_by_pk?: Maybe<Sterilizer>;
  /** update multiples rows of table: "sterilizer" */
  update_sterilizer_many?: Maybe<Array<Maybe<Sterilizer_Mutation_Response>>>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  update_user_many?: Maybe<Array<Maybe<User_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AppointmentArgs = {
  where: Appointment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Appointment_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Appointment_StateArgs = {
  where: Appointment_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Appointment_State_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ClinicArgs = {
  where: Clinic_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Clinic_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CountArgs = {
  where: Count_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Count_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PatientArgs = {
  where: Patient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Patient_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PrinterArgs = {
  where: Printer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Printer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Printer_CommandArgs = {
  where: Printer_Command_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Printer_Command_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Printer_Command_TypeArgs = {
  where: Printer_Command_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Printer_Command_Type_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Steri_CycleArgs = {
  where: Steri_Cycle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Steri_Cycle_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Steri_Cycle_StatusArgs = {
  where: Steri_Cycle_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Steri_Cycle_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Steri_ItemArgs = {
  where: Steri_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Steri_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Steri_LabelArgs = {
  where: Steri_Label_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Steri_Label_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Steri_TemplateArgs = {
  where: Steri_Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Steri_Template_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SterilizerArgs = {
  where: Sterilizer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sterilizer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_AppointmentArgs = {
  objects: Array<Appointment_Insert_Input>;
  on_conflict?: InputMaybe<Appointment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Appointment_OneArgs = {
  object: Appointment_Insert_Input;
  on_conflict?: InputMaybe<Appointment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Appointment_StateArgs = {
  objects: Array<Appointment_State_Insert_Input>;
  on_conflict?: InputMaybe<Appointment_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Appointment_State_OneArgs = {
  object: Appointment_State_Insert_Input;
  on_conflict?: InputMaybe<Appointment_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClinicArgs = {
  objects: Array<Clinic_Insert_Input>;
  on_conflict?: InputMaybe<Clinic_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Clinic_OneArgs = {
  object: Clinic_Insert_Input;
  on_conflict?: InputMaybe<Clinic_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CountArgs = {
  objects: Array<Count_Insert_Input>;
  on_conflict?: InputMaybe<Count_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Count_OneArgs = {
  object: Count_Insert_Input;
  on_conflict?: InputMaybe<Count_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PatientArgs = {
  objects: Array<Patient_Insert_Input>;
  on_conflict?: InputMaybe<Patient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Patient_OneArgs = {
  object: Patient_Insert_Input;
  on_conflict?: InputMaybe<Patient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PrinterArgs = {
  objects: Array<Printer_Insert_Input>;
  on_conflict?: InputMaybe<Printer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Printer_CommandArgs = {
  objects: Array<Printer_Command_Insert_Input>;
  on_conflict?: InputMaybe<Printer_Command_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Printer_Command_OneArgs = {
  object: Printer_Command_Insert_Input;
  on_conflict?: InputMaybe<Printer_Command_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Printer_Command_TypeArgs = {
  objects: Array<Printer_Command_Type_Insert_Input>;
  on_conflict?: InputMaybe<Printer_Command_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Printer_Command_Type_OneArgs = {
  object: Printer_Command_Type_Insert_Input;
  on_conflict?: InputMaybe<Printer_Command_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Printer_OneArgs = {
  object: Printer_Insert_Input;
  on_conflict?: InputMaybe<Printer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_CycleArgs = {
  objects: Array<Steri_Cycle_Insert_Input>;
  on_conflict?: InputMaybe<Steri_Cycle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Cycle_OneArgs = {
  object: Steri_Cycle_Insert_Input;
  on_conflict?: InputMaybe<Steri_Cycle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Cycle_StatusArgs = {
  objects: Array<Steri_Cycle_Status_Insert_Input>;
  on_conflict?: InputMaybe<Steri_Cycle_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Cycle_Status_OneArgs = {
  object: Steri_Cycle_Status_Insert_Input;
  on_conflict?: InputMaybe<Steri_Cycle_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_ItemArgs = {
  objects: Array<Steri_Item_Insert_Input>;
  on_conflict?: InputMaybe<Steri_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Item_OneArgs = {
  object: Steri_Item_Insert_Input;
  on_conflict?: InputMaybe<Steri_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_LabelArgs = {
  objects: Array<Steri_Label_Insert_Input>;
  on_conflict?: InputMaybe<Steri_Label_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Label_OneArgs = {
  object: Steri_Label_Insert_Input;
  on_conflict?: InputMaybe<Steri_Label_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_TemplateArgs = {
  objects: Array<Steri_Template_Insert_Input>;
  on_conflict?: InputMaybe<Steri_Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Steri_Template_OneArgs = {
  object: Steri_Template_Insert_Input;
  on_conflict?: InputMaybe<Steri_Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SterilizerArgs = {
  objects: Array<Sterilizer_Insert_Input>;
  on_conflict?: InputMaybe<Sterilizer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sterilizer_OneArgs = {
  object: Sterilizer_Insert_Input;
  on_conflict?: InputMaybe<Sterilizer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  object: Login_Input;
};


/** mutation root */
export type Mutation_RootSignupArgs = {
  object: Signup_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AppointmentArgs = {
  _inc?: InputMaybe<Appointment_Inc_Input>;
  _set?: InputMaybe<Appointment_Set_Input>;
  where: Appointment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Appointment_By_PkArgs = {
  _inc?: InputMaybe<Appointment_Inc_Input>;
  _set?: InputMaybe<Appointment_Set_Input>;
  pk_columns: Appointment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Appointment_ManyArgs = {
  updates: Array<Appointment_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Appointment_StateArgs = {
  _set?: InputMaybe<Appointment_State_Set_Input>;
  where: Appointment_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Appointment_State_By_PkArgs = {
  _set?: InputMaybe<Appointment_State_Set_Input>;
  pk_columns: Appointment_State_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Appointment_State_ManyArgs = {
  updates: Array<Appointment_State_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ClinicArgs = {
  _inc?: InputMaybe<Clinic_Inc_Input>;
  _set?: InputMaybe<Clinic_Set_Input>;
  where: Clinic_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Clinic_By_PkArgs = {
  _inc?: InputMaybe<Clinic_Inc_Input>;
  _set?: InputMaybe<Clinic_Set_Input>;
  pk_columns: Clinic_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Clinic_ManyArgs = {
  updates: Array<Clinic_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CountArgs = {
  _append?: InputMaybe<Count_Append_Input>;
  _delete_at_path?: InputMaybe<Count_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Count_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Count_Delete_Key_Input>;
  _inc?: InputMaybe<Count_Inc_Input>;
  _prepend?: InputMaybe<Count_Prepend_Input>;
  _set?: InputMaybe<Count_Set_Input>;
  where: Count_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Count_By_PkArgs = {
  _append?: InputMaybe<Count_Append_Input>;
  _delete_at_path?: InputMaybe<Count_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Count_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Count_Delete_Key_Input>;
  _inc?: InputMaybe<Count_Inc_Input>;
  _prepend?: InputMaybe<Count_Prepend_Input>;
  _set?: InputMaybe<Count_Set_Input>;
  pk_columns: Count_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Count_ManyArgs = {
  updates: Array<Count_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PatientArgs = {
  _set?: InputMaybe<Patient_Set_Input>;
  where: Patient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Patient_By_PkArgs = {
  _set?: InputMaybe<Patient_Set_Input>;
  pk_columns: Patient_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Patient_ManyArgs = {
  updates: Array<Patient_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PrinterArgs = {
  _inc?: InputMaybe<Printer_Inc_Input>;
  _set?: InputMaybe<Printer_Set_Input>;
  where: Printer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_By_PkArgs = {
  _inc?: InputMaybe<Printer_Inc_Input>;
  _set?: InputMaybe<Printer_Set_Input>;
  pk_columns: Printer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_CommandArgs = {
  _append?: InputMaybe<Printer_Command_Append_Input>;
  _delete_at_path?: InputMaybe<Printer_Command_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Printer_Command_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Printer_Command_Delete_Key_Input>;
  _inc?: InputMaybe<Printer_Command_Inc_Input>;
  _prepend?: InputMaybe<Printer_Command_Prepend_Input>;
  _set?: InputMaybe<Printer_Command_Set_Input>;
  where: Printer_Command_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_Command_By_PkArgs = {
  _append?: InputMaybe<Printer_Command_Append_Input>;
  _delete_at_path?: InputMaybe<Printer_Command_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Printer_Command_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Printer_Command_Delete_Key_Input>;
  _inc?: InputMaybe<Printer_Command_Inc_Input>;
  _prepend?: InputMaybe<Printer_Command_Prepend_Input>;
  _set?: InputMaybe<Printer_Command_Set_Input>;
  pk_columns: Printer_Command_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_Command_ManyArgs = {
  updates: Array<Printer_Command_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_Command_TypeArgs = {
  _set?: InputMaybe<Printer_Command_Type_Set_Input>;
  where: Printer_Command_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_Command_Type_By_PkArgs = {
  _set?: InputMaybe<Printer_Command_Type_Set_Input>;
  pk_columns: Printer_Command_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_Command_Type_ManyArgs = {
  updates: Array<Printer_Command_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Printer_ManyArgs = {
  updates: Array<Printer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_CycleArgs = {
  _append?: InputMaybe<Steri_Cycle_Append_Input>;
  _delete_at_path?: InputMaybe<Steri_Cycle_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Steri_Cycle_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Steri_Cycle_Delete_Key_Input>;
  _inc?: InputMaybe<Steri_Cycle_Inc_Input>;
  _prepend?: InputMaybe<Steri_Cycle_Prepend_Input>;
  _set?: InputMaybe<Steri_Cycle_Set_Input>;
  where: Steri_Cycle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Cycle_By_PkArgs = {
  _append?: InputMaybe<Steri_Cycle_Append_Input>;
  _delete_at_path?: InputMaybe<Steri_Cycle_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Steri_Cycle_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Steri_Cycle_Delete_Key_Input>;
  _inc?: InputMaybe<Steri_Cycle_Inc_Input>;
  _prepend?: InputMaybe<Steri_Cycle_Prepend_Input>;
  _set?: InputMaybe<Steri_Cycle_Set_Input>;
  pk_columns: Steri_Cycle_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Cycle_ManyArgs = {
  updates: Array<Steri_Cycle_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Cycle_StatusArgs = {
  _set?: InputMaybe<Steri_Cycle_Status_Set_Input>;
  where: Steri_Cycle_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Cycle_Status_By_PkArgs = {
  _set?: InputMaybe<Steri_Cycle_Status_Set_Input>;
  pk_columns: Steri_Cycle_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Cycle_Status_ManyArgs = {
  updates: Array<Steri_Cycle_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_ItemArgs = {
  _inc?: InputMaybe<Steri_Item_Inc_Input>;
  _set?: InputMaybe<Steri_Item_Set_Input>;
  where: Steri_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Item_By_PkArgs = {
  _inc?: InputMaybe<Steri_Item_Inc_Input>;
  _set?: InputMaybe<Steri_Item_Set_Input>;
  pk_columns: Steri_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Item_ManyArgs = {
  updates: Array<Steri_Item_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_LabelArgs = {
  _inc?: InputMaybe<Steri_Label_Inc_Input>;
  _set?: InputMaybe<Steri_Label_Set_Input>;
  where: Steri_Label_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Label_By_PkArgs = {
  _inc?: InputMaybe<Steri_Label_Inc_Input>;
  _set?: InputMaybe<Steri_Label_Set_Input>;
  pk_columns: Steri_Label_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Label_ManyArgs = {
  updates: Array<Steri_Label_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_TemplateArgs = {
  _append?: InputMaybe<Steri_Template_Append_Input>;
  _delete_at_path?: InputMaybe<Steri_Template_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Steri_Template_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Steri_Template_Delete_Key_Input>;
  _inc?: InputMaybe<Steri_Template_Inc_Input>;
  _prepend?: InputMaybe<Steri_Template_Prepend_Input>;
  _set?: InputMaybe<Steri_Template_Set_Input>;
  where: Steri_Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Template_By_PkArgs = {
  _append?: InputMaybe<Steri_Template_Append_Input>;
  _delete_at_path?: InputMaybe<Steri_Template_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Steri_Template_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Steri_Template_Delete_Key_Input>;
  _inc?: InputMaybe<Steri_Template_Inc_Input>;
  _prepend?: InputMaybe<Steri_Template_Prepend_Input>;
  _set?: InputMaybe<Steri_Template_Set_Input>;
  pk_columns: Steri_Template_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Steri_Template_ManyArgs = {
  updates: Array<Steri_Template_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SterilizerArgs = {
  _inc?: InputMaybe<Sterilizer_Inc_Input>;
  _set?: InputMaybe<Sterilizer_Set_Input>;
  where: Sterilizer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sterilizer_By_PkArgs = {
  _inc?: InputMaybe<Sterilizer_Inc_Input>;
  _set?: InputMaybe<Sterilizer_Set_Input>;
  pk_columns: Sterilizer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sterilizer_ManyArgs = {
  updates: Array<Sterilizer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ManyArgs = {
  updates: Array<User_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "patient" */
export type Patient = {
  __typename?: 'patient';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  emr_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['citext']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

export type Patient_Aggregate = {
  __typename?: 'patient_aggregate';
  aggregate?: Maybe<Patient_Aggregate_Fields>;
  nodes: Array<Patient>;
};

/** aggregate fields of "patient" */
export type Patient_Aggregate_Fields = {
  __typename?: 'patient_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Patient_Max_Fields>;
  min?: Maybe<Patient_Min_Fields>;
};


/** aggregate fields of "patient" */
export type Patient_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Patient_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "patient". All fields are combined with a logical 'AND'. */
export type Patient_Bool_Exp = {
  _and?: InputMaybe<Array<Patient_Bool_Exp>>;
  _not?: InputMaybe<Patient_Bool_Exp>;
  _or?: InputMaybe<Array<Patient_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  emr_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<Citext_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "patient" */
export enum Patient_Constraint {
  /** unique or primary key constraint on columns "emr_id", "clinic_id" */
  PatientEmrIdClinicIdKey = 'patient_emr_id_clinic_id_key',
  /** unique or primary key constraint on columns "id" */
  PatientPkey = 'patient_pkey'
}

/** input type for inserting data into table "patient" */
export type Patient_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Patient_Max_Fields = {
  __typename?: 'patient_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  emr_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Patient_Min_Fields = {
  __typename?: 'patient_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  emr_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "patient" */
export type Patient_Mutation_Response = {
  __typename?: 'patient_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Patient>;
};

/** input type for inserting object relation for remote table "patient" */
export type Patient_Obj_Rel_Insert_Input = {
  data: Patient_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Patient_On_Conflict>;
};

/** on_conflict condition type for table "patient" */
export type Patient_On_Conflict = {
  constraint: Patient_Constraint;
  update_columns?: Array<Patient_Update_Column>;
  where?: InputMaybe<Patient_Bool_Exp>;
};

/** Ordering options when selecting data from "patient". */
export type Patient_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  emr_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: patient */
export type Patient_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "patient" */
export enum Patient_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  EmrId = 'emr_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "patient" */
export type Patient_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "patient" */
export type Patient_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Patient_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Patient_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  emr_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "patient" */
export enum Patient_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  EmrId = 'emr_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Patient_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Patient_Set_Input>;
  /** filter the rows which have to be updated */
  where: Patient_Bool_Exp;
};

/** columns and relationships of "printer" */
export type Printer = {
  __typename?: 'printer';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  /** An array relationship */
  commands: Array<Printer_Command>;
  /** An aggregate relationship */
  commands_aggregate: Printer_Command_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  join_code?: Maybe<Scalars['String']['output']>;
  join_expires_at: Scalars['timestamp']['output'];
  last_seen_at?: Maybe<Scalars['timestamptz']['output']>;
  name: Scalars['String']['output'];
  paired_at?: Maybe<Scalars['timestamp']['output']>;
  update_started_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  version_number: Scalars['Int']['output'];
};


/** columns and relationships of "printer" */
export type PrinterCommandsArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


/** columns and relationships of "printer" */
export type PrinterCommands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};

/** aggregated selection of "printer" */
export type Printer_Aggregate = {
  __typename?: 'printer_aggregate';
  aggregate?: Maybe<Printer_Aggregate_Fields>;
  nodes: Array<Printer>;
};

export type Printer_Aggregate_Bool_Exp = {
  count?: InputMaybe<Printer_Aggregate_Bool_Exp_Count>;
};

export type Printer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Printer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Printer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "printer" */
export type Printer_Aggregate_Fields = {
  __typename?: 'printer_aggregate_fields';
  avg?: Maybe<Printer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Printer_Max_Fields>;
  min?: Maybe<Printer_Min_Fields>;
  stddev?: Maybe<Printer_Stddev_Fields>;
  stddev_pop?: Maybe<Printer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Printer_Stddev_Samp_Fields>;
  sum?: Maybe<Printer_Sum_Fields>;
  var_pop?: Maybe<Printer_Var_Pop_Fields>;
  var_samp?: Maybe<Printer_Var_Samp_Fields>;
  variance?: Maybe<Printer_Variance_Fields>;
};


/** aggregate fields of "printer" */
export type Printer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Printer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "printer" */
export type Printer_Aggregate_Order_By = {
  avg?: InputMaybe<Printer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Printer_Max_Order_By>;
  min?: InputMaybe<Printer_Min_Order_By>;
  stddev?: InputMaybe<Printer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Printer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Printer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Printer_Sum_Order_By>;
  var_pop?: InputMaybe<Printer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Printer_Var_Samp_Order_By>;
  variance?: InputMaybe<Printer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "printer" */
export type Printer_Arr_Rel_Insert_Input = {
  data: Array<Printer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Printer_On_Conflict>;
};

/** aggregate avg on columns */
export type Printer_Avg_Fields = {
  __typename?: 'printer_avg_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "printer" */
export type Printer_Avg_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "printer". All fields are combined with a logical 'AND'. */
export type Printer_Bool_Exp = {
  _and?: InputMaybe<Array<Printer_Bool_Exp>>;
  _not?: InputMaybe<Printer_Bool_Exp>;
  _or?: InputMaybe<Array<Printer_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  commands?: InputMaybe<Printer_Command_Bool_Exp>;
  commands_aggregate?: InputMaybe<Printer_Command_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  join_code?: InputMaybe<String_Comparison_Exp>;
  join_expires_at?: InputMaybe<Timestamp_Comparison_Exp>;
  last_seen_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  paired_at?: InputMaybe<Timestamp_Comparison_Exp>;
  update_started_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version_number?: InputMaybe<Int_Comparison_Exp>;
};

/** columns and relationships of "printer_command" */
export type Printer_Command = {
  __typename?: 'printer_command';
  command: Printer_Command_Type_Enum;
  created_at: Scalars['timestamptz']['output'];
  data?: Maybe<Scalars['jsonb']['output']>;
  executed_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['bigint']['output'];
  /** An object relationship */
  printer: Printer;
  printer_id: Scalars['uuid']['output'];
  result?: Maybe<Scalars['jsonb']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "printer_command" */
export type Printer_CommandDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "printer_command" */
export type Printer_CommandResultArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "printer_command" */
export type Printer_Command_Aggregate = {
  __typename?: 'printer_command_aggregate';
  aggregate?: Maybe<Printer_Command_Aggregate_Fields>;
  nodes: Array<Printer_Command>;
};

export type Printer_Command_Aggregate_Bool_Exp = {
  count?: InputMaybe<Printer_Command_Aggregate_Bool_Exp_Count>;
};

export type Printer_Command_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Printer_Command_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Printer_Command_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "printer_command" */
export type Printer_Command_Aggregate_Fields = {
  __typename?: 'printer_command_aggregate_fields';
  avg?: Maybe<Printer_Command_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Printer_Command_Max_Fields>;
  min?: Maybe<Printer_Command_Min_Fields>;
  stddev?: Maybe<Printer_Command_Stddev_Fields>;
  stddev_pop?: Maybe<Printer_Command_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Printer_Command_Stddev_Samp_Fields>;
  sum?: Maybe<Printer_Command_Sum_Fields>;
  var_pop?: Maybe<Printer_Command_Var_Pop_Fields>;
  var_samp?: Maybe<Printer_Command_Var_Samp_Fields>;
  variance?: Maybe<Printer_Command_Variance_Fields>;
};


/** aggregate fields of "printer_command" */
export type Printer_Command_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Printer_Command_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "printer_command" */
export type Printer_Command_Aggregate_Order_By = {
  avg?: InputMaybe<Printer_Command_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Printer_Command_Max_Order_By>;
  min?: InputMaybe<Printer_Command_Min_Order_By>;
  stddev?: InputMaybe<Printer_Command_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Printer_Command_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Printer_Command_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Printer_Command_Sum_Order_By>;
  var_pop?: InputMaybe<Printer_Command_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Printer_Command_Var_Samp_Order_By>;
  variance?: InputMaybe<Printer_Command_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Printer_Command_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "printer_command" */
export type Printer_Command_Arr_Rel_Insert_Input = {
  data: Array<Printer_Command_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Printer_Command_On_Conflict>;
};

/** aggregate avg on columns */
export type Printer_Command_Avg_Fields = {
  __typename?: 'printer_command_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "printer_command" */
export type Printer_Command_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "printer_command". All fields are combined with a logical 'AND'. */
export type Printer_Command_Bool_Exp = {
  _and?: InputMaybe<Array<Printer_Command_Bool_Exp>>;
  _not?: InputMaybe<Printer_Command_Bool_Exp>;
  _or?: InputMaybe<Array<Printer_Command_Bool_Exp>>;
  command?: InputMaybe<Printer_Command_Type_Enum_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  executed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  printer?: InputMaybe<Printer_Bool_Exp>;
  printer_id?: InputMaybe<Uuid_Comparison_Exp>;
  result?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "printer_command" */
export enum Printer_Command_Constraint {
  /** unique or primary key constraint on columns "id" */
  PrinterCommandPkey = 'printer_command_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Printer_Command_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']['input']>>;
  result?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Printer_Command_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Printer_Command_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "printer_command" */
export type Printer_Command_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "printer_command" */
export type Printer_Command_Insert_Input = {
  command?: InputMaybe<Printer_Command_Type_Enum>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  executed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  printer?: InputMaybe<Printer_Obj_Rel_Insert_Input>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Printer_Command_Max_Fields = {
  __typename?: 'printer_command_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  executed_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  printer_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "printer_command" */
export type Printer_Command_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  executed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  printer_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Printer_Command_Min_Fields = {
  __typename?: 'printer_command_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  executed_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  printer_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "printer_command" */
export type Printer_Command_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  executed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  printer_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "printer_command" */
export type Printer_Command_Mutation_Response = {
  __typename?: 'printer_command_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Printer_Command>;
};

/** on_conflict condition type for table "printer_command" */
export type Printer_Command_On_Conflict = {
  constraint: Printer_Command_Constraint;
  update_columns?: Array<Printer_Command_Update_Column>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};

/** Ordering options when selecting data from "printer_command". */
export type Printer_Command_Order_By = {
  command?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  executed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  printer?: InputMaybe<Printer_Order_By>;
  printer_id?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: printer_command */
export type Printer_Command_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Printer_Command_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "printer_command" */
export enum Printer_Command_Select_Column {
  /** column name */
  Command = 'command',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  ExecutedAt = 'executed_at',
  /** column name */
  Id = 'id',
  /** column name */
  PrinterId = 'printer_id',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "printer_command" */
export type Printer_Command_Set_Input = {
  command?: InputMaybe<Printer_Command_Type_Enum>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  executed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Printer_Command_Stddev_Fields = {
  __typename?: 'printer_command_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "printer_command" */
export type Printer_Command_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Printer_Command_Stddev_Pop_Fields = {
  __typename?: 'printer_command_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "printer_command" */
export type Printer_Command_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Printer_Command_Stddev_Samp_Fields = {
  __typename?: 'printer_command_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "printer_command" */
export type Printer_Command_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "printer_command" */
export type Printer_Command_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Printer_Command_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Printer_Command_Stream_Cursor_Value_Input = {
  command?: InputMaybe<Printer_Command_Type_Enum>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  executed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Printer_Command_Sum_Fields = {
  __typename?: 'printer_command_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "printer_command" */
export type Printer_Command_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "printer_command_type" */
export type Printer_Command_Type = {
  __typename?: 'printer_command_type';
  id: Scalars['String']['output'];
};

/** aggregated selection of "printer_command_type" */
export type Printer_Command_Type_Aggregate = {
  __typename?: 'printer_command_type_aggregate';
  aggregate?: Maybe<Printer_Command_Type_Aggregate_Fields>;
  nodes: Array<Printer_Command_Type>;
};

/** aggregate fields of "printer_command_type" */
export type Printer_Command_Type_Aggregate_Fields = {
  __typename?: 'printer_command_type_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Printer_Command_Type_Max_Fields>;
  min?: Maybe<Printer_Command_Type_Min_Fields>;
};


/** aggregate fields of "printer_command_type" */
export type Printer_Command_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Printer_Command_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "printer_command_type". All fields are combined with a logical 'AND'. */
export type Printer_Command_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Printer_Command_Type_Bool_Exp>>;
  _not?: InputMaybe<Printer_Command_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Printer_Command_Type_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "printer_command_type" */
export enum Printer_Command_Type_Constraint {
  /** unique or primary key constraint on columns "id" */
  PrinterCommandTypePkey = 'printer_command_type_pkey'
}

export enum Printer_Command_Type_Enum {
  Ping = 'ping',
  PrintLabels = 'print_labels',
  PrintTest = 'print_test',
  Reboot = 'reboot',
  RunUpdate = 'run_update'
}

/** Boolean expression to compare columns of type "printer_command_type_enum". All fields are combined with logical 'AND'. */
export type Printer_Command_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Printer_Command_Type_Enum>;
  _in?: InputMaybe<Array<Printer_Command_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Printer_Command_Type_Enum>;
  _nin?: InputMaybe<Array<Printer_Command_Type_Enum>>;
};

/** input type for inserting data into table "printer_command_type" */
export type Printer_Command_Type_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Printer_Command_Type_Max_Fields = {
  __typename?: 'printer_command_type_max_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Printer_Command_Type_Min_Fields = {
  __typename?: 'printer_command_type_min_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "printer_command_type" */
export type Printer_Command_Type_Mutation_Response = {
  __typename?: 'printer_command_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Printer_Command_Type>;
};

/** on_conflict condition type for table "printer_command_type" */
export type Printer_Command_Type_On_Conflict = {
  constraint: Printer_Command_Type_Constraint;
  update_columns?: Array<Printer_Command_Type_Update_Column>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "printer_command_type". */
export type Printer_Command_Type_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: printer_command_type */
export type Printer_Command_Type_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "printer_command_type" */
export enum Printer_Command_Type_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "printer_command_type" */
export type Printer_Command_Type_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "printer_command_type" */
export type Printer_Command_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Printer_Command_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Printer_Command_Type_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "printer_command_type" */
export enum Printer_Command_Type_Update_Column {
  /** column name */
  Id = 'id'
}

export type Printer_Command_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Printer_Command_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Printer_Command_Type_Bool_Exp;
};

/** update columns of table "printer_command" */
export enum Printer_Command_Update_Column {
  /** column name */
  Command = 'command',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  ExecutedAt = 'executed_at',
  /** column name */
  Id = 'id',
  /** column name */
  PrinterId = 'printer_id',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Printer_Command_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Printer_Command_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Printer_Command_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Printer_Command_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Printer_Command_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Printer_Command_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Printer_Command_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Printer_Command_Set_Input>;
  /** filter the rows which have to be updated */
  where: Printer_Command_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Printer_Command_Var_Pop_Fields = {
  __typename?: 'printer_command_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "printer_command" */
export type Printer_Command_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Printer_Command_Var_Samp_Fields = {
  __typename?: 'printer_command_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "printer_command" */
export type Printer_Command_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Printer_Command_Variance_Fields = {
  __typename?: 'printer_command_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "printer_command" */
export type Printer_Command_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** unique or primary key constraints on table "printer" */
export enum Printer_Constraint {
  /** unique or primary key constraint on columns "join_code" */
  PrinterJoinCodeKey = 'printer_join_code_key',
  /** unique or primary key constraint on columns "id" */
  PrinterPkey = 'printer_pkey'
}

/** input type for incrementing numeric columns in table "printer" */
export type Printer_Inc_Input = {
  version_number?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "printer" */
export type Printer_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  commands?: InputMaybe<Printer_Command_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  join_code?: InputMaybe<Scalars['String']['input']>;
  join_expires_at?: InputMaybe<Scalars['timestamp']['input']>;
  last_seen_at?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paired_at?: InputMaybe<Scalars['timestamp']['input']>;
  update_started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Printer_Max_Fields = {
  __typename?: 'printer_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  join_code?: Maybe<Scalars['String']['output']>;
  join_expires_at?: Maybe<Scalars['timestamp']['output']>;
  last_seen_at?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paired_at?: Maybe<Scalars['timestamp']['output']>;
  update_started_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version_number?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "printer" */
export type Printer_Max_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_code?: InputMaybe<Order_By>;
  join_expires_at?: InputMaybe<Order_By>;
  last_seen_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  paired_at?: InputMaybe<Order_By>;
  update_started_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version_number?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Printer_Min_Fields = {
  __typename?: 'printer_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  join_code?: Maybe<Scalars['String']['output']>;
  join_expires_at?: Maybe<Scalars['timestamp']['output']>;
  last_seen_at?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paired_at?: Maybe<Scalars['timestamp']['output']>;
  update_started_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version_number?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "printer" */
export type Printer_Min_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_code?: InputMaybe<Order_By>;
  join_expires_at?: InputMaybe<Order_By>;
  last_seen_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  paired_at?: InputMaybe<Order_By>;
  update_started_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version_number?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "printer" */
export type Printer_Mutation_Response = {
  __typename?: 'printer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Printer>;
};

/** input type for inserting object relation for remote table "printer" */
export type Printer_Obj_Rel_Insert_Input = {
  data: Printer_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Printer_On_Conflict>;
};

/** on_conflict condition type for table "printer" */
export type Printer_On_Conflict = {
  constraint: Printer_Constraint;
  update_columns?: Array<Printer_Update_Column>;
  where?: InputMaybe<Printer_Bool_Exp>;
};

/** Ordering options when selecting data from "printer". */
export type Printer_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  commands_aggregate?: InputMaybe<Printer_Command_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  join_code?: InputMaybe<Order_By>;
  join_expires_at?: InputMaybe<Order_By>;
  last_seen_at?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  paired_at?: InputMaybe<Order_By>;
  update_started_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version_number?: InputMaybe<Order_By>;
};

/** primary key columns input for table: printer */
export type Printer_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "printer" */
export enum Printer_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  JoinCode = 'join_code',
  /** column name */
  JoinExpiresAt = 'join_expires_at',
  /** column name */
  LastSeenAt = 'last_seen_at',
  /** column name */
  Name = 'name',
  /** column name */
  PairedAt = 'paired_at',
  /** column name */
  UpdateStartedAt = 'update_started_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VersionNumber = 'version_number'
}

/** input type for updating data in table "printer" */
export type Printer_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  join_code?: InputMaybe<Scalars['String']['input']>;
  join_expires_at?: InputMaybe<Scalars['timestamp']['input']>;
  last_seen_at?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paired_at?: InputMaybe<Scalars['timestamp']['input']>;
  update_started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Printer_Stddev_Fields = {
  __typename?: 'printer_stddev_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "printer" */
export type Printer_Stddev_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Printer_Stddev_Pop_Fields = {
  __typename?: 'printer_stddev_pop_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "printer" */
export type Printer_Stddev_Pop_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Printer_Stddev_Samp_Fields = {
  __typename?: 'printer_stddev_samp_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "printer" */
export type Printer_Stddev_Samp_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "printer" */
export type Printer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Printer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Printer_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  join_code?: InputMaybe<Scalars['String']['input']>;
  join_expires_at?: InputMaybe<Scalars['timestamp']['input']>;
  last_seen_at?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paired_at?: InputMaybe<Scalars['timestamp']['input']>;
  update_started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Printer_Sum_Fields = {
  __typename?: 'printer_sum_fields';
  version_number?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "printer" */
export type Printer_Sum_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** update columns of table "printer" */
export enum Printer_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  JoinCode = 'join_code',
  /** column name */
  JoinExpiresAt = 'join_expires_at',
  /** column name */
  LastSeenAt = 'last_seen_at',
  /** column name */
  Name = 'name',
  /** column name */
  PairedAt = 'paired_at',
  /** column name */
  UpdateStartedAt = 'update_started_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VersionNumber = 'version_number'
}

export type Printer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Printer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Printer_Set_Input>;
  /** filter the rows which have to be updated */
  where: Printer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Printer_Var_Pop_Fields = {
  __typename?: 'printer_var_pop_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "printer" */
export type Printer_Var_Pop_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Printer_Var_Samp_Fields = {
  __typename?: 'printer_var_samp_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "printer" */
export type Printer_Var_Samp_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Printer_Variance_Fields = {
  __typename?: 'printer_variance_fields';
  version_number?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "printer" */
export type Printer_Variance_Order_By = {
  version_number?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "appointment" */
  appointment: Array<Appointment>;
  /** fetch aggregated fields from the table: "appointment" */
  appointment_aggregate: Appointment_Aggregate;
  /** fetch data from the table: "appointment" using primary key columns */
  appointment_by_pk?: Maybe<Appointment>;
  /** fetch data from the table: "appointment_state" */
  appointment_state: Array<Appointment_State>;
  /** fetch aggregated fields from the table: "appointment_state" */
  appointment_state_aggregate: Appointment_State_Aggregate;
  /** fetch data from the table: "appointment_state" using primary key columns */
  appointment_state_by_pk?: Maybe<Appointment_State>;
  /** fetch data from the table: "clinic" */
  clinic: Array<Clinic>;
  /** fetch aggregated fields from the table: "clinic" */
  clinic_aggregate: Clinic_Aggregate;
  /** fetch data from the table: "clinic" using primary key columns */
  clinic_by_pk?: Maybe<Clinic>;
  /** fetch data from the table: "count" */
  count: Array<Count>;
  /** fetch aggregated fields from the table: "count" */
  count_aggregate: Count_Aggregate;
  /** fetch data from the table: "count" using primary key columns */
  count_by_pk?: Maybe<Count>;
  /** execute function "fuzzy_search_patient" which returns "patient" */
  fuzzy_search_patient: Array<Patient>;
  /** execute function "fuzzy_search_patient" and query aggregates on result of table type "patient" */
  fuzzy_search_patient_aggregate: Patient_Aggregate;
  /** fetch data from the table: "patient" */
  patient: Array<Patient>;
  /** fetch aggregated fields from the table: "patient" */
  patient_aggregate: Patient_Aggregate;
  /** fetch data from the table: "patient" using primary key columns */
  patient_by_pk?: Maybe<Patient>;
  /** fetch data from the table: "printer" */
  printer: Array<Printer>;
  /** fetch aggregated fields from the table: "printer" */
  printer_aggregate: Printer_Aggregate;
  /** fetch data from the table: "printer" using primary key columns */
  printer_by_pk?: Maybe<Printer>;
  /** fetch data from the table: "printer_command" */
  printer_command: Array<Printer_Command>;
  /** fetch aggregated fields from the table: "printer_command" */
  printer_command_aggregate: Printer_Command_Aggregate;
  /** fetch data from the table: "printer_command" using primary key columns */
  printer_command_by_pk?: Maybe<Printer_Command>;
  /** fetch data from the table: "printer_command_type" */
  printer_command_type: Array<Printer_Command_Type>;
  /** fetch aggregated fields from the table: "printer_command_type" */
  printer_command_type_aggregate: Printer_Command_Type_Aggregate;
  /** fetch data from the table: "printer_command_type" using primary key columns */
  printer_command_type_by_pk?: Maybe<Printer_Command_Type>;
  /** fetch data from the table: "steri_cycle" */
  steri_cycle: Array<Steri_Cycle>;
  /** fetch aggregated fields from the table: "steri_cycle" */
  steri_cycle_aggregate: Steri_Cycle_Aggregate;
  /** fetch data from the table: "steri_cycle" using primary key columns */
  steri_cycle_by_pk?: Maybe<Steri_Cycle>;
  /** fetch data from the table: "steri_cycle_status" */
  steri_cycle_status: Array<Steri_Cycle_Status>;
  /** fetch aggregated fields from the table: "steri_cycle_status" */
  steri_cycle_status_aggregate: Steri_Cycle_Status_Aggregate;
  /** fetch data from the table: "steri_cycle_status" using primary key columns */
  steri_cycle_status_by_pk?: Maybe<Steri_Cycle_Status>;
  /** fetch data from the table: "steri_item" */
  steri_item: Array<Steri_Item>;
  /** fetch aggregated fields from the table: "steri_item" */
  steri_item_aggregate: Steri_Item_Aggregate;
  /** fetch data from the table: "steri_item" using primary key columns */
  steri_item_by_pk?: Maybe<Steri_Item>;
  /** fetch data from the table: "steri_label" */
  steri_label: Array<Steri_Label>;
  /** fetch aggregated fields from the table: "steri_label" */
  steri_label_aggregate: Steri_Label_Aggregate;
  /** fetch data from the table: "steri_label" using primary key columns */
  steri_label_by_pk?: Maybe<Steri_Label>;
  /** fetch data from the table: "steri_template" */
  steri_template: Array<Steri_Template>;
  /** fetch aggregated fields from the table: "steri_template" */
  steri_template_aggregate: Steri_Template_Aggregate;
  /** fetch data from the table: "steri_template" using primary key columns */
  steri_template_by_pk?: Maybe<Steri_Template>;
  /** fetch data from the table: "sterilizer" */
  sterilizer: Array<Sterilizer>;
  /** fetch aggregated fields from the table: "sterilizer" */
  sterilizer_aggregate: Sterilizer_Aggregate;
  /** fetch data from the table: "sterilizer" using primary key columns */
  sterilizer_by_pk?: Maybe<Sterilizer>;
  /** fetch data from the table: "sterilizer_count" */
  sterilizer_count: Array<Sterilizer_Count>;
  /** fetch aggregated fields from the table: "sterilizer_count" */
  sterilizer_count_aggregate: Sterilizer_Count_Aggregate;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Query_RootAppointmentArgs = {
  distinct_on?: InputMaybe<Array<Appointment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_Order_By>>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};


export type Query_RootAppointment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_Order_By>>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};


export type Query_RootAppointment_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootAppointment_StateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_State_Order_By>>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};


export type Query_RootAppointment_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_State_Order_By>>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};


export type Query_RootAppointment_State_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootClinicArgs = {
  distinct_on?: InputMaybe<Array<Clinic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Clinic_Order_By>>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};


export type Query_RootClinic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clinic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Clinic_Order_By>>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};


export type Query_RootClinic_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCountArgs = {
  distinct_on?: InputMaybe<Array<Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Count_Order_By>>;
  where?: InputMaybe<Count_Bool_Exp>;
};


export type Query_RootCount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Count_Order_By>>;
  where?: InputMaybe<Count_Bool_Exp>;
};


export type Query_RootCount_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootFuzzy_Search_PatientArgs = {
  args: Fuzzy_Search_Patient_Args;
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Query_RootFuzzy_Search_Patient_AggregateArgs = {
  args: Fuzzy_Search_Patient_Args;
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Query_RootPatientArgs = {
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Query_RootPatient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Query_RootPatient_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPrinterArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


export type Query_RootPrinter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


export type Query_RootPrinter_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPrinter_CommandArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


export type Query_RootPrinter_Command_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


export type Query_RootPrinter_Command_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootPrinter_Command_TypeArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Type_Order_By>>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};


export type Query_RootPrinter_Command_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Type_Order_By>>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};


export type Query_RootPrinter_Command_Type_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootSteri_CycleArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


export type Query_RootSteri_Cycle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


export type Query_RootSteri_Cycle_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSteri_Cycle_StatusArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Status_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};


export type Query_RootSteri_Cycle_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Status_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};


export type Query_RootSteri_Cycle_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootSteri_ItemArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


export type Query_RootSteri_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


export type Query_RootSteri_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSteri_LabelArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


export type Query_RootSteri_Label_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


export type Query_RootSteri_Label_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSteri_TemplateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Template_Order_By>>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};


export type Query_RootSteri_Template_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Template_Order_By>>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};


export type Query_RootSteri_Template_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSterilizerArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


export type Query_RootSterilizer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


export type Query_RootSterilizer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSterilizer_CountArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Count_Order_By>>;
  where?: InputMaybe<Sterilizer_Count_Bool_Exp>;
};


export type Query_RootSterilizer_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Count_Order_By>>;
  where?: InputMaybe<Sterilizer_Count_Bool_Exp>;
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Signup = {
  __typename?: 'signup';
  access_token: Scalars['String']['output'];
};

export type Signup_Input = {
  captcha: Scalars['String']['input'];
  force_password_reset?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  terms_agree_at: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

/** columns and relationships of "steri_cycle" */
export type Steri_Cycle = {
  __typename?: 'steri_cycle';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  cycle_number: Scalars['String']['output'];
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  finish_user?: Maybe<User>;
  finish_user_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['bigint']['output'];
  is_spore_test_enabled: Scalars['Boolean']['output'];
  log_data?: Maybe<Scalars['jsonb']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  spore_test_passed?: Maybe<Scalars['Boolean']['output']>;
  spore_test_recorded_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  spore_test_user?: Maybe<User>;
  spore_test_user_id?: Maybe<Scalars['uuid']['output']>;
  start_at?: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  start_user?: Maybe<User>;
  start_user_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Steri_Cycle_Status_Enum>;
  /** An array relationship */
  steri_labels: Array<Steri_Label>;
  /** An aggregate relationship */
  steri_labels_aggregate: Steri_Label_Aggregate;
  /** An object relationship */
  sterilizer: Sterilizer;
  sterilizer_id: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "steri_cycle" */
export type Steri_CycleLog_DataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "steri_cycle" */
export type Steri_CycleSteri_LabelsArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


/** columns and relationships of "steri_cycle" */
export type Steri_CycleSteri_Labels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};

/** aggregated selection of "steri_cycle" */
export type Steri_Cycle_Aggregate = {
  __typename?: 'steri_cycle_aggregate';
  aggregate?: Maybe<Steri_Cycle_Aggregate_Fields>;
  nodes: Array<Steri_Cycle>;
};

export type Steri_Cycle_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Steri_Cycle_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Steri_Cycle_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Steri_Cycle_Aggregate_Bool_Exp_Count>;
};

export type Steri_Cycle_Aggregate_Bool_Exp_Bool_And = {
  arguments: Steri_Cycle_Select_Column_Steri_Cycle_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Cycle_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Steri_Cycle_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Steri_Cycle_Select_Column_Steri_Cycle_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Cycle_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Steri_Cycle_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Cycle_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "steri_cycle" */
export type Steri_Cycle_Aggregate_Fields = {
  __typename?: 'steri_cycle_aggregate_fields';
  avg?: Maybe<Steri_Cycle_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Steri_Cycle_Max_Fields>;
  min?: Maybe<Steri_Cycle_Min_Fields>;
  stddev?: Maybe<Steri_Cycle_Stddev_Fields>;
  stddev_pop?: Maybe<Steri_Cycle_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Steri_Cycle_Stddev_Samp_Fields>;
  sum?: Maybe<Steri_Cycle_Sum_Fields>;
  var_pop?: Maybe<Steri_Cycle_Var_Pop_Fields>;
  var_samp?: Maybe<Steri_Cycle_Var_Samp_Fields>;
  variance?: Maybe<Steri_Cycle_Variance_Fields>;
};


/** aggregate fields of "steri_cycle" */
export type Steri_Cycle_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "steri_cycle" */
export type Steri_Cycle_Aggregate_Order_By = {
  avg?: InputMaybe<Steri_Cycle_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Steri_Cycle_Max_Order_By>;
  min?: InputMaybe<Steri_Cycle_Min_Order_By>;
  stddev?: InputMaybe<Steri_Cycle_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Steri_Cycle_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Steri_Cycle_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Steri_Cycle_Sum_Order_By>;
  var_pop?: InputMaybe<Steri_Cycle_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Steri_Cycle_Var_Samp_Order_By>;
  variance?: InputMaybe<Steri_Cycle_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Steri_Cycle_Append_Input = {
  log_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "steri_cycle" */
export type Steri_Cycle_Arr_Rel_Insert_Input = {
  data: Array<Steri_Cycle_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Steri_Cycle_On_Conflict>;
};

/** aggregate avg on columns */
export type Steri_Cycle_Avg_Fields = {
  __typename?: 'steri_cycle_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "steri_cycle" */
export type Steri_Cycle_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "steri_cycle". All fields are combined with a logical 'AND'. */
export type Steri_Cycle_Bool_Exp = {
  _and?: InputMaybe<Array<Steri_Cycle_Bool_Exp>>;
  _not?: InputMaybe<Steri_Cycle_Bool_Exp>;
  _or?: InputMaybe<Array<Steri_Cycle_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  cycle_number?: InputMaybe<String_Comparison_Exp>;
  finish_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  finish_user?: InputMaybe<User_Bool_Exp>;
  finish_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  is_spore_test_enabled?: InputMaybe<Boolean_Comparison_Exp>;
  log_data?: InputMaybe<Jsonb_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  spore_test_passed?: InputMaybe<Boolean_Comparison_Exp>;
  spore_test_recorded_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  spore_test_user?: InputMaybe<User_Bool_Exp>;
  spore_test_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  start_at?: InputMaybe<Timestamp_Comparison_Exp>;
  start_user?: InputMaybe<User_Bool_Exp>;
  start_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Steri_Cycle_Status_Enum_Comparison_Exp>;
  steri_labels?: InputMaybe<Steri_Label_Bool_Exp>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Bool_Exp>;
  sterilizer?: InputMaybe<Sterilizer_Bool_Exp>;
  sterilizer_id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "steri_cycle" */
export enum Steri_Cycle_Constraint {
  /** unique or primary key constraint on columns "id" */
  SteriCyclePkey = 'steri_cycle_pkey',
  /** unique or primary key constraint on columns "cycle_number", "sterilizer_id" */
  SteriCycleSterilizerIdCycleNumberKey = 'steri_cycle_sterilizer_id_cycle_number_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Steri_Cycle_Delete_At_Path_Input = {
  log_data?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Steri_Cycle_Delete_Elem_Input = {
  log_data?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Steri_Cycle_Delete_Key_Input = {
  log_data?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "steri_cycle" */
export type Steri_Cycle_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  sterilizer_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "steri_cycle" */
export type Steri_Cycle_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  cycle_number?: InputMaybe<Scalars['String']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  finish_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  finish_user_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_spore_test_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  log_data?: InputMaybe<Scalars['jsonb']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  spore_test_passed?: InputMaybe<Scalars['Boolean']['input']>;
  spore_test_recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  spore_test_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  spore_test_user_id?: InputMaybe<Scalars['uuid']['input']>;
  start_at?: InputMaybe<Scalars['timestamp']['input']>;
  start_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  start_user_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Steri_Cycle_Status_Enum>;
  steri_labels?: InputMaybe<Steri_Label_Arr_Rel_Insert_Input>;
  sterilizer?: InputMaybe<Sterilizer_Obj_Rel_Insert_Input>;
  sterilizer_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Steri_Cycle_Max_Fields = {
  __typename?: 'steri_cycle_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  cycle_number?: Maybe<Scalars['String']['output']>;
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  finish_user_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  spore_test_recorded_at?: Maybe<Scalars['timestamptz']['output']>;
  spore_test_user_id?: Maybe<Scalars['uuid']['output']>;
  start_at?: Maybe<Scalars['timestamp']['output']>;
  start_user_id?: Maybe<Scalars['uuid']['output']>;
  sterilizer_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "steri_cycle" */
export type Steri_Cycle_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  cycle_number?: InputMaybe<Order_By>;
  finish_at?: InputMaybe<Order_By>;
  finish_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  spore_test_recorded_at?: InputMaybe<Order_By>;
  spore_test_user_id?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  start_user_id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Steri_Cycle_Min_Fields = {
  __typename?: 'steri_cycle_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  cycle_number?: Maybe<Scalars['String']['output']>;
  finish_at?: Maybe<Scalars['timestamptz']['output']>;
  finish_user_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  spore_test_recorded_at?: Maybe<Scalars['timestamptz']['output']>;
  spore_test_user_id?: Maybe<Scalars['uuid']['output']>;
  start_at?: Maybe<Scalars['timestamp']['output']>;
  start_user_id?: Maybe<Scalars['uuid']['output']>;
  sterilizer_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "steri_cycle" */
export type Steri_Cycle_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  cycle_number?: InputMaybe<Order_By>;
  finish_at?: InputMaybe<Order_By>;
  finish_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  spore_test_recorded_at?: InputMaybe<Order_By>;
  spore_test_user_id?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  start_user_id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "steri_cycle" */
export type Steri_Cycle_Mutation_Response = {
  __typename?: 'steri_cycle_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Steri_Cycle>;
};

/** input type for inserting object relation for remote table "steri_cycle" */
export type Steri_Cycle_Obj_Rel_Insert_Input = {
  data: Steri_Cycle_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Steri_Cycle_On_Conflict>;
};

/** on_conflict condition type for table "steri_cycle" */
export type Steri_Cycle_On_Conflict = {
  constraint: Steri_Cycle_Constraint;
  update_columns?: Array<Steri_Cycle_Update_Column>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};

/** Ordering options when selecting data from "steri_cycle". */
export type Steri_Cycle_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  cycle_number?: InputMaybe<Order_By>;
  finish_at?: InputMaybe<Order_By>;
  finish_user?: InputMaybe<User_Order_By>;
  finish_user_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_spore_test_enabled?: InputMaybe<Order_By>;
  log_data?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  spore_test_passed?: InputMaybe<Order_By>;
  spore_test_recorded_at?: InputMaybe<Order_By>;
  spore_test_user?: InputMaybe<User_Order_By>;
  spore_test_user_id?: InputMaybe<Order_By>;
  start_at?: InputMaybe<Order_By>;
  start_user?: InputMaybe<User_Order_By>;
  start_user_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Order_By>;
  sterilizer?: InputMaybe<Sterilizer_Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: steri_cycle */
export type Steri_Cycle_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Steri_Cycle_Prepend_Input = {
  log_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "steri_cycle" */
export enum Steri_Cycle_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  CycleNumber = 'cycle_number',
  /** column name */
  FinishAt = 'finish_at',
  /** column name */
  FinishUserId = 'finish_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsSporeTestEnabled = 'is_spore_test_enabled',
  /** column name */
  LogData = 'log_data',
  /** column name */
  Notes = 'notes',
  /** column name */
  SporeTestPassed = 'spore_test_passed',
  /** column name */
  SporeTestRecordedAt = 'spore_test_recorded_at',
  /** column name */
  SporeTestUserId = 'spore_test_user_id',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StartUserId = 'start_user_id',
  /** column name */
  Status = 'status',
  /** column name */
  SterilizerId = 'sterilizer_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "steri_cycle_aggregate_bool_exp_bool_and_arguments_columns" columns of table "steri_cycle" */
export enum Steri_Cycle_Select_Column_Steri_Cycle_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsSporeTestEnabled = 'is_spore_test_enabled',
  /** column name */
  SporeTestPassed = 'spore_test_passed'
}

/** select "steri_cycle_aggregate_bool_exp_bool_or_arguments_columns" columns of table "steri_cycle" */
export enum Steri_Cycle_Select_Column_Steri_Cycle_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsSporeTestEnabled = 'is_spore_test_enabled',
  /** column name */
  SporeTestPassed = 'spore_test_passed'
}

/** input type for updating data in table "steri_cycle" */
export type Steri_Cycle_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  cycle_number?: InputMaybe<Scalars['String']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  finish_user_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_spore_test_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  log_data?: InputMaybe<Scalars['jsonb']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  spore_test_passed?: InputMaybe<Scalars['Boolean']['input']>;
  spore_test_recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  spore_test_user_id?: InputMaybe<Scalars['uuid']['input']>;
  start_at?: InputMaybe<Scalars['timestamp']['input']>;
  start_user_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Steri_Cycle_Status_Enum>;
  sterilizer_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "steri_cycle_status" */
export type Steri_Cycle_Status = {
  __typename?: 'steri_cycle_status';
  id: Scalars['String']['output'];
};

/** aggregated selection of "steri_cycle_status" */
export type Steri_Cycle_Status_Aggregate = {
  __typename?: 'steri_cycle_status_aggregate';
  aggregate?: Maybe<Steri_Cycle_Status_Aggregate_Fields>;
  nodes: Array<Steri_Cycle_Status>;
};

/** aggregate fields of "steri_cycle_status" */
export type Steri_Cycle_Status_Aggregate_Fields = {
  __typename?: 'steri_cycle_status_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Steri_Cycle_Status_Max_Fields>;
  min?: Maybe<Steri_Cycle_Status_Min_Fields>;
};


/** aggregate fields of "steri_cycle_status" */
export type Steri_Cycle_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Steri_Cycle_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "steri_cycle_status". All fields are combined with a logical 'AND'. */
export type Steri_Cycle_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Steri_Cycle_Status_Bool_Exp>>;
  _not?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Steri_Cycle_Status_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "steri_cycle_status" */
export enum Steri_Cycle_Status_Constraint {
  /** unique or primary key constraint on columns "id" */
  SteriCycleStatusPkey = 'steri_cycle_status_pkey'
}

export enum Steri_Cycle_Status_Enum {
  Failed = 'failed',
  Finished = 'finished',
  Loading = 'loading',
  Running = 'running'
}

/** Boolean expression to compare columns of type "steri_cycle_status_enum". All fields are combined with logical 'AND'. */
export type Steri_Cycle_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Steri_Cycle_Status_Enum>;
  _in?: InputMaybe<Array<Steri_Cycle_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Steri_Cycle_Status_Enum>;
  _nin?: InputMaybe<Array<Steri_Cycle_Status_Enum>>;
};

/** input type for inserting data into table "steri_cycle_status" */
export type Steri_Cycle_Status_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Steri_Cycle_Status_Max_Fields = {
  __typename?: 'steri_cycle_status_max_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Steri_Cycle_Status_Min_Fields = {
  __typename?: 'steri_cycle_status_min_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "steri_cycle_status" */
export type Steri_Cycle_Status_Mutation_Response = {
  __typename?: 'steri_cycle_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Steri_Cycle_Status>;
};

/** on_conflict condition type for table "steri_cycle_status" */
export type Steri_Cycle_Status_On_Conflict = {
  constraint: Steri_Cycle_Status_Constraint;
  update_columns?: Array<Steri_Cycle_Status_Update_Column>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "steri_cycle_status". */
export type Steri_Cycle_Status_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: steri_cycle_status */
export type Steri_Cycle_Status_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "steri_cycle_status" */
export enum Steri_Cycle_Status_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "steri_cycle_status" */
export type Steri_Cycle_Status_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "steri_cycle_status" */
export type Steri_Cycle_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Steri_Cycle_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Steri_Cycle_Status_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "steri_cycle_status" */
export enum Steri_Cycle_Status_Update_Column {
  /** column name */
  Id = 'id'
}

export type Steri_Cycle_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Steri_Cycle_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Steri_Cycle_Status_Bool_Exp;
};

/** aggregate stddev on columns */
export type Steri_Cycle_Stddev_Fields = {
  __typename?: 'steri_cycle_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "steri_cycle" */
export type Steri_Cycle_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Steri_Cycle_Stddev_Pop_Fields = {
  __typename?: 'steri_cycle_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "steri_cycle" */
export type Steri_Cycle_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Steri_Cycle_Stddev_Samp_Fields = {
  __typename?: 'steri_cycle_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "steri_cycle" */
export type Steri_Cycle_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "steri_cycle" */
export type Steri_Cycle_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Steri_Cycle_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Steri_Cycle_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  cycle_number?: InputMaybe<Scalars['String']['input']>;
  finish_at?: InputMaybe<Scalars['timestamptz']['input']>;
  finish_user_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_spore_test_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  log_data?: InputMaybe<Scalars['jsonb']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  spore_test_passed?: InputMaybe<Scalars['Boolean']['input']>;
  spore_test_recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  spore_test_user_id?: InputMaybe<Scalars['uuid']['input']>;
  start_at?: InputMaybe<Scalars['timestamp']['input']>;
  start_user_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Steri_Cycle_Status_Enum>;
  sterilizer_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Steri_Cycle_Sum_Fields = {
  __typename?: 'steri_cycle_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  sterilizer_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "steri_cycle" */
export type Steri_Cycle_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** update columns of table "steri_cycle" */
export enum Steri_Cycle_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  CycleNumber = 'cycle_number',
  /** column name */
  FinishAt = 'finish_at',
  /** column name */
  FinishUserId = 'finish_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsSporeTestEnabled = 'is_spore_test_enabled',
  /** column name */
  LogData = 'log_data',
  /** column name */
  Notes = 'notes',
  /** column name */
  SporeTestPassed = 'spore_test_passed',
  /** column name */
  SporeTestRecordedAt = 'spore_test_recorded_at',
  /** column name */
  SporeTestUserId = 'spore_test_user_id',
  /** column name */
  StartAt = 'start_at',
  /** column name */
  StartUserId = 'start_user_id',
  /** column name */
  Status = 'status',
  /** column name */
  SterilizerId = 'sterilizer_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Steri_Cycle_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Steri_Cycle_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Steri_Cycle_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Steri_Cycle_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Steri_Cycle_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Steri_Cycle_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Steri_Cycle_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Steri_Cycle_Set_Input>;
  /** filter the rows which have to be updated */
  where: Steri_Cycle_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Steri_Cycle_Var_Pop_Fields = {
  __typename?: 'steri_cycle_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "steri_cycle" */
export type Steri_Cycle_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Steri_Cycle_Var_Samp_Fields = {
  __typename?: 'steri_cycle_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "steri_cycle" */
export type Steri_Cycle_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Steri_Cycle_Variance_Fields = {
  __typename?: 'steri_cycle_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sterilizer_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "steri_cycle" */
export type Steri_Cycle_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  sterilizer_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "steri_item" */
export type Steri_Item = {
  __typename?: 'steri_item';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  category: Scalars['citext']['output'];
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  id: Scalars['bigint']['output'];
  is_count_enabled: Scalars['Boolean']['output'];
  name: Scalars['citext']['output'];
  /** An array relationship */
  steri_labels: Array<Steri_Label>;
  /** An aggregate relationship */
  steri_labels_aggregate: Steri_Label_Aggregate;
  total_count: Scalars['Int']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "steri_item" */
export type Steri_ItemSteri_LabelsArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


/** columns and relationships of "steri_item" */
export type Steri_ItemSteri_Labels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};

/** aggregated selection of "steri_item" */
export type Steri_Item_Aggregate = {
  __typename?: 'steri_item_aggregate';
  aggregate?: Maybe<Steri_Item_Aggregate_Fields>;
  nodes: Array<Steri_Item>;
};

export type Steri_Item_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Steri_Item_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Steri_Item_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Steri_Item_Aggregate_Bool_Exp_Count>;
};

export type Steri_Item_Aggregate_Bool_Exp_Bool_And = {
  arguments: Steri_Item_Select_Column_Steri_Item_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Item_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Steri_Item_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Steri_Item_Select_Column_Steri_Item_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Item_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Steri_Item_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Steri_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Item_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "steri_item" */
export type Steri_Item_Aggregate_Fields = {
  __typename?: 'steri_item_aggregate_fields';
  avg?: Maybe<Steri_Item_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Steri_Item_Max_Fields>;
  min?: Maybe<Steri_Item_Min_Fields>;
  stddev?: Maybe<Steri_Item_Stddev_Fields>;
  stddev_pop?: Maybe<Steri_Item_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Steri_Item_Stddev_Samp_Fields>;
  sum?: Maybe<Steri_Item_Sum_Fields>;
  var_pop?: Maybe<Steri_Item_Var_Pop_Fields>;
  var_samp?: Maybe<Steri_Item_Var_Samp_Fields>;
  variance?: Maybe<Steri_Item_Variance_Fields>;
};


/** aggregate fields of "steri_item" */
export type Steri_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Steri_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "steri_item" */
export type Steri_Item_Aggregate_Order_By = {
  avg?: InputMaybe<Steri_Item_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Steri_Item_Max_Order_By>;
  min?: InputMaybe<Steri_Item_Min_Order_By>;
  stddev?: InputMaybe<Steri_Item_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Steri_Item_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Steri_Item_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Steri_Item_Sum_Order_By>;
  var_pop?: InputMaybe<Steri_Item_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Steri_Item_Var_Samp_Order_By>;
  variance?: InputMaybe<Steri_Item_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "steri_item" */
export type Steri_Item_Arr_Rel_Insert_Input = {
  data: Array<Steri_Item_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Steri_Item_On_Conflict>;
};

/** aggregate avg on columns */
export type Steri_Item_Avg_Fields = {
  __typename?: 'steri_item_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "steri_item" */
export type Steri_Item_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "steri_item". All fields are combined with a logical 'AND'. */
export type Steri_Item_Bool_Exp = {
  _and?: InputMaybe<Array<Steri_Item_Bool_Exp>>;
  _not?: InputMaybe<Steri_Item_Bool_Exp>;
  _or?: InputMaybe<Array<Steri_Item_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  category?: InputMaybe<Citext_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  is_count_enabled?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<Citext_Comparison_Exp>;
  steri_labels?: InputMaybe<Steri_Label_Bool_Exp>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Bool_Exp>;
  total_count?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "steri_item" */
export enum Steri_Item_Constraint {
  /** unique or primary key constraint on columns "id" */
  SteriItemPkey = 'steri_item_pkey'
}

/** input type for incrementing numeric columns in table "steri_item" */
export type Steri_Item_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  total_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "steri_item" */
export type Steri_Item_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  category?: InputMaybe<Scalars['citext']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_count_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  steri_labels?: InputMaybe<Steri_Label_Arr_Rel_Insert_Input>;
  total_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Steri_Item_Max_Fields = {
  __typename?: 'steri_item_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  category?: Maybe<Scalars['citext']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  total_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "steri_item" */
export type Steri_Item_Max_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Steri_Item_Min_Fields = {
  __typename?: 'steri_item_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  category?: Maybe<Scalars['citext']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  total_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "steri_item" */
export type Steri_Item_Min_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "steri_item" */
export type Steri_Item_Mutation_Response = {
  __typename?: 'steri_item_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Steri_Item>;
};

/** input type for inserting object relation for remote table "steri_item" */
export type Steri_Item_Obj_Rel_Insert_Input = {
  data: Steri_Item_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Steri_Item_On_Conflict>;
};

/** on_conflict condition type for table "steri_item" */
export type Steri_Item_On_Conflict = {
  constraint: Steri_Item_Constraint;
  update_columns?: Array<Steri_Item_Update_Column>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};

/** Ordering options when selecting data from "steri_item". */
export type Steri_Item_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_count_enabled?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  steri_labels_aggregate?: InputMaybe<Steri_Label_Aggregate_Order_By>;
  total_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: steri_item */
export type Steri_Item_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "steri_item" */
export enum Steri_Item_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  Category = 'category',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsCountEnabled = 'is_count_enabled',
  /** column name */
  Name = 'name',
  /** column name */
  TotalCount = 'total_count',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "steri_item_aggregate_bool_exp_bool_and_arguments_columns" columns of table "steri_item" */
export enum Steri_Item_Select_Column_Steri_Item_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsCountEnabled = 'is_count_enabled'
}

/** select "steri_item_aggregate_bool_exp_bool_or_arguments_columns" columns of table "steri_item" */
export enum Steri_Item_Select_Column_Steri_Item_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsCountEnabled = 'is_count_enabled'
}

/** input type for updating data in table "steri_item" */
export type Steri_Item_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  category?: InputMaybe<Scalars['citext']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_count_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  total_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Steri_Item_Stddev_Fields = {
  __typename?: 'steri_item_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "steri_item" */
export type Steri_Item_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Steri_Item_Stddev_Pop_Fields = {
  __typename?: 'steri_item_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "steri_item" */
export type Steri_Item_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Steri_Item_Stddev_Samp_Fields = {
  __typename?: 'steri_item_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "steri_item" */
export type Steri_Item_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "steri_item" */
export type Steri_Item_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Steri_Item_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Steri_Item_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  category?: InputMaybe<Scalars['citext']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_count_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  total_count?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Steri_Item_Sum_Fields = {
  __typename?: 'steri_item_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  total_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "steri_item" */
export type Steri_Item_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** update columns of table "steri_item" */
export enum Steri_Item_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  Category = 'category',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsCountEnabled = 'is_count_enabled',
  /** column name */
  Name = 'name',
  /** column name */
  TotalCount = 'total_count',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Steri_Item_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Steri_Item_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Steri_Item_Set_Input>;
  /** filter the rows which have to be updated */
  where: Steri_Item_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Steri_Item_Var_Pop_Fields = {
  __typename?: 'steri_item_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "steri_item" */
export type Steri_Item_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Steri_Item_Var_Samp_Fields = {
  __typename?: 'steri_item_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "steri_item" */
export type Steri_Item_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Steri_Item_Variance_Fields = {
  __typename?: 'steri_item_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "steri_item" */
export type Steri_Item_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  total_count?: InputMaybe<Order_By>;
};

/** columns and relationships of "steri_label" */
export type Steri_Label = {
  __typename?: 'steri_label';
  /** An object relationship */
  appointment?: Maybe<Appointment>;
  appointment_id?: Maybe<Scalars['bigint']['output']>;
  checkout_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  checkout_user?: Maybe<User>;
  checkout_user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  count?: Maybe<Count>;
  count_id?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  count_user?: Maybe<User>;
  count_user_id?: Maybe<Scalars['uuid']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  expiry_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  next_label_id?: Maybe<Scalars['bigint']['output']>;
  printed_at?: Maybe<Scalars['timestamptz']['output']>;
  printer_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  steri_cycle?: Maybe<Steri_Cycle>;
  steri_cycle_id?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  steri_cycle_user?: Maybe<User>;
  steri_cycle_user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  steri_item: Steri_Item;
  steri_item_id: Scalars['bigint']['output'];
  steri_loaded_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "steri_label" */
export type Steri_Label_Aggregate = {
  __typename?: 'steri_label_aggregate';
  aggregate?: Maybe<Steri_Label_Aggregate_Fields>;
  nodes: Array<Steri_Label>;
};

export type Steri_Label_Aggregate_Bool_Exp = {
  count?: InputMaybe<Steri_Label_Aggregate_Bool_Exp_Count>;
};

export type Steri_Label_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Steri_Label_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Steri_Label_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "steri_label" */
export type Steri_Label_Aggregate_Fields = {
  __typename?: 'steri_label_aggregate_fields';
  avg?: Maybe<Steri_Label_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Steri_Label_Max_Fields>;
  min?: Maybe<Steri_Label_Min_Fields>;
  stddev?: Maybe<Steri_Label_Stddev_Fields>;
  stddev_pop?: Maybe<Steri_Label_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Steri_Label_Stddev_Samp_Fields>;
  sum?: Maybe<Steri_Label_Sum_Fields>;
  var_pop?: Maybe<Steri_Label_Var_Pop_Fields>;
  var_samp?: Maybe<Steri_Label_Var_Samp_Fields>;
  variance?: Maybe<Steri_Label_Variance_Fields>;
};


/** aggregate fields of "steri_label" */
export type Steri_Label_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Steri_Label_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "steri_label" */
export type Steri_Label_Aggregate_Order_By = {
  avg?: InputMaybe<Steri_Label_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Steri_Label_Max_Order_By>;
  min?: InputMaybe<Steri_Label_Min_Order_By>;
  stddev?: InputMaybe<Steri_Label_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Steri_Label_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Steri_Label_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Steri_Label_Sum_Order_By>;
  var_pop?: InputMaybe<Steri_Label_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Steri_Label_Var_Samp_Order_By>;
  variance?: InputMaybe<Steri_Label_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "steri_label" */
export type Steri_Label_Arr_Rel_Insert_Input = {
  data: Array<Steri_Label_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Steri_Label_On_Conflict>;
};

/** aggregate avg on columns */
export type Steri_Label_Avg_Fields = {
  __typename?: 'steri_label_avg_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "steri_label" */
export type Steri_Label_Avg_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "steri_label". All fields are combined with a logical 'AND'. */
export type Steri_Label_Bool_Exp = {
  _and?: InputMaybe<Array<Steri_Label_Bool_Exp>>;
  _not?: InputMaybe<Steri_Label_Bool_Exp>;
  _or?: InputMaybe<Array<Steri_Label_Bool_Exp>>;
  appointment?: InputMaybe<Appointment_Bool_Exp>;
  appointment_id?: InputMaybe<Bigint_Comparison_Exp>;
  checkout_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  checkout_user?: InputMaybe<User_Bool_Exp>;
  checkout_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  count?: InputMaybe<Count_Bool_Exp>;
  count_id?: InputMaybe<Bigint_Comparison_Exp>;
  count_user?: InputMaybe<User_Bool_Exp>;
  count_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  expiry_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  next_label_id?: InputMaybe<Bigint_Comparison_Exp>;
  printed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  printer_id?: InputMaybe<Uuid_Comparison_Exp>;
  steri_cycle?: InputMaybe<Steri_Cycle_Bool_Exp>;
  steri_cycle_id?: InputMaybe<Bigint_Comparison_Exp>;
  steri_cycle_user?: InputMaybe<User_Bool_Exp>;
  steri_cycle_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  steri_item?: InputMaybe<Steri_Item_Bool_Exp>;
  steri_item_id?: InputMaybe<Bigint_Comparison_Exp>;
  steri_loaded_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "steri_label" */
export enum Steri_Label_Constraint {
  /** unique or primary key constraint on columns "id" */
  SteriLabelPkey = 'steri_label_pkey'
}

/** input type for incrementing numeric columns in table "steri_label" */
export type Steri_Label_Inc_Input = {
  appointment_id?: InputMaybe<Scalars['bigint']['input']>;
  count_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  next_label_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_cycle_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "steri_label" */
export type Steri_Label_Insert_Input = {
  appointment?: InputMaybe<Appointment_Obj_Rel_Insert_Input>;
  appointment_id?: InputMaybe<Scalars['bigint']['input']>;
  checkout_at?: InputMaybe<Scalars['timestamptz']['input']>;
  checkout_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  checkout_user_id?: InputMaybe<Scalars['uuid']['input']>;
  count?: InputMaybe<Count_Obj_Rel_Insert_Input>;
  count_id?: InputMaybe<Scalars['bigint']['input']>;
  count_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  count_user_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  expiry_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  next_label_id?: InputMaybe<Scalars['bigint']['input']>;
  printed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_cycle?: InputMaybe<Steri_Cycle_Obj_Rel_Insert_Input>;
  steri_cycle_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_cycle_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  steri_cycle_user_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_item?: InputMaybe<Steri_Item_Obj_Rel_Insert_Input>;
  steri_item_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_loaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Steri_Label_Max_Fields = {
  __typename?: 'steri_label_max_fields';
  appointment_id?: Maybe<Scalars['bigint']['output']>;
  checkout_at?: Maybe<Scalars['timestamptz']['output']>;
  checkout_user_id?: Maybe<Scalars['uuid']['output']>;
  count_id?: Maybe<Scalars['bigint']['output']>;
  count_user_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  expiry_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  next_label_id?: Maybe<Scalars['bigint']['output']>;
  printed_at?: Maybe<Scalars['timestamptz']['output']>;
  printer_id?: Maybe<Scalars['uuid']['output']>;
  steri_cycle_id?: Maybe<Scalars['bigint']['output']>;
  steri_cycle_user_id?: Maybe<Scalars['uuid']['output']>;
  steri_item_id?: Maybe<Scalars['bigint']['output']>;
  steri_loaded_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "steri_label" */
export type Steri_Label_Max_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  checkout_at?: InputMaybe<Order_By>;
  checkout_user_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  count_user_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  expiry_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  printed_at?: InputMaybe<Order_By>;
  printer_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_cycle_user_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
  steri_loaded_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Steri_Label_Min_Fields = {
  __typename?: 'steri_label_min_fields';
  appointment_id?: Maybe<Scalars['bigint']['output']>;
  checkout_at?: Maybe<Scalars['timestamptz']['output']>;
  checkout_user_id?: Maybe<Scalars['uuid']['output']>;
  count_id?: Maybe<Scalars['bigint']['output']>;
  count_user_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  expiry_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  next_label_id?: Maybe<Scalars['bigint']['output']>;
  printed_at?: Maybe<Scalars['timestamptz']['output']>;
  printer_id?: Maybe<Scalars['uuid']['output']>;
  steri_cycle_id?: Maybe<Scalars['bigint']['output']>;
  steri_cycle_user_id?: Maybe<Scalars['uuid']['output']>;
  steri_item_id?: Maybe<Scalars['bigint']['output']>;
  steri_loaded_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "steri_label" */
export type Steri_Label_Min_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  checkout_at?: InputMaybe<Order_By>;
  checkout_user_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  count_user_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  expiry_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  printed_at?: InputMaybe<Order_By>;
  printer_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_cycle_user_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
  steri_loaded_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "steri_label" */
export type Steri_Label_Mutation_Response = {
  __typename?: 'steri_label_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Steri_Label>;
};

/** on_conflict condition type for table "steri_label" */
export type Steri_Label_On_Conflict = {
  constraint: Steri_Label_Constraint;
  update_columns?: Array<Steri_Label_Update_Column>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};

/** Ordering options when selecting data from "steri_label". */
export type Steri_Label_Order_By = {
  appointment?: InputMaybe<Appointment_Order_By>;
  appointment_id?: InputMaybe<Order_By>;
  checkout_at?: InputMaybe<Order_By>;
  checkout_user?: InputMaybe<User_Order_By>;
  checkout_user_id?: InputMaybe<Order_By>;
  count?: InputMaybe<Count_Order_By>;
  count_id?: InputMaybe<Order_By>;
  count_user?: InputMaybe<User_Order_By>;
  count_user_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  expiry_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  printed_at?: InputMaybe<Order_By>;
  printer_id?: InputMaybe<Order_By>;
  steri_cycle?: InputMaybe<Steri_Cycle_Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_cycle_user?: InputMaybe<User_Order_By>;
  steri_cycle_user_id?: InputMaybe<Order_By>;
  steri_item?: InputMaybe<Steri_Item_Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
  steri_loaded_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: steri_label */
export type Steri_Label_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "steri_label" */
export enum Steri_Label_Select_Column {
  /** column name */
  AppointmentId = 'appointment_id',
  /** column name */
  CheckoutAt = 'checkout_at',
  /** column name */
  CheckoutUserId = 'checkout_user_id',
  /** column name */
  CountId = 'count_id',
  /** column name */
  CountUserId = 'count_user_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  ExpiryAt = 'expiry_at',
  /** column name */
  Id = 'id',
  /** column name */
  NextLabelId = 'next_label_id',
  /** column name */
  PrintedAt = 'printed_at',
  /** column name */
  PrinterId = 'printer_id',
  /** column name */
  SteriCycleId = 'steri_cycle_id',
  /** column name */
  SteriCycleUserId = 'steri_cycle_user_id',
  /** column name */
  SteriItemId = 'steri_item_id',
  /** column name */
  SteriLoadedAt = 'steri_loaded_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "steri_label" */
export type Steri_Label_Set_Input = {
  appointment_id?: InputMaybe<Scalars['bigint']['input']>;
  checkout_at?: InputMaybe<Scalars['timestamptz']['input']>;
  checkout_user_id?: InputMaybe<Scalars['uuid']['input']>;
  count_id?: InputMaybe<Scalars['bigint']['input']>;
  count_user_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  expiry_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  next_label_id?: InputMaybe<Scalars['bigint']['input']>;
  printed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_cycle_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_cycle_user_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_item_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_loaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Steri_Label_Stddev_Fields = {
  __typename?: 'steri_label_stddev_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "steri_label" */
export type Steri_Label_Stddev_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Steri_Label_Stddev_Pop_Fields = {
  __typename?: 'steri_label_stddev_pop_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "steri_label" */
export type Steri_Label_Stddev_Pop_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Steri_Label_Stddev_Samp_Fields = {
  __typename?: 'steri_label_stddev_samp_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "steri_label" */
export type Steri_Label_Stddev_Samp_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "steri_label" */
export type Steri_Label_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Steri_Label_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Steri_Label_Stream_Cursor_Value_Input = {
  appointment_id?: InputMaybe<Scalars['bigint']['input']>;
  checkout_at?: InputMaybe<Scalars['timestamptz']['input']>;
  checkout_user_id?: InputMaybe<Scalars['uuid']['input']>;
  count_id?: InputMaybe<Scalars['bigint']['input']>;
  count_user_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  expiry_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  next_label_id?: InputMaybe<Scalars['bigint']['input']>;
  printed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  printer_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_cycle_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_cycle_user_id?: InputMaybe<Scalars['uuid']['input']>;
  steri_item_id?: InputMaybe<Scalars['bigint']['input']>;
  steri_loaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Steri_Label_Sum_Fields = {
  __typename?: 'steri_label_sum_fields';
  appointment_id?: Maybe<Scalars['bigint']['output']>;
  count_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  next_label_id?: Maybe<Scalars['bigint']['output']>;
  steri_cycle_id?: Maybe<Scalars['bigint']['output']>;
  steri_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "steri_label" */
export type Steri_Label_Sum_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** update columns of table "steri_label" */
export enum Steri_Label_Update_Column {
  /** column name */
  AppointmentId = 'appointment_id',
  /** column name */
  CheckoutAt = 'checkout_at',
  /** column name */
  CheckoutUserId = 'checkout_user_id',
  /** column name */
  CountId = 'count_id',
  /** column name */
  CountUserId = 'count_user_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  ExpiryAt = 'expiry_at',
  /** column name */
  Id = 'id',
  /** column name */
  NextLabelId = 'next_label_id',
  /** column name */
  PrintedAt = 'printed_at',
  /** column name */
  PrinterId = 'printer_id',
  /** column name */
  SteriCycleId = 'steri_cycle_id',
  /** column name */
  SteriCycleUserId = 'steri_cycle_user_id',
  /** column name */
  SteriItemId = 'steri_item_id',
  /** column name */
  SteriLoadedAt = 'steri_loaded_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Steri_Label_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Steri_Label_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Steri_Label_Set_Input>;
  /** filter the rows which have to be updated */
  where: Steri_Label_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Steri_Label_Var_Pop_Fields = {
  __typename?: 'steri_label_var_pop_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "steri_label" */
export type Steri_Label_Var_Pop_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Steri_Label_Var_Samp_Fields = {
  __typename?: 'steri_label_var_samp_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "steri_label" */
export type Steri_Label_Var_Samp_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Steri_Label_Variance_Fields = {
  __typename?: 'steri_label_variance_fields';
  appointment_id?: Maybe<Scalars['Float']['output']>;
  count_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  next_label_id?: Maybe<Scalars['Float']['output']>;
  steri_cycle_id?: Maybe<Scalars['Float']['output']>;
  steri_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "steri_label" */
export type Steri_Label_Variance_Order_By = {
  appointment_id?: InputMaybe<Order_By>;
  count_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_label_id?: InputMaybe<Order_By>;
  steri_cycle_id?: InputMaybe<Order_By>;
  steri_item_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "steri_template" */
export type Steri_Template = {
  __typename?: 'steri_template';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  id: Scalars['bigint']['output'];
  items: Scalars['jsonb']['output'];
  name: Scalars['citext']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "steri_template" */
export type Steri_TemplateItemsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "steri_template" */
export type Steri_Template_Aggregate = {
  __typename?: 'steri_template_aggregate';
  aggregate?: Maybe<Steri_Template_Aggregate_Fields>;
  nodes: Array<Steri_Template>;
};

/** aggregate fields of "steri_template" */
export type Steri_Template_Aggregate_Fields = {
  __typename?: 'steri_template_aggregate_fields';
  avg?: Maybe<Steri_Template_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Steri_Template_Max_Fields>;
  min?: Maybe<Steri_Template_Min_Fields>;
  stddev?: Maybe<Steri_Template_Stddev_Fields>;
  stddev_pop?: Maybe<Steri_Template_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Steri_Template_Stddev_Samp_Fields>;
  sum?: Maybe<Steri_Template_Sum_Fields>;
  var_pop?: Maybe<Steri_Template_Var_Pop_Fields>;
  var_samp?: Maybe<Steri_Template_Var_Samp_Fields>;
  variance?: Maybe<Steri_Template_Variance_Fields>;
};


/** aggregate fields of "steri_template" */
export type Steri_Template_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Steri_Template_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Steri_Template_Append_Input = {
  items?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type Steri_Template_Avg_Fields = {
  __typename?: 'steri_template_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "steri_template". All fields are combined with a logical 'AND'. */
export type Steri_Template_Bool_Exp = {
  _and?: InputMaybe<Array<Steri_Template_Bool_Exp>>;
  _not?: InputMaybe<Steri_Template_Bool_Exp>;
  _or?: InputMaybe<Array<Steri_Template_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  items?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<Citext_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "steri_template" */
export enum Steri_Template_Constraint {
  /** unique or primary key constraint on columns "id" */
  SteriTemplatePkey = 'steri_template_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Steri_Template_Delete_At_Path_Input = {
  items?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Steri_Template_Delete_Elem_Input = {
  items?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Steri_Template_Delete_Key_Input = {
  items?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "steri_template" */
export type Steri_Template_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "steri_template" */
export type Steri_Template_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  items?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Steri_Template_Max_Fields = {
  __typename?: 'steri_template_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Steri_Template_Min_Fields = {
  __typename?: 'steri_template_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "steri_template" */
export type Steri_Template_Mutation_Response = {
  __typename?: 'steri_template_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Steri_Template>;
};

/** on_conflict condition type for table "steri_template" */
export type Steri_Template_On_Conflict = {
  constraint: Steri_Template_Constraint;
  update_columns?: Array<Steri_Template_Update_Column>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};

/** Ordering options when selecting data from "steri_template". */
export type Steri_Template_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  items?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: steri_template */
export type Steri_Template_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Steri_Template_Prepend_Input = {
  items?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "steri_template" */
export enum Steri_Template_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Items = 'items',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "steri_template" */
export type Steri_Template_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  items?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Steri_Template_Stddev_Fields = {
  __typename?: 'steri_template_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Steri_Template_Stddev_Pop_Fields = {
  __typename?: 'steri_template_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Steri_Template_Stddev_Samp_Fields = {
  __typename?: 'steri_template_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "steri_template" */
export type Steri_Template_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Steri_Template_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Steri_Template_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  items?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Steri_Template_Sum_Fields = {
  __typename?: 'steri_template_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "steri_template" */
export enum Steri_Template_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Items = 'items',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Steri_Template_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Steri_Template_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Steri_Template_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Steri_Template_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Steri_Template_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Steri_Template_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Steri_Template_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Steri_Template_Set_Input>;
  /** filter the rows which have to be updated */
  where: Steri_Template_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Steri_Template_Var_Pop_Fields = {
  __typename?: 'steri_template_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Steri_Template_Var_Samp_Fields = {
  __typename?: 'steri_template_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Steri_Template_Variance_Fields = {
  __typename?: 'steri_template_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "sterilizer" */
export type Sterilizer = {
  __typename?: 'sterilizer';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  brand: Scalars['citext']['output'];
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  creator: User;
  creator_id: Scalars['uuid']['output'];
  id: Scalars['bigint']['output'];
  name: Scalars['citext']['output'];
  serial: Scalars['String']['output'];
  /** An array relationship */
  steri_cycles: Array<Steri_Cycle>;
  /** An aggregate relationship */
  steri_cycles_aggregate: Steri_Cycle_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "sterilizer" */
export type SterilizerSteri_CyclesArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


/** columns and relationships of "sterilizer" */
export type SterilizerSteri_Cycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};

/** aggregated selection of "sterilizer" */
export type Sterilizer_Aggregate = {
  __typename?: 'sterilizer_aggregate';
  aggregate?: Maybe<Sterilizer_Aggregate_Fields>;
  nodes: Array<Sterilizer>;
};

export type Sterilizer_Aggregate_Bool_Exp = {
  count?: InputMaybe<Sterilizer_Aggregate_Bool_Exp_Count>;
};

export type Sterilizer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Sterilizer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sterilizer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "sterilizer" */
export type Sterilizer_Aggregate_Fields = {
  __typename?: 'sterilizer_aggregate_fields';
  avg?: Maybe<Sterilizer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sterilizer_Max_Fields>;
  min?: Maybe<Sterilizer_Min_Fields>;
  stddev?: Maybe<Sterilizer_Stddev_Fields>;
  stddev_pop?: Maybe<Sterilizer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sterilizer_Stddev_Samp_Fields>;
  sum?: Maybe<Sterilizer_Sum_Fields>;
  var_pop?: Maybe<Sterilizer_Var_Pop_Fields>;
  var_samp?: Maybe<Sterilizer_Var_Samp_Fields>;
  variance?: Maybe<Sterilizer_Variance_Fields>;
};


/** aggregate fields of "sterilizer" */
export type Sterilizer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sterilizer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sterilizer" */
export type Sterilizer_Aggregate_Order_By = {
  avg?: InputMaybe<Sterilizer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sterilizer_Max_Order_By>;
  min?: InputMaybe<Sterilizer_Min_Order_By>;
  stddev?: InputMaybe<Sterilizer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Sterilizer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Sterilizer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Sterilizer_Sum_Order_By>;
  var_pop?: InputMaybe<Sterilizer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Sterilizer_Var_Samp_Order_By>;
  variance?: InputMaybe<Sterilizer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "sterilizer" */
export type Sterilizer_Arr_Rel_Insert_Input = {
  data: Array<Sterilizer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Sterilizer_On_Conflict>;
};

/** aggregate avg on columns */
export type Sterilizer_Avg_Fields = {
  __typename?: 'sterilizer_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sterilizer" */
export type Sterilizer_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "sterilizer". All fields are combined with a logical 'AND'. */
export type Sterilizer_Bool_Exp = {
  _and?: InputMaybe<Array<Sterilizer_Bool_Exp>>;
  _not?: InputMaybe<Sterilizer_Bool_Exp>;
  _or?: InputMaybe<Array<Sterilizer_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  brand?: InputMaybe<Citext_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<Citext_Comparison_Exp>;
  serial?: InputMaybe<String_Comparison_Exp>;
  steri_cycles?: InputMaybe<Steri_Cycle_Bool_Exp>;
  steri_cycles_aggregate?: InputMaybe<Steri_Cycle_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "sterilizer" */
export enum Sterilizer_Constraint {
  /** unique or primary key constraint on columns "clinic_id", "serial" */
  SterilizerClinicIdSerialKey = 'sterilizer_clinic_id_serial_key',
  /** unique or primary key constraint on columns "id" */
  SterilizerPkey = 'sterilizer_pkey'
}

/** columns and relationships of "sterilizer_count" */
export type Sterilizer_Count = {
  __typename?: 'sterilizer_count';
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  total_cycles?: Maybe<Scalars['bigint']['output']>;
};

/** aggregated selection of "sterilizer_count" */
export type Sterilizer_Count_Aggregate = {
  __typename?: 'sterilizer_count_aggregate';
  aggregate?: Maybe<Sterilizer_Count_Aggregate_Fields>;
  nodes: Array<Sterilizer_Count>;
};

/** aggregate fields of "sterilizer_count" */
export type Sterilizer_Count_Aggregate_Fields = {
  __typename?: 'sterilizer_count_aggregate_fields';
  avg?: Maybe<Sterilizer_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sterilizer_Count_Max_Fields>;
  min?: Maybe<Sterilizer_Count_Min_Fields>;
  stddev?: Maybe<Sterilizer_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Sterilizer_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sterilizer_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Sterilizer_Count_Sum_Fields>;
  var_pop?: Maybe<Sterilizer_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Sterilizer_Count_Var_Samp_Fields>;
  variance?: Maybe<Sterilizer_Count_Variance_Fields>;
};


/** aggregate fields of "sterilizer_count" */
export type Sterilizer_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sterilizer_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Sterilizer_Count_Avg_Fields = {
  __typename?: 'sterilizer_count_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "sterilizer_count". All fields are combined with a logical 'AND'. */
export type Sterilizer_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Sterilizer_Count_Bool_Exp>>;
  _not?: InputMaybe<Sterilizer_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Sterilizer_Count_Bool_Exp>>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  total_cycles?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Sterilizer_Count_Max_Fields = {
  __typename?: 'sterilizer_count_max_fields';
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  total_cycles?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Sterilizer_Count_Min_Fields = {
  __typename?: 'sterilizer_count_min_fields';
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  total_cycles?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "sterilizer_count". */
export type Sterilizer_Count_Order_By = {
  clinic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_cycles?: InputMaybe<Order_By>;
};

/** select columns of table "sterilizer_count" */
export enum Sterilizer_Count_Select_Column {
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  Id = 'id',
  /** column name */
  TotalCycles = 'total_cycles'
}

/** aggregate stddev on columns */
export type Sterilizer_Count_Stddev_Fields = {
  __typename?: 'sterilizer_count_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Sterilizer_Count_Stddev_Pop_Fields = {
  __typename?: 'sterilizer_count_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Sterilizer_Count_Stddev_Samp_Fields = {
  __typename?: 'sterilizer_count_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "sterilizer_count" */
export type Sterilizer_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sterilizer_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sterilizer_Count_Stream_Cursor_Value_Input = {
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  total_cycles?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Sterilizer_Count_Sum_Fields = {
  __typename?: 'sterilizer_count_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  total_cycles?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Sterilizer_Count_Var_Pop_Fields = {
  __typename?: 'sterilizer_count_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Sterilizer_Count_Var_Samp_Fields = {
  __typename?: 'sterilizer_count_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Sterilizer_Count_Variance_Fields = {
  __typename?: 'sterilizer_count_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  total_cycles?: Maybe<Scalars['Float']['output']>;
};

/** input type for incrementing numeric columns in table "sterilizer" */
export type Sterilizer_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "sterilizer" */
export type Sterilizer_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  brand?: InputMaybe<Scalars['citext']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator?: InputMaybe<User_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  steri_cycles?: InputMaybe<Steri_Cycle_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Sterilizer_Max_Fields = {
  __typename?: 'sterilizer_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  brand?: Maybe<Scalars['citext']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  serial?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "sterilizer" */
export type Sterilizer_Max_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  brand?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sterilizer_Min_Fields = {
  __typename?: 'sterilizer_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  brand?: Maybe<Scalars['citext']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creator_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['citext']['output']>;
  serial?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "sterilizer" */
export type Sterilizer_Min_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  brand?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sterilizer" */
export type Sterilizer_Mutation_Response = {
  __typename?: 'sterilizer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sterilizer>;
};

/** input type for inserting object relation for remote table "sterilizer" */
export type Sterilizer_Obj_Rel_Insert_Input = {
  data: Sterilizer_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sterilizer_On_Conflict>;
};

/** on_conflict condition type for table "sterilizer" */
export type Sterilizer_On_Conflict = {
  constraint: Sterilizer_Constraint;
  update_columns?: Array<Sterilizer_Update_Column>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};

/** Ordering options when selecting data from "sterilizer". */
export type Sterilizer_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  brand?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  steri_cycles_aggregate?: InputMaybe<Steri_Cycle_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sterilizer */
export type Sterilizer_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "sterilizer" */
export enum Sterilizer_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  Brand = 'brand',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Serial = 'serial',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "sterilizer" */
export type Sterilizer_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  brand?: InputMaybe<Scalars['citext']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Sterilizer_Stddev_Fields = {
  __typename?: 'sterilizer_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sterilizer" */
export type Sterilizer_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sterilizer_Stddev_Pop_Fields = {
  __typename?: 'sterilizer_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sterilizer" */
export type Sterilizer_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sterilizer_Stddev_Samp_Fields = {
  __typename?: 'sterilizer_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sterilizer" */
export type Sterilizer_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "sterilizer" */
export type Sterilizer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sterilizer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sterilizer_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  brand?: InputMaybe<Scalars['citext']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creator_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['citext']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Sterilizer_Sum_Fields = {
  __typename?: 'sterilizer_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "sterilizer" */
export type Sterilizer_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "sterilizer" */
export enum Sterilizer_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  Brand = 'brand',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Serial = 'serial',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Sterilizer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sterilizer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sterilizer_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sterilizer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sterilizer_Var_Pop_Fields = {
  __typename?: 'sterilizer_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sterilizer" */
export type Sterilizer_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sterilizer_Var_Samp_Fields = {
  __typename?: 'sterilizer_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sterilizer" */
export type Sterilizer_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Sterilizer_Variance_Fields = {
  __typename?: 'sterilizer_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sterilizer" */
export type Sterilizer_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "appointment" */
  appointment: Array<Appointment>;
  /** fetch aggregated fields from the table: "appointment" */
  appointment_aggregate: Appointment_Aggregate;
  /** fetch data from the table: "appointment" using primary key columns */
  appointment_by_pk?: Maybe<Appointment>;
  /** fetch data from the table: "appointment_state" */
  appointment_state: Array<Appointment_State>;
  /** fetch aggregated fields from the table: "appointment_state" */
  appointment_state_aggregate: Appointment_State_Aggregate;
  /** fetch data from the table: "appointment_state" using primary key columns */
  appointment_state_by_pk?: Maybe<Appointment_State>;
  /** fetch data from the table in a streaming manner: "appointment_state" */
  appointment_state_stream: Array<Appointment_State>;
  /** fetch data from the table in a streaming manner: "appointment" */
  appointment_stream: Array<Appointment>;
  /** fetch data from the table: "clinic" */
  clinic: Array<Clinic>;
  /** fetch aggregated fields from the table: "clinic" */
  clinic_aggregate: Clinic_Aggregate;
  /** fetch data from the table: "clinic" using primary key columns */
  clinic_by_pk?: Maybe<Clinic>;
  /** fetch data from the table in a streaming manner: "clinic" */
  clinic_stream: Array<Clinic>;
  /** fetch data from the table: "count" */
  count: Array<Count>;
  /** fetch aggregated fields from the table: "count" */
  count_aggregate: Count_Aggregate;
  /** fetch data from the table: "count" using primary key columns */
  count_by_pk?: Maybe<Count>;
  /** fetch data from the table in a streaming manner: "count" */
  count_stream: Array<Count>;
  /** execute function "fuzzy_search_patient" which returns "patient" */
  fuzzy_search_patient: Array<Patient>;
  /** execute function "fuzzy_search_patient" and query aggregates on result of table type "patient" */
  fuzzy_search_patient_aggregate: Patient_Aggregate;
  /** fetch data from the table: "patient" */
  patient: Array<Patient>;
  /** fetch aggregated fields from the table: "patient" */
  patient_aggregate: Patient_Aggregate;
  /** fetch data from the table: "patient" using primary key columns */
  patient_by_pk?: Maybe<Patient>;
  /** fetch data from the table in a streaming manner: "patient" */
  patient_stream: Array<Patient>;
  /** fetch data from the table: "printer" */
  printer: Array<Printer>;
  /** fetch aggregated fields from the table: "printer" */
  printer_aggregate: Printer_Aggregate;
  /** fetch data from the table: "printer" using primary key columns */
  printer_by_pk?: Maybe<Printer>;
  /** fetch data from the table: "printer_command" */
  printer_command: Array<Printer_Command>;
  /** fetch aggregated fields from the table: "printer_command" */
  printer_command_aggregate: Printer_Command_Aggregate;
  /** fetch data from the table: "printer_command" using primary key columns */
  printer_command_by_pk?: Maybe<Printer_Command>;
  /** fetch data from the table in a streaming manner: "printer_command" */
  printer_command_stream: Array<Printer_Command>;
  /** fetch data from the table: "printer_command_type" */
  printer_command_type: Array<Printer_Command_Type>;
  /** fetch aggregated fields from the table: "printer_command_type" */
  printer_command_type_aggregate: Printer_Command_Type_Aggregate;
  /** fetch data from the table: "printer_command_type" using primary key columns */
  printer_command_type_by_pk?: Maybe<Printer_Command_Type>;
  /** fetch data from the table in a streaming manner: "printer_command_type" */
  printer_command_type_stream: Array<Printer_Command_Type>;
  /** fetch data from the table in a streaming manner: "printer" */
  printer_stream: Array<Printer>;
  /** fetch data from the table: "steri_cycle" */
  steri_cycle: Array<Steri_Cycle>;
  /** fetch aggregated fields from the table: "steri_cycle" */
  steri_cycle_aggregate: Steri_Cycle_Aggregate;
  /** fetch data from the table: "steri_cycle" using primary key columns */
  steri_cycle_by_pk?: Maybe<Steri_Cycle>;
  /** fetch data from the table: "steri_cycle_status" */
  steri_cycle_status: Array<Steri_Cycle_Status>;
  /** fetch aggregated fields from the table: "steri_cycle_status" */
  steri_cycle_status_aggregate: Steri_Cycle_Status_Aggregate;
  /** fetch data from the table: "steri_cycle_status" using primary key columns */
  steri_cycle_status_by_pk?: Maybe<Steri_Cycle_Status>;
  /** fetch data from the table in a streaming manner: "steri_cycle_status" */
  steri_cycle_status_stream: Array<Steri_Cycle_Status>;
  /** fetch data from the table in a streaming manner: "steri_cycle" */
  steri_cycle_stream: Array<Steri_Cycle>;
  /** fetch data from the table: "steri_item" */
  steri_item: Array<Steri_Item>;
  /** fetch aggregated fields from the table: "steri_item" */
  steri_item_aggregate: Steri_Item_Aggregate;
  /** fetch data from the table: "steri_item" using primary key columns */
  steri_item_by_pk?: Maybe<Steri_Item>;
  /** fetch data from the table in a streaming manner: "steri_item" */
  steri_item_stream: Array<Steri_Item>;
  /** fetch data from the table: "steri_label" */
  steri_label: Array<Steri_Label>;
  /** fetch aggregated fields from the table: "steri_label" */
  steri_label_aggregate: Steri_Label_Aggregate;
  /** fetch data from the table: "steri_label" using primary key columns */
  steri_label_by_pk?: Maybe<Steri_Label>;
  /** fetch data from the table in a streaming manner: "steri_label" */
  steri_label_stream: Array<Steri_Label>;
  /** fetch data from the table: "steri_template" */
  steri_template: Array<Steri_Template>;
  /** fetch aggregated fields from the table: "steri_template" */
  steri_template_aggregate: Steri_Template_Aggregate;
  /** fetch data from the table: "steri_template" using primary key columns */
  steri_template_by_pk?: Maybe<Steri_Template>;
  /** fetch data from the table in a streaming manner: "steri_template" */
  steri_template_stream: Array<Steri_Template>;
  /** fetch data from the table: "sterilizer" */
  sterilizer: Array<Sterilizer>;
  /** fetch aggregated fields from the table: "sterilizer" */
  sterilizer_aggregate: Sterilizer_Aggregate;
  /** fetch data from the table: "sterilizer" using primary key columns */
  sterilizer_by_pk?: Maybe<Sterilizer>;
  /** fetch data from the table: "sterilizer_count" */
  sterilizer_count: Array<Sterilizer_Count>;
  /** fetch aggregated fields from the table: "sterilizer_count" */
  sterilizer_count_aggregate: Sterilizer_Count_Aggregate;
  /** fetch data from the table in a streaming manner: "sterilizer_count" */
  sterilizer_count_stream: Array<Sterilizer_Count>;
  /** fetch data from the table in a streaming manner: "sterilizer" */
  sterilizer_stream: Array<Sterilizer>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: Array<User>;
};


export type Subscription_RootAppointmentArgs = {
  distinct_on?: InputMaybe<Array<Appointment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_Order_By>>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};


export type Subscription_RootAppointment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_Order_By>>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};


export type Subscription_RootAppointment_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootAppointment_StateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_State_Order_By>>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};


export type Subscription_RootAppointment_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Appointment_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Appointment_State_Order_By>>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};


export type Subscription_RootAppointment_State_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAppointment_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Appointment_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Appointment_State_Bool_Exp>;
};


export type Subscription_RootAppointment_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Appointment_Stream_Cursor_Input>>;
  where?: InputMaybe<Appointment_Bool_Exp>;
};


export type Subscription_RootClinicArgs = {
  distinct_on?: InputMaybe<Array<Clinic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Clinic_Order_By>>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};


export type Subscription_RootClinic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clinic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Clinic_Order_By>>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};


export type Subscription_RootClinic_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootClinic_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Clinic_Stream_Cursor_Input>>;
  where?: InputMaybe<Clinic_Bool_Exp>;
};


export type Subscription_RootCountArgs = {
  distinct_on?: InputMaybe<Array<Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Count_Order_By>>;
  where?: InputMaybe<Count_Bool_Exp>;
};


export type Subscription_RootCount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Count_Order_By>>;
  where?: InputMaybe<Count_Bool_Exp>;
};


export type Subscription_RootCount_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootCount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Count_Bool_Exp>;
};


export type Subscription_RootFuzzy_Search_PatientArgs = {
  args: Fuzzy_Search_Patient_Args;
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Subscription_RootFuzzy_Search_Patient_AggregateArgs = {
  args: Fuzzy_Search_Patient_Args;
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Subscription_RootPatientArgs = {
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Subscription_RootPatient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Patient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Patient_Order_By>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Subscription_RootPatient_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPatient_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Patient_Stream_Cursor_Input>>;
  where?: InputMaybe<Patient_Bool_Exp>;
};


export type Subscription_RootPrinterArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


export type Subscription_RootPrinter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Order_By>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


export type Subscription_RootPrinter_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPrinter_CommandArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


export type Subscription_RootPrinter_Command_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Order_By>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


export type Subscription_RootPrinter_Command_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootPrinter_Command_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Printer_Command_Stream_Cursor_Input>>;
  where?: InputMaybe<Printer_Command_Bool_Exp>;
};


export type Subscription_RootPrinter_Command_TypeArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Type_Order_By>>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};


export type Subscription_RootPrinter_Command_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Printer_Command_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Printer_Command_Type_Order_By>>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};


export type Subscription_RootPrinter_Command_Type_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPrinter_Command_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Printer_Command_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Printer_Command_Type_Bool_Exp>;
};


export type Subscription_RootPrinter_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Printer_Stream_Cursor_Input>>;
  where?: InputMaybe<Printer_Bool_Exp>;
};


export type Subscription_RootSteri_CycleArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


export type Subscription_RootSteri_Cycle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


export type Subscription_RootSteri_Cycle_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSteri_Cycle_StatusArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Status_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};


export type Subscription_RootSteri_Cycle_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Cycle_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Cycle_Status_Order_By>>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};


export type Subscription_RootSteri_Cycle_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootSteri_Cycle_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Steri_Cycle_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Steri_Cycle_Status_Bool_Exp>;
};


export type Subscription_RootSteri_Cycle_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Steri_Cycle_Stream_Cursor_Input>>;
  where?: InputMaybe<Steri_Cycle_Bool_Exp>;
};


export type Subscription_RootSteri_ItemArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


export type Subscription_RootSteri_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Item_Order_By>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


export type Subscription_RootSteri_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSteri_Item_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Steri_Item_Stream_Cursor_Input>>;
  where?: InputMaybe<Steri_Item_Bool_Exp>;
};


export type Subscription_RootSteri_LabelArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


export type Subscription_RootSteri_Label_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Label_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Label_Order_By>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


export type Subscription_RootSteri_Label_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSteri_Label_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Steri_Label_Stream_Cursor_Input>>;
  where?: InputMaybe<Steri_Label_Bool_Exp>;
};


export type Subscription_RootSteri_TemplateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Template_Order_By>>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};


export type Subscription_RootSteri_Template_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Steri_Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Steri_Template_Order_By>>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};


export type Subscription_RootSteri_Template_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSteri_Template_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Steri_Template_Stream_Cursor_Input>>;
  where?: InputMaybe<Steri_Template_Bool_Exp>;
};


export type Subscription_RootSterilizerArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


export type Subscription_RootSterilizer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Order_By>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


export type Subscription_RootSterilizer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSterilizer_CountArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Count_Order_By>>;
  where?: InputMaybe<Sterilizer_Count_Bool_Exp>;
};


export type Subscription_RootSterilizer_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sterilizer_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sterilizer_Count_Order_By>>;
  where?: InputMaybe<Sterilizer_Count_Bool_Exp>;
};


export type Subscription_RootSterilizer_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sterilizer_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Sterilizer_Count_Bool_Exp>;
};


export type Subscription_RootSterilizer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sterilizer_Stream_Cursor_Input>>;
  where?: InputMaybe<Sterilizer_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  clinic: Clinic;
  clinic_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  email?: Maybe<Scalars['citext']['output']>;
  id: Scalars['uuid']['output'];
  is_editor: Scalars['Boolean']['output'];
  is_owner: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  onboarding_completed_at?: Maybe<Scalars['timestamptz']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  pin: Scalars['smallint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

export type User_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<User_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<User_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<User_Aggregate_Bool_Exp_Count>;
};

export type User_Aggregate_Bool_Exp_Bool_And = {
  arguments: User_Select_Column_User_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Aggregate_Bool_Exp_Bool_Or = {
  arguments: User_Select_Column_User_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: InputMaybe<User_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Max_Order_By>;
  min?: InputMaybe<User_Min_Order_By>;
  stddev?: InputMaybe<User_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Sum_Order_By>;
  var_pop?: InputMaybe<User_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  archived_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  clinic?: InputMaybe<Clinic_Bool_Exp>;
  clinic_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_editor?: InputMaybe<Boolean_Comparison_Exp>;
  is_owner?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  onboarding_completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  pin?: InputMaybe<Smallint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "clinic_id", "pin" */
  UserClinicIdPinKey = 'user_clinic_id_pin_key',
  /** unique or primary key constraint on columns "email" */
  UserEmailKey = 'user_email_key',
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey'
}

/** input type for incrementing numeric columns in table "user" */
export type User_Inc_Input = {
  pin?: InputMaybe<Scalars['smallint']['input']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic?: InputMaybe<Clinic_Obj_Rel_Insert_Input>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_editor?: InputMaybe<Scalars['Boolean']['input']>;
  is_owner?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onboarding_completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  pin?: InputMaybe<Scalars['smallint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['citext']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onboarding_completed_at?: Maybe<Scalars['timestamptz']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  pin?: Maybe<Scalars['smallint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  onboarding_completed_at?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  pin?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  archived_at?: Maybe<Scalars['timestamptz']['output']>;
  clinic_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['citext']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onboarding_completed_at?: Maybe<Scalars['timestamptz']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  pin?: Maybe<Scalars['smallint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  onboarding_completed_at?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  pin?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  archived_at?: InputMaybe<Order_By>;
  clinic?: InputMaybe<Clinic_Order_By>;
  clinic_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_editor?: InputMaybe<Order_By>;
  is_owner?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  onboarding_completed_at?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  pin?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsEditor = 'is_editor',
  /** column name */
  IsOwner = 'is_owner',
  /** column name */
  Name = 'name',
  /** column name */
  OnboardingCompletedAt = 'onboarding_completed_at',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  Pin = 'pin',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "user_aggregate_bool_exp_bool_and_arguments_columns" columns of table "user" */
export enum User_Select_Column_User_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsEditor = 'is_editor',
  /** column name */
  IsOwner = 'is_owner'
}

/** select "user_aggregate_bool_exp_bool_or_arguments_columns" columns of table "user" */
export enum User_Select_Column_User_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsEditor = 'is_editor',
  /** column name */
  IsOwner = 'is_owner'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_editor?: InputMaybe<Scalars['Boolean']['input']>;
  is_owner?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onboarding_completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  pin?: InputMaybe<Scalars['smallint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  archived_at?: InputMaybe<Scalars['timestamptz']['input']>;
  clinic_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_editor?: InputMaybe<Scalars['Boolean']['input']>;
  is_owner?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  onboarding_completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  pin?: InputMaybe<Scalars['smallint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  pin?: Maybe<Scalars['smallint']['output']>;
};

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  ArchivedAt = 'archived_at',
  /** column name */
  ClinicId = 'clinic_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsEditor = 'is_editor',
  /** column name */
  IsOwner = 'is_owner',
  /** column name */
  Name = 'name',
  /** column name */
  OnboardingCompletedAt = 'onboarding_completed_at',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  Pin = 'pin',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type User_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  pin?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  pin?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type PrinterCommandFragment = { __typename?: 'printer_command', id: any, created_at: any, printer_id: any, command: Printer_Command_Type_Enum, data?: any | null, executed_at?: any | null };

export type PrinterFragment = { __typename?: 'printer', id: any, clinic_id: any, paired_at?: any | null, last_seen_at?: any | null, version_number: number, update_started_at?: any | null, archived_at?: any | null, commands: Array<{ __typename?: 'printer_command', id: any, created_at: any, printer_id: any, command: Printer_Command_Type_Enum, data?: any | null, executed_at?: any | null }> };

export type GetPrinterQueryVariables = Exact<{
  printerId: Scalars['uuid']['input'];
}>;


export type GetPrinterQuery = { __typename?: 'query_root', printer_by_pk?: { __typename?: 'printer', id: any, clinic_id: any, paired_at?: any | null, last_seen_at?: any | null, version_number: number, update_started_at?: any | null, archived_at?: any | null, commands: Array<{ __typename?: 'printer_command', id: any, created_at: any, printer_id: any, command: Printer_Command_Type_Enum, data?: any | null, executed_at?: any | null }> } | null };

export type UpdatePrinterMutationVariables = Exact<{
  printerId: Scalars['uuid']['input'];
  set: Printer_Set_Input;
}>;


export type UpdatePrinterMutation = { __typename?: 'mutation_root', update_printer_by_pk?: { __typename?: 'printer', id: any, last_seen_at?: any | null } | null };

export type WatchPrinterSubscriptionVariables = Exact<{
  printerId: Scalars['uuid']['input'];
}>;


export type WatchPrinterSubscription = { __typename?: 'subscription_root', printer_by_pk?: { __typename?: 'printer', id: any, clinic_id: any, paired_at?: any | null, last_seen_at?: any | null, version_number: number, update_started_at?: any | null, archived_at?: any | null, commands: Array<{ __typename?: 'printer_command', id: any, created_at: any, printer_id: any, command: Printer_Command_Type_Enum, data?: any | null, executed_at?: any | null }> } | null };

export type UpdatePrinterCommandMutationVariables = Exact<{
  id: Scalars['bigint']['input'];
  set: Printer_Command_Set_Input;
}>;


export type UpdatePrinterCommandMutation = { __typename?: 'mutation_root', update_printer_command_by_pk?: { __typename?: 'printer_command', id: any } | null };

export const PrinterCommandFragmentDoc = gql`
    fragment PrinterCommand on printer_command {
  id
  created_at
  printer_id
  command
  data
  executed_at
}
    `;
export const PrinterFragmentDoc = gql`
    fragment Printer on printer {
  id
  clinic_id
  paired_at
  last_seen_at
  version_number
  update_started_at
  archived_at
  commands(where: {executed_at: {_is_null: true}}, order_by: {id: asc}, limit: 1) {
    ...PrinterCommand
  }
}
    ${PrinterCommandFragmentDoc}`;
export const GetPrinterDocument = gql`
    query getPrinter($printerId: uuid!) {
  printer_by_pk(id: $printerId) {
    ...Printer
  }
}
    ${PrinterFragmentDoc}`;
export const UpdatePrinterDocument = gql`
    mutation updatePrinter($printerId: uuid!, $set: printer_set_input!) {
  update_printer_by_pk(pk_columns: {id: $printerId}, _set: $set) {
    id
    last_seen_at
  }
}
    `;
export const WatchPrinterDocument = gql`
    subscription watchPrinter($printerId: uuid!) {
  printer_by_pk(id: $printerId) {
    ...Printer
  }
}
    ${PrinterFragmentDoc}`;
export const UpdatePrinterCommandDocument = gql`
    mutation updatePrinterCommand($id: bigint!, $set: printer_command_set_input!) {
  update_printer_command_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPrinter(variables: GetPrinterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetPrinterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPrinterQuery>({ document: GetPrinterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getPrinter', 'query', variables);
    },
    updatePrinter(variables: UpdatePrinterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePrinterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePrinterMutation>({ document: UpdatePrinterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'updatePrinter', 'mutation', variables);
    },
    watchPrinter(variables: WatchPrinterSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WatchPrinterSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<WatchPrinterSubscription>({ document: WatchPrinterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'watchPrinter', 'subscription', variables);
    },
    updatePrinterCommand(variables: UpdatePrinterCommandMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePrinterCommandMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePrinterCommandMutation>({ document: UpdatePrinterCommandDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'updatePrinterCommand', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;