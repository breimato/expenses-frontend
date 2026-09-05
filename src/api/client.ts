import { Configuration } from '@/api/generated';
import {
  DeleteAccountInvitationV1Api,
  DeleteAccountMemberV1Api,
  DeleteCategoryV1Api,
  DeleteExpenseV1Api,
  DeleteRecurringTemplateV1Api,
  GetAccountInvitationV1Api,
  GetAccountMembersV1Api,
  GetAccountV1Api,
  GetAccountsV1Api,
  GetAnalyticsAveragesV1Api,
  GetAnalyticsCategoryBreakdownV1Api,
  GetAnalyticsPeriodAverageV1Api,
  GetAnalyticsProjectionsV1Api,
  GetCategoriesV1Api,
  GetExpensesV1Api,
  GetRecurringTemplatesV1Api,
  PatchAccountV1Api,
  PatchCategoryV1Api,
  PatchExpenseV1Api,
  PatchRecurringTemplateV1Api,
  PostAccountInvitationAcceptV1Api,
  PostAccountInvitationV1Api,
  PostAccountLeaveV1Api,
  PostAccountTransferV1Api,
  PostAccountV1Api,
  PostAuthLoginV1Api,
  PostAuthRegisterV1Api,
  PostCategoryV1Api,
  PostExpenseV1Api,
  PostRecurringTemplateV1Api,
  RecurringApplicationsV1Api,
  RecurringTemplateApplicationsV1Api,
} from '@/api/generated';
import { fetchApi } from '@/api/fetchApi';
import { getAccessToken } from '@/context/AuthContext';
import { getApiBaseUrl } from '@/api/runtimeConfig';
import { toLocalIsoDate } from '@/utils/format';

function createConfiguration(): Configuration {
  return new Configuration({
    basePath: getApiBaseUrl(),
    fetchApi,
    accessToken: async () => getAccessToken() ?? '',
  });
}

let config = createConfiguration();

export let postAuthRegisterApi = new PostAuthRegisterV1Api(config);
export let postAuthLoginApi = new PostAuthLoginV1Api(config);

export let getAccountsApi = new GetAccountsV1Api(config);
export let getAccountApi = new GetAccountV1Api(config);
export let postAccountApi = new PostAccountV1Api(config);
export let patchAccountApi = new PatchAccountV1Api(config);
export let postAccountTransferApi = new PostAccountTransferV1Api(config);
export let postAccountInvitationApi = new PostAccountInvitationV1Api(config);
export let deleteAccountInvitationApi = new DeleteAccountInvitationV1Api(config);
export let getAccountInvitationApi = new GetAccountInvitationV1Api(config);
export let postAccountInvitationAcceptApi = new PostAccountInvitationAcceptV1Api(config);
export let getAccountMembersApi = new GetAccountMembersV1Api(config);
export let deleteAccountMemberApi = new DeleteAccountMemberV1Api(config);
export let postAccountLeaveApi = new PostAccountLeaveV1Api(config);

export let getCategoriesApi = new GetCategoriesV1Api(config);
export let postCategoryApi = new PostCategoryV1Api(config);
export let patchCategoryApi = new PatchCategoryV1Api(config);
export let deleteCategoryApi = new DeleteCategoryV1Api(config);

export let getExpensesApi = new GetExpensesV1Api(config);
export let postExpenseApi = new PostExpenseV1Api(config);
export let patchExpenseApi = new PatchExpenseV1Api(config);
export let deleteExpenseApi = new DeleteExpenseV1Api(config);

export let getRecurringTemplatesApi = new GetRecurringTemplatesV1Api(config);
export let postRecurringTemplateApi = new PostRecurringTemplateV1Api(config);
export let patchRecurringTemplateApi = new PatchRecurringTemplateV1Api(config);
export let deleteRecurringTemplateApi = new DeleteRecurringTemplateV1Api(config);
export let postRecurringTemplateQuickAddApi = new RecurringTemplateApplicationsV1Api(config);
export let postRecurringTemplatesApplyPendingApi = new RecurringApplicationsV1Api(config);

export let getAnalyticsAveragesApi = new GetAnalyticsAveragesV1Api(config);
export let getAnalyticsCategoryBreakdownApi = new GetAnalyticsCategoryBreakdownV1Api(config);
export let getAnalyticsPeriodAverageApi = new GetAnalyticsPeriodAverageV1Api(config);
export let getAnalyticsProjectionsApi = new GetAnalyticsProjectionsV1Api(config);

/** Rebuild API clients after runtime config is loaded. */
export function initApiClient(): void {
  config = createConfiguration();
  postAuthRegisterApi = new PostAuthRegisterV1Api(config);
  postAuthLoginApi = new PostAuthLoginV1Api(config);
  getAccountsApi = new GetAccountsV1Api(config);
  getAccountApi = new GetAccountV1Api(config);
  postAccountApi = new PostAccountV1Api(config);
  patchAccountApi = new PatchAccountV1Api(config);
  postAccountTransferApi = new PostAccountTransferV1Api(config);
  postAccountInvitationApi = new PostAccountInvitationV1Api(config);
  deleteAccountInvitationApi = new DeleteAccountInvitationV1Api(config);
  getAccountInvitationApi = new GetAccountInvitationV1Api(config);
  postAccountInvitationAcceptApi = new PostAccountInvitationAcceptV1Api(config);
  getAccountMembersApi = new GetAccountMembersV1Api(config);
  deleteAccountMemberApi = new DeleteAccountMemberV1Api(config);
  postAccountLeaveApi = new PostAccountLeaveV1Api(config);
  getCategoriesApi = new GetCategoriesV1Api(config);
  postCategoryApi = new PostCategoryV1Api(config);
  patchCategoryApi = new PatchCategoryV1Api(config);
  deleteCategoryApi = new DeleteCategoryV1Api(config);
  getExpensesApi = new GetExpensesV1Api(config);
  postExpenseApi = new PostExpenseV1Api(config);
  patchExpenseApi = new PatchExpenseV1Api(config);
  deleteExpenseApi = new DeleteExpenseV1Api(config);
  getRecurringTemplatesApi = new GetRecurringTemplatesV1Api(config);
  postRecurringTemplateApi = new PostRecurringTemplateV1Api(config);
  patchRecurringTemplateApi = new PatchRecurringTemplateV1Api(config);
  deleteRecurringTemplateApi = new DeleteRecurringTemplateV1Api(config);
  postRecurringTemplateQuickAddApi = new RecurringTemplateApplicationsV1Api(config);
  postRecurringTemplatesApplyPendingApi = new RecurringApplicationsV1Api(config);
  getAnalyticsAveragesApi = new GetAnalyticsAveragesV1Api(config);
  getAnalyticsCategoryBreakdownApi = new GetAnalyticsCategoryBreakdownV1Api(config);
  getAnalyticsPeriodAverageApi = new GetAnalyticsPeriodAverageV1Api(config);
  getAnalyticsProjectionsApi = new GetAnalyticsProjectionsV1Api(config);
}

export function todayIsoDate(): string {
  return toLocalIsoDate(new Date());
}
