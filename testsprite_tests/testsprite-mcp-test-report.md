
# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** ag-opus-inv (StockFlow - Warehouse Management System)
- **Date:** 2026-03-04
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

### Requirement: User Registration (Sign Up)
- **Description:** Register a new account with name, email, and password with client-side validation.

#### Test TC001 Successful sign up redirects to dashboard and shows KPI cards
- **Test Code:** [TC001_Successful_sign_up_redirects_to_dashboard_and_shows_KPI_cards.py](./TC001_Successful_sign_up_redirects_to_dashboard_and_shows_KPI_cards.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/3c0aa9b7-5969-4d4f-b59e-1072698fc9a4
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Sign up flow works correctly. New users are redirected to dashboard after successful registration.
---

#### Test TC002 Sign up shows validation errors for invalid email format and too-short password
- **Test Code:** [TC002_Sign_up_shows_validation_errors_for_invalid_email_format_and_too_short_password.py](./TC002_Sign_up_shows_validation_errors_for_invalid_email_format_and_too_short_password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/05e03d62-4d29-4468-b26d-83e8dbda39cf
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Validation correctly rejects invalid email format and passwords that are too short.
---

#### Test TC003 Sign up prevents submission when required fields are empty
- **Test Code:** [TC003_Sign_up_prevents_submission_when_required_fields_are_empty.py](./TC003_Sign_up_prevents_submission_when_required_fields_are_empty.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/f07a2ddd-560b-4a97-83b7-8b95e8e37a99
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Form correctly prevents submission with empty required fields.
---

#### Test TC004 Sign up rejects password that is too short even with valid email
- **Test Code:** [TC004_Sign_up_rejects_password_that_is_too_short_even_with_valid_email.py](./TC004_Sign_up_rejects_password_that_is_too_short_even_with_valid_email.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/b1c4a9f3-5666-4b21-86b4-b90a300ea050
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Password length validation works correctly even when email is valid.
---

#### Test TC005 Sign up rejects malformed email even with strong password
- **Test Code:** [TC005_Sign_up_rejects_malformed_email_even_with_strong_password.py](./TC005_Sign_up_rejects_malformed_email_even_with_strong_password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/8ac5f1bd-9e80-40c3-8517-6cd6dd0815e2
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Email format validation works correctly even when password is strong.
---

#### Test TC006 Successful sign up works via Enter key submission from password field
- **Test Code:** [TC006_Successful_sign_up_works_via_Enter_key_submission_from_password_field.py](./TC006_Successful_sign_up_works_via_Enter_key_submission_from_password_field.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/cf54e612-79f1-41db-8c50-789ca4bf9313
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Enter key submission works as expected from the password field.
---

#### Test TC007 Sign up page loads and displays required inputs
- **Test Code:** [TC007_Sign_up_page_loads_and_displays_required_inputs.py](./TC007_Sign_up_page_loads_and_displays_required_inputs.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/321f50b1-b4ae-40bf-bfd0-1a79a57f4462
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Sign up page renders all required input fields correctly.
---

### Requirement: Dashboard
- **Description:** Display KPI cards (Total Stock, Low Stock Items, Daily Movements, Active Locations), recent activity feed, and quick action buttons.

#### Test TC008 Dashboard displays all KPI cards and recent activity feed
- **Test Code:** [TC008_Dashboard_displays_all_KPI_cards_and_recent_activity_feed.py](./TC008_Dashboard_displays_all_KPI_cards_and_recent_activity_feed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/edf03673-b029-43d0-b252-d938bdf8f441
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting ("Too many requests"). Not an application bug — the test runner hit the rate limiter after multiple concurrent sign-in attempts from earlier tests.
---

#### Test TC009 Dashboard KPI cards show all four KPI sections
- **Test Code:** [TC009_Dashboard_KPI_cards_show_all_four_KPI_sections.py](./TC009_Dashboard_KPI_cards_show_all_four_KPI_sections.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/72aa1d79-9500-4912-b303-e04eccf7d111
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Same root cause as TC008.
---

#### Test TC010 Quick action: Register Sale navigates to Movements page
- **Test Code:** [TC010_Quick_action_Register_Sale_navigates_to_Movements_page.py](./TC010_Quick_action_Register_Sale_navigates_to_Movements_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/fc4f09fb-6b8c-4c91-9571-1c9e26e8e534
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** **Actual bug.** The "Register Sale" quick action button on the Dashboard does not navigate to /movements. The button is present in the UI but appears non-functional — clicking it produces no navigation or modal. This may indicate a missing onClick handler or broken Link component.
---

#### Test TC011 Quick action: Receive Stock navigates to Movements and shows movement registration UI
- **Test Code:** [TC011_Quick_action_Receive_Stock_navigates_to_Movements_and_shows_movement_registration_UI.py](./TC011_Quick_action_Receive_Stock_navigates_to_Movements_and_shows_movement_registration_UI.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/2b71a3cb-aea2-424c-86cc-4afbb2474cf8
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Could not reach the dashboard to test the quick action.
---

#### Test TC012 Quick action: Transfer Stock is present and navigates to Movements
- **Test Code:** [TC012_Quick_action_Transfer_Stock_is_present_and_navigates_to_Movements.py](./TC012_Quick_action_Transfer_Stock_is_present_and_Movements.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/605aee48-0fc8-4180-89a5-7bcb09f354b2
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Could not reach the dashboard.
---

#### Test TC013 Dashboard shows non-empty numeric values (or placeholders) on KPI cards
- **Test Code:** [TC013_Dashboard_shows_non_empty_numeric_values_or_placeholders_on_KPI_cards.py](./TC013_Dashboard_shows_non_empty_numeric_values_or_placeholders_on_KPI_cards.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/30ec3539-4b15-412d-ab36-bd161e988427
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC014 Recent activity section is visible and scrollable into view
- **Test Code:** [TC014_Recent_activity_section_is_visible_and_scrollable_into_view.py](./TC014_Recent_activity_section_is_visible_and_scrollable_into_view.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/cafa83d4-d182-4a54-b4c4-8e788f1e2c2e
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

### Requirement: Product Management
- **Description:** Full CRUD for products with SKU, name, category, min threshold. Search and filter by status.

#### Test TC015 Create a new product and confirm it appears in the list with a status indicator
- **Test Code:** [TC015_Create_a_new_product_and_confirm_it_appears_in_the_list_with_a_status_indicator.py](./TC015_Create_a_new_product_and_confirm_it_appears_in_the_list_with_a_status_indicator.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/59ad38c2-5a90-4ebf-90e8-8c4e8046c92b
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Could not reach the products page.
---

#### Test TC016 Complete Add Product form and submit successfully
- **Test Code:** [TC016_Complete_Add_Product_form_and_submit_successfully.py](./TC016_Complete_Add_Product_form_and_submit_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/679ecae2-944e-4b3c-820f-cc35d1d682e6
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC017 Search products by SKU returns matching rows
- **Test Code:** [TC017_Search_products_by_SKU_returns_matching_rows.py](./TC017_Search_products_by_SKU_returns_matching_rows.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/14e1b12d-0c2e-4954-b01c-7dba4124b65e
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Product search by SKU works correctly and returns matching rows.
---

#### Test TC018 Filter products by status: In Stock
- **Test Code:** [TC018_Filter_products_by_status_In_Stock.py](./TC018_Filter_products_by_status_In_Stock.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/1f985e5a-ecfe-4d87-b200-647181481fc3
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC019 Filter products by status: Low Stock
- **Test Code:** [TC019_Filter_products_by_status_Low_Stock.py](./TC019_Filter_products_by_status_Low_Stock.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/06243772-c08f-4ba6-a8fe-c9d01cff207a
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC020 Submit Add Product with required fields empty shows validation errors
- **Test Code:** [TC020_Submit_Add_Product_with_required_fields_empty_shows_validation_errors.py](./TC020_Submit_Add_Product_with_required_fields_empty_shows_validation_errors.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/8d53f04b-1aeb-46f4-b32a-abbefdc5a4a9
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Product form validation correctly shows errors when required fields are empty.
---

### Requirement: Stock Movement Registration
- **Description:** Register stock movements (inbound, outbound, transfer, adjustment) with product, quantity, locations, and notes.

#### Test TC021 Register an inbound movement with note and verify it appears at top of log
- **Test Code:** [TC021_Register_an_inbound_movement_with_note_and_verify_it_appears_at_top_of_log.py](./TC021_Register_an_inbound_movement_with_note_and_verify_it_appears_at_top_of_log.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/1c0a2309-6c4f-4e6b-8774-86ca91794c05
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Inbound movement registration works correctly. New entry appears at top of log.
---

#### Test TC022 Register an outbound movement and verify it appears in log with outbound type
- **Test Code:** [TC022_Register_an_outbound_movement_and_verify_it_appears_in_log_with_outbound_type.py](./TC022_Register_an_outbound_movement_and_verify_it_appears_in_log_with_outbound_type.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/83a0be62-8203-4194-b45e-b8a3b43c0e01
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC023 Validate required fields: missing product or quantity blocks submission
- **Test Code:** [TC023_Validate_required_fields_missing_product_or_quantity_blocks_submission.py](./TC023_Validate_required_fields_missing_product_or_quantity_blocks_submission.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/b040afa0-4109-4fa8-b329-92b73a22aeeb
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Form validation correctly blocks submission when required fields are missing.
---

#### Test TC024 Transfer requires both from and to locations
- **Test Code:** [TC024_Transfer_requires_both_from_and_to_locations.py](./TC024_Transfer_requires_both_from_and_to_locations.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/9dd70c0c-b0ef-4d83-ab9f-d437565dc9b7
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC025 Filter movement log by type and verify only matching type is shown
- **Test Code:** [TC025_Filter_movement_log_by_type_and_verify_only_matching_type_is_shown.py](./TC025_Filter_movement_log_by_type_and_verify_only_matching_type_is_shown.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/5f66f2e9-1e11-4eec-aa44-ee5f3aad60c2
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Movement type filtering works correctly, showing only matching entries.
---

#### Test TC026 Register an adjustment movement and verify it appears in the log
- **Test Code:** [TC026_Register_an_adjustment_movement_and_verify_it_appears_in_the_log.py](./TC026_Register_an_adjustment_movement_and_verify_it_appears_in_the_log.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/562f7c09-369d-427a-a75f-c5908493c26c
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Adjustment movement registration works correctly.
---

#### Test TC027 Cancel movement registration dialog without creating a movement
- **Test Code:** [TC027_Cancel_movement_registration_dialog_without_creating_a_movement.py](./TC027_Cancel_movement_registration_dialog_without_creating_a_movement.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/b3098d8e-6072-49c7-95ca-2b0ac60fbb1d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Cancel button correctly dismisses dialog without creating a movement record.
---

#### Test TC028 Quantity validation: prevent zero quantity submission
- **Test Code:** [TC028_Quantity_validation_prevent_zero_quantity_submission.py](./TC028_Quantity_validation_prevent_zero_quantity_submission.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/c2757a34-11d2-4fbc-918f-c7c3c7e054ce
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

### Requirement: Location Management
- **Description:** Manage warehouse locations with name, zone, type (shelf/bin/dock/floor), and capacity.

#### Test TC029 Create a new location and verify it appears grouped by zone
- **Test Code:** [TC029_Create_a_new_location_and_verify_it_appears_grouped_by_zone.py](./TC029_Create_a_new_location_and_verify_it_appears_grouped_by_zone.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/57000b09-7354-47c9-939f-348d2f146aa3
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** **Actual bug.** The "Type" field in the Add New Location form uses a native select or custom dropdown that was not properly filled by the test. The form validation showed "Please fill out this field" for the Type field, preventing submission. This suggests the location type selector may not be easily interactable or requires specific interaction patterns.
---

#### Test TC030 Submit a new location with all fields set and see it listed
- **Test Code:** [TC030_Submit_a_new_location_with_all_fields_set_and_see_it_listed.py](./TC030_Submit_a_new_location_with_all_fields_set_and_see_it_listed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/9b960f47-d192-485a-bbd2-0e6caa59fb8f
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Location creation with all fields works correctly.
---

#### Test TC031 Create location with zone, type, and capacity then verify visibility in list
- **Test Code:** [TC031_Create_location_with_zone_type_and_capacity_then_verify_visibility_in_list.py](./TC031_Create_location_with_zone_type_and_capacity_then_verify_visibility_in_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/9a402faf-1f90-4353-818c-55c69fed7654
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Location creation with zone/type/capacity verified successfully.
---

#### Test TC032 Verify new location appears under the correct zone grouping
- **Test Code:** [TC032_Verify_new_location_appears_under_the_correct_zone_grouping.py](./TC032_Verify_new_location_appears_under_the_correct_zone_grouping.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/b4e3ecd0-08d7-4df1-9a98-1458da2b6f52
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Zone grouping works correctly for newly created locations.
---

#### Test TC033 Validation: submitting with empty name shows an error
- **Test Code:** [TC033_Validation_submitting_with_empty_name_shows_an_error.py](./TC033_Validation_submitting_with_empty_name_shows_an_error.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/43b8ddeb-ffb9-4438-b634-b90b10c8894d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Name field validation works correctly.
---

#### Test TC034 Validation: submitting with empty zone shows an error
- **Test Code:** [TC034_Validation_submitting_with_empty_zone_shows_an_error.py](./TC034_Validation_submitting_with_empty_zone_shows_an_error.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/318b4a19-4123-479d-83a7-1e03cd16fea4
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Zone field validation works correctly.
---

#### Test TC035 Verify capacity and utilization are visible on a location card
- **Test Code:** [TC035_Verify_capacity_and_utilization_are_visible_on_a_location_card.py](./TC035_Verify_capacity_and_utilization_are_visible_on_a_location_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/ea4c7802-1b56-4109-b7b5-d032209e2f6d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Capacity and utilization information displayed correctly on location cards.
---

#### Test TC036 Verify utilization color indicator is present on a location card
- **Test Code:** [TC036_Verify_utilization_color_indicator_is_present_on_a_location_card.py](./TC036_Verify_utilization_color_indicator_is_present_on_a_location_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/2c86e8eb-9cde-4e88-8c9e-8a19030a5878
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

### Requirement: Audit Trail
- **Description:** Search by SKU to view product info card and full transaction timeline with details.

#### Test TC037 Audit Trail - Search by SKU and display product info card and timeline
- **Test Code:** [TC037_Audit_Trail___Search_by_SKU_and_display_product_info_card_and_timeline.py](./TC037_Audit_Trail___Search_by_SKU_and_display_product_info_card_and_timeline.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/83c260cb-d56a-4032-8bf7-e267027e2fd7
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Test used a non-existent SKU ('SKU-TEST-001') which has no transactions in the database. This is a test data issue rather than an application bug. The "No transactions found" message is correctly displayed.
---

#### Test TC038 Audit Trail - Submit search using Enter key
- **Test Code:** [TC038_Audit_Trail___Submit_search_using_Enter_key.py](./TC038_Audit_Trail___Submit_search_using_Enter_key.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/2118b02b-7bae-4965-b106-ab910108b312
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** **Potential bug.** Pressing Enter in the SKU search input on the Audit page did not trigger a search or navigate. The test stayed on the Dashboard. This could indicate the Enter key handler is not properly bound on the search input, or the test navigated to the wrong page.
---

#### Test TC039 Audit Trail - Open a timeline entry and view transaction details
- **Test Code:** [TC039_Audit_Trail___Open_a_timeline_entry_and_view_transaction_details.py](./TC039_Audit_Trail___Open_a_timeline_entry_and_view_transaction_details.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/d9aaddf7-2719-4f67-87d2-7fc19d50756a
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Failed because no transactions exist for the test SKU ('SKU-TEST-001'). Test data issue.
---

#### Test TC040 Audit Trail - Non-existent SKU shows no results state
- **Test Code:** [TC040_Audit_Trail___Non_existent_SKU_shows_no_results_state.py](./TC040_Audit_Trail___Non_existent_SKU_shows_no_results_state.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/7c4f266f-6e7e-414b-91ee-94f6c1c7ee6f
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC041 Audit Trail - Empty search submission shows validation or guidance
- **Test Code:** [TC041_Audit_Trail___Empty_search_submission_shows_validation_or_guidance.py](./TC041_Audit_Trail___Empty_search_submission_shows_validation_or_guidance.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/5491212a-933f-408a-8673-da1111843316
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC042 Audit Trail - Trim whitespace around SKU input
- **Test Code:** [TC042_Audit_Trail___Trim_whitespace_around_SKU_input.py](./TC042_Audit_Trail___Trim_whitespace_around_SKU_input.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/923e5543-1f52-41aa-8daf-0c17595f2af1
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC043 Audit Trail - Subsequent search replaces previous results
- **Test Code:** [TC043_Audit_Trail___Subsequent_search_replaces_previous_results.py](./TC043_Audit_Trail___Subsequent_search_replaces_previous_results.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/9590ead0-abde-4e9b-a369-f92cd9a0272e
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Subsequent searches correctly replace previous results.
---

#### Test TC044 Audit Trail - Timeline empty for valid SKU with zero movements
- **Test Code:** [TC044_Audit_Trail___Timeline_empty_for_valid_SKU_with_zero_movements.py](./TC044_Audit_Trail___Timeline_empty_for_valid_SKU_with_zero_movements.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/38c0dfde-a938-4b05-86cd-00c76df44669
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Empty timeline state correctly displayed for SKU with no movements.
---

### Requirement: Navigation
- **Description:** Sidebar navigation with links to all pages, mobile hamburger menu, and sign-out functionality.

#### Test TC045 Navigate between core pages using sidebar links (Products, Movements, Audit Trail)
- **Test Code:** [TC045_Navigate_between_core_pages_using_sidebar_links_Products__Movements__Audit_Trail.py](./TC045_Navigate_between_core_pages_using_sidebar_links_Products__Movements__Audit_Trail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/5da3ebe6-cc86-4037-8051-f3de4d5ce3b0
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC046 Sidebar navigation from Dashboard to Locations
- **Test Code:** [TC046_Sidebar_navigation_from_Dashboard_to_Locations.py](./TC046_Sidebar_navigation_from_Dashboard_to_Locations.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/2db667a0-6ce6-4ef3-82b6-a47259d3e03a
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting.
---

#### Test TC047 Mobile: Open hamburger menu and navigate using the mobile sidebar sheet
- **Test Code:** [TC047_Mobile_Open_hamburger_menu_and_navigate_using_the_mobile_sidebar_sheet.py](./TC047_Mobile_Open_hamburger_menu_and_navigate_using_the_mobile_sidebar_sheet.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/d0df3cc5-9e54-4ffe-81d9-523978c7fbb1
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Could not reach the dashboard to test mobile navigation.
---

#### Test TC048 Sign out from a non-dashboard page (Products)
- **Test Code:** [TC048_Sign_out_from_a_non_dashboard_page_Products.py](./TC048_Sign_out_from_a_non_dashboard_page_Products.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c3e4852f-70ca-48e7-9a2b-88ab20019e7f/eff36d1e-205f-4a2c-b637-9cc4f58705af
- **Status:** ❌ Failed
- **Severity:** LOW (Infrastructure)
- **Analysis / Findings:** Test failed due to auth rate limiting. Could not authenticate to test sign-out flow.
---

## 3️⃣ Coverage & Matching Metrics

- **45.83%** of tests passed (22 out of 48)

| Requirement              | Total Tests | ✅ Passed | ❌ Failed |
|--------------------------|-------------|-----------|-----------|
| User Registration        | 7           | 7         | 0         |
| Dashboard                | 7           | 0         | 7         |
| Product Management       | 6           | 3         | 3         |
| Stock Movements          | 8           | 5         | 3         |
| Location Management      | 8           | 6         | 2         |
| Audit Trail              | 8           | 3         | 5         |
| Navigation               | 4           | 0         | 4         |

### Failure Breakdown

| Failure Category                    | Count | Percentage |
|-------------------------------------|-------|------------|
| Auth Rate Limiting (not app bugs)   | 22    | 84.6%      |
| Actual/Potential Application Bugs   | 2     | 7.7%       |
| Test Data Issues                    | 2     | 7.7%       |

**Adjusted Pass Rate (excluding rate-limit failures):** 22 passed / 26 non-rate-limited = **84.6%**

---

## 4️⃣ Key Gaps / Risks

> **Overall:** 22 of 48 tests passed (45.83%). However, **22 of the 26 failures were caused by auth rate limiting** during concurrent test execution, not by actual application defects. When excluding infrastructure-related failures, the effective pass rate is **84.6%**.

### Actual Bugs Found:
1. **TC010 - Dashboard Quick Action "Register Sale" is non-functional** (MEDIUM): The button exists but clicking it does not navigate to `/movements`. Likely a missing `onClick` handler or broken `Link` component on the dashboard page.

2. **TC029 - Location Type selector interaction issue** (MEDIUM): The "Type" field in the Add Location form may not be properly selectable via standard browser automation. The native `<select>` or custom dropdown requires specific interaction to set a value.

### Potential Issues:
3. **TC038 - Audit Trail Enter key search** (MEDIUM): Enter key may not trigger search on the audit page. Needs manual verification.

### Infrastructure Risks:
4. **Auth Rate Limiting** (HIGH): Better Auth's built-in rate limiter blocks concurrent test sign-ins, causing 22 test failures. For future test runs, consider:
   - Disabling rate limiting in test environment
   - Using a shared authenticated session across tests
   - Reducing test concurrency

### Test Data Gaps:
5. **Audit trail tests** (TC037, TC039) used a non-existent SKU ('SKU-TEST-001') with no movement history, causing expected failures.

---
