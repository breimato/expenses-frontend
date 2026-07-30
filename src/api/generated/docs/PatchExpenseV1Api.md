# PatchExpenseV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**patchExpenseV1**](PatchExpenseV1Api.md#patchexpensev1operation) | **PATCH** /v1/expenses/expenses/{id} | Patch Expense V1 |



## patchExpenseV1

> ExpenseV1Response patchExpenseV1(id, patchExpenseV1Request)

Patch Expense V1

Partially update an expense

### Example

```ts
import {
  Configuration,
  PatchExpenseV1Api,
} from '';
import type { PatchExpenseV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PatchExpenseV1Api();

  const body = {
    // number | Expense identifier
    id: 56,
    // PatchExpenseV1Request
    patchExpenseV1Request: ...,
  } satisfies PatchExpenseV1OperationRequest;

  try {
    const data = await api.patchExpenseV1(body);
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
| **id** | `number` | Expense identifier | [Defaults to `undefined`] |
| **patchExpenseV1Request** | [PatchExpenseV1Request](PatchExpenseV1Request.md) |  | |

### Return type

[**ExpenseV1Response**](ExpenseV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **404** | Not Found - Expense not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

