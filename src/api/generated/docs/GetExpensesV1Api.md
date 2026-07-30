# GetExpensesV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getExpensesV1**](GetExpensesV1Api.md#getexpensesv1) | **GET** /v1/expenses/expenses | Get Expenses V1 |



## getExpensesV1

> GetExpensesV1Response getExpensesV1(categoryId, expenseDate, description, movementType)

Get Expenses V1

Get all expenses, optionally filtered by search criteria

### Example

```ts
import {
  Configuration,
  GetExpensesV1Api,
} from '';
import type { GetExpensesV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GetExpensesV1Api();

  const body = {
    // number (optional)
    categoryId: 56,
    // Date (optional)
    expenseDate: 2013-10-20,
    // string (optional)
    description: description_example,
    // MovementTypeV1 (optional)
    movementType: ...,
  } satisfies GetExpensesV1Request;

  try {
    const data = await api.getExpensesV1(body);
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
| **categoryId** | `number` |  | [Optional] [Defaults to `undefined`] |
| **expenseDate** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **description** | `string` |  | [Optional] [Defaults to `undefined`] |
| **movementType** | `MovementTypeV1` |  | [Optional] [Defaults to `undefined`] [Enum: EXPENSE, INCOME] |

### Return type

[**GetExpensesV1Response**](GetExpensesV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

