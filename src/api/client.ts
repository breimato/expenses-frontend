import { Configuration } from '@/api/generated';
import {
  DeleteCategoryV1Api,
  DeleteExpenseV1Api,
  DeleteRecurringTemplateV1Api,
  GetAnalyticsAveragesV1Api,
  GetAnalyticsCategoryBreakdownV1Api,
  GetAnalyticsProjectionsV1Api,
  GetCategoriesV1Api,
  GetExpensesV1Api,
  GetProfileV1Api,
  GetRecurringTemplatesV1Api,
  PatchCategoryV1Api,
  PatchExpenseV1Api,
  PatchProfileV1Api,
  PatchRecurringTemplateV1Api,
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

export let getProfileApi = new GetProfileV1Api(config);
export let patchProfileApi = new PatchProfileV1Api(config);

export let getAnalyticsAveragesApi = new GetAnalyticsAveragesV1Api(config);
export let getAnalyticsCategoryBreakdownApi = new GetAnalyticsCategoryBreakdownV1Api(config);
export let getAnalyticsProjectionsApi = new GetAnalyticsProjectionsV1Api(config);

/** Rebuild API clients after runtime config is loaded. */
export function initApiClient(): void {
  config = createConfiguration();
  postAuthRegisterApi = new PostAuthRegisterV1Api(config);
  postAuthLoginApi = new PostAuthLoginV1Api(config);
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
  getProfileApi = new GetProfileV1Api(config);
  patchProfileApi = new PatchProfileV1Api(config);
  getAnalyticsAveragesApi = new GetAnalyticsAveragesV1Api(config);
  getAnalyticsCategoryBreakdownApi = new GetAnalyticsCategoryBreakdownV1Api(config);
  getAnalyticsProjectionsApi = new GetAnalyticsProjectionsV1Api(config);
}

export function todayIsoDate(): string {
  return toLocalIsoDate(new Date());
}
