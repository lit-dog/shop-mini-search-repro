# Minimal reproduction for issue with `useProductSearch` hook from `@shopify/shop-minis-react`

The `useProductSearch` hook returns placeholder results the first time it fires. The `loading` state goes from `true` to `false` when the placeholder items are returned. Shortly after the loading state turns to `true` again, then `false` again and the real search results are returned.

This is problematic if other downstream logic depends on the search result, as it will trigger the downsstream logic with invalid data the first time it fires.

https://github.com/user-attachments/assets/2885db90-f35a-499c-9f5e-e3ca5491f7dc

