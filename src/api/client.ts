import { Configuration } from '@/api/generated';
import {
  DeleteCategoryV1Api,
  DeleteExpenseV1Api,
  DeleteRecurringTemplateV1Api,
  GetAnalyticsAveragesV1Api,
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
import { toLocalIsoDate } from '@/utils/format';

const basePath = import.meta.env.VITE_API_URL ?? '';

const config = new Configuration({
  basePath,
  fetchApi,
  accessToken: async () => getAccessToken() ?? '',
});

export const postAuthRegisterApi = new PostAuthRegisterV1Api(config);
export const postAuthLoginApi = new PostAuthLoginV1Api(config);

export const getCategoriesApi = new GetCategoriesV1Api(config);
export const postCategoryApi = new PostCategoryV1Api(config);
export const patchCategoryApi = new PatchCategoryV1Api(config);
export const deleteCategoryApi = new DeleteCategoryV1Api(config);

export const getExpensesApi = new GetExpensesV1Api(config);
export const postExpenseApi = new PostExpenseV1Api(config);
export const patchExpenseApi = new PatchExpenseV1Api(config);
export const deleteExpenseApi = new DeleteExpenseV1Api(config);

export const getRecurringTemplatesApi = new GetRecurringTemplatesV1Api(config);
export const postRecurringTemplateApi = new PostRecurringTemplateV1Api(config);
export const patchRecurringTemplateApi = new PatchRecurringTemplateV1Api(config);
export const deleteRecurringTemplateApi = new DeleteRecurringTemplateV1Api(config);
export const postRecurringTemplateQuickAddApi = new RecurringTemplateApplicationsV1Api(config);
export const postRecurringTemplatesApplyPendingApi = new RecurringApplicationsV1Api(config);

export const getProfileApi = new GetProfileV1Api(config);
export const patchProfileApi = new PatchProfileV1Api(config);

export const getAnalyticsAveragesApi = new GetAnalyticsAveragesV1Api(config);
export const getAnalyticsProjectionsApi = new GetAnalyticsProjectionsV1Api(config);

export function todayIsoDate(): string {
  return toLocalIsoDate(new Date());
}
