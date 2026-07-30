# PatchRecurringTemplateV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**patchRecurringTemplateV1**](PatchRecurringTemplateV1Api.md#patchrecurringtemplatev1operation) | **PATCH** /v1/expenses/recurring-templates/{id} | Patch Recurring Template V1 |



## patchRecurringTemplateV1

> RecurringTemplateV1Response patchRecurringTemplateV1(id, patchRecurringTemplateV1Request)

Patch Recurring Template V1

Partially update a recurring template

### Example

```ts
import {
  Configuration,
  PatchRecurringTemplateV1Api,
} from '';
import type { PatchRecurringTemplateV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PatchRecurringTemplateV1Api();

  const body = {
    // number | Recurring template identifier
    id: 56,
    // PatchRecurringTemplateV1Request
    patchRecurringTemplateV1Request: ...,
  } satisfies PatchRecurringTemplateV1OperationRequest;

  try {
    const data = await api.patchRecurringTemplateV1(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` | Recurring template identifier | [Defaults to `undefined`] |
| **patchRecurringTemplateV1Request** | [PatchRecurringTemplateV1Request](PatchRecurringTemplateV1Request.md) |  | |

### Return type

[**RecurringTemplateV1Response**](RecurringTemplateV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **404** | Not Found - Recurring template not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

