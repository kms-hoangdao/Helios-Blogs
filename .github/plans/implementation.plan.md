# Notes:

## Objectives

- Implement a comprehensive User Mapping list feature with full CRUD operations
- Enable search functionality by Vista user or Teamwork user
- Implement custom sorting behavior for Vista user and Teamwork user columns
- Display user mappings in a sortable, searchable table with default sorting by Vista user (ascending)
- Provide intuitive UI for adding, editing, and deleting user mappings

## Technical Specification

- **Functional Requirements:**
  - Display user mappings in a table with columns: Vista User, Teamwork User, and Actions
  - Default sort: Vista user column in ascending order (A–Z)
  - Vista user column sort: Toggle between descending (Z–A) and no sorting (revert to default)
  - Teamwork user column sort: Three-state toggle - ascending (A–Z), descending (Z–A), and no sorting (revert to default)
  - Search functionality: Filter by Vista user email or Teamwork username (minimum 3 characters)
  - Add new mapping: Dialog with form validation for Vista user and Teamwork user selection
  - Edit mapping: Pre-populate dialog with existing mapping data
  - Delete mapping: Confirmation dialog before deletion
  - Real-time data refresh after create/edit/delete operations via React Query cache invalidation

- **Non-Functional Requirements:**
  - Search debounce delay: 300ms to reduce API calls
  - Loading states: Show spinner during data fetching and mutations
  - Error handling: Display toast notifications for API errors
  - Responsive design: Table adapts to viewport size
  - Accessibility: Keyboard navigation, screen reader support, ARIA labels
  - Performance: Pagination support for large datasets

- **Technical Architecture:**
  - Feature-based modular architecture following existing patterns in `src/features/company/`
  - React Query for server state management with automatic cache invalidation
  - Zustand store for client-side UI state (search, pagination, sort, dialog states)
  - Reusable `Table` component from `src/components/Table/` with custom column definitions
  - Dialog components for create/edit and delete operations
  - Custom sort handling with API format conversion using `convertSortToApiFormat`

- **Data Flow:**
  1. User interacts with search/sort/pagination controls → Updates Zustand store
  2. Store changes trigger React Query hook re-fetch with new parameters
  3. API service function makes authenticated HTTP request via Axios
  4. Response data cached by React Query and displayed in table
  5. User triggers create/edit/delete → Mutation hook called
  6. On success → Cache invalidated → Automatic refetch → UI updates

- **Implementation Strategy:**
  - **Approach Selected:** Follow established feature pattern (Company feature as reference)
  - **Rationale:**
    - Consistency with existing codebase architecture
    - Proven pattern with Company, Project, DeliverableSet features
    - Reuses existing components and utilities
    - Minimizes learning curve for developers
    - Leverages React Query's powerful caching and mutation features
  - **Key Components:**
    - `columns.tsx`: Table column definitions with custom sort behavior
    - `hooks.ts`: React Query hooks (uncomment existing mutation hooks)
    - `services.ts`: API service functions (already implemented)
    - `store.ts`: Zustand store (needs fixes for setEditingUserMapping and clearEditingUserMapping)
    - `types.ts`: TypeScript interfaces (already implemented)
    - `components/UserMappingDialog.tsx`: Create/edit dialog (new)
    - `components/DeleteUserMappingDialog.tsx`: Delete confirmation dialog (new)
    - `UserMappingPage.tsx`: Main page component (enhance existing)

- **Success Criteria:**
  - User can view all user mappings in a table with proper formatting
  - Search functionality filters mappings by Vista or Teamwork user
  - Default sort shows Vista users in ascending order (A–Z)
  - Vista user column toggles between descending and default sort
  - Teamwork user column cycles through ascending, descending, and default sort
  - User can add new mappings via dialog with validation
  - User can edit existing mappings with pre-populated data
  - User can delete mappings with confirmation
  - Success/error toasts display for all CRUD operations
  - Loading states appear during API calls
  - Cache invalidation triggers automatic data refresh

- **Risk Considerations:**
  - **API Contract Mismatch:** API may return different field names than expected
    - _Mitigation:_ Test with actual API early, add field mapping if needed
  - **Complex Sort Logic:** Custom three-state sort for Teamwork column differs from standard two-state
    - _Mitigation:_ Implement custom sort handler in page component, document behavior clearly
  - **Store Type Issues:** `editingUserMapping` type is `UserMappingListResponse` but should be `UserMapping`
    - _Mitigation:_ Fix type in store.ts before implementing dialogs
  - **API Endpoint Missing Slash:** URL construction in services.ts may have formatting issues
    - _Mitigation:_ Verify API endpoint URLs match backend documentation
  - **Search Performance:** Searching on every keystroke could cause excessive API calls
    - _Mitigation:_ Already implemented with 300ms debounce delay

# Ticket Id:

[USER TO INPUT]

# Task List

- [x] **Task 1: Fix User Mapping Store Types and Implementation**
  - [x] 1.1: Update `editingUserMapping` type in `src/features/user-mapping/store.ts` from `UserMappingListResponse | null` to `UserMapping | null` to correctly represent a single user mapping being edited
  - [x] 1.2: Uncomment and fix the `setEditingUserMapping` action in `src/features/user-mapping/store.ts` to accept `UserMapping | null` parameter
  - [x] 1.3: Uncomment the `clearEditingUserMapping` action in `src/features/user-mapping/store.ts` to enable clearing the editing state
  - [x] 1.4: Update initial state in `src/features/user-mapping/store.ts` to set `editingUserMapping: null as UserMapping | null` with correct type annotation
  - [x] 1.5: Update default sort in `src/features/user-mapping/store.ts` initial state to `{ column: 'vista_user_id', direction: 'asc' }` to match requirement for default Vista user ascending sort

- [x] **Task 2: Create User Mapping Table Columns Definition**
  - [x] 2.1: Create new file `src/features/user-mapping/columns.tsx` for table column configurations
  - [x] 2.2: Define `UserMappingAction` type with values: `'edit'` and `'delete'`
  - [x] 2.3: Implement `getUserMappingListColumns` function that accepts `handleActionClick: (action: UserMappingAction, item: UserMapping) => void` and `t: TFunction` parameters, returning `TableColumn<UserMapping>[]`
  - [x] 2.4: Create Vista User column with id `'vista_user_id'`, label from `t('userMapping.columns.vistaUser')`, width 300, sortable `true`, renderCell displaying email/username from row data
  - [x] 2.5: Create Teamwork User column with id `'teamwork_username'`, label from `t('userMapping.columns.teamworkUser')`, width 300, sortable `true`, renderCell displaying teamwork username and email
  - [x] 2.6: Create Actions column with id `'actions'`, width 90, `isFrozen: true`, `freezePosition: 'right'`, renderCell with Edit button (using `FilePenLine` icon from `lucide-react`) and Delete button (using `Trash2` icon), both wrapped in `Tooltip` components from `@/components/ui/tooltip`
  - [x] 2.7: Add barrel export in `src/features/user-mapping/index.ts` for `getUserMappingListColumns` and `UserMappingAction` type

- [x] **Task 3: Uncomment and Configure React Query Mutation Hooks**
  - [x] 3.1: Uncomment `useCreateUserMapping` hook in `src/features/user-mapping/hooks.ts`, import `useMutation` and `useQueryClient` from `@tanstack/react-query`
  - [x] 3.2: Uncomment `useUpdateUserMapping` hook in `src/features/user-mapping/hooks.ts`, ensure it accepts `mappingId: string` parameter
  - [x] 3.3: Uncomment `useDeleteUserMapping` hook in `src/features/user-mapping/hooks.ts`, ensure it accepts `mappingId: string` parameter
  - [x] 3.4: Verify all mutation hooks invalidate queries with key `[QUERY_KEY_USER_MAPPING_LIST]` in their `onSuccess` callbacks to trigger automatic refetch
  - [x] 3.5: Export all mutation hooks (`useCreateUserMapping`, `useUpdateUserMapping`, `useDeleteUserMapping`) in `src/features/user-mapping/index.ts` for external use

- [x] **Task 4: Create User Mapping Dialog Component**
  - [x] 4.1: Create directory `src/features/user-mapping/components/` if it doesn't exist
  - [x] 4.2: Create `src/features/user-mapping/components/UserMappingDialog.tsx` based on `CompanyDialog.tsx` pattern from `src/features/company/components/CompanyDialog.tsx`
  - [x] 4.3: Implement form with `react-hook-form` containing fields: Vista User (select/autocomplete), Teamwork User (select/autocomplete), Default Action Types (multi-select), with validation rules for required fields
  - [x] 4.4: Use `useUserMappingStore` to get `editingUserMapping`, `dialogOpen`, `setDialogOpen`, `clearEditingUserMapping` state and actions
  - [x] 4.5: Use `useCreateUserMapping` mutation hook (from task 3.1) for creating new mappings
  - [x] 4.6: Use `useUpdateUserMapping` mutation hook (from task 3.2) with `editingUserMapping.mapping_id` for updating existing mappings
  - [x] 4.7: Implement `isEditMode` computed from `!!editingUserMapping` to determine dialog mode (create vs edit)
  - [x] 4.8: Pre-populate form fields with `editingUserMapping` data when in edit mode using `setValue` from react-hook-form
  - [x] 4.9: Display success toast using `triggerToast('success', t('userMapping.dialog.messages.addSuccess'))` or `t('userMapping.dialog.messages.updateSuccess')` based on mode
  - [x] 4.10: Handle API errors by setting form errors using `setError` and displaying error messages in the form
  - [x] 4.11: Reset form and clear editing state when dialog closes using `reset()` and `clearEditingUserMapping()`
  - [x] 4.12: Add translation keys in `src/i18n/locales/en/translation.json` under `userMapping.dialog` for: `addTitle`, `editTitle`, `fields.vistaUser`, `fields.teamworkUser`, `fields.defaultActionTypes`, `placeholders.*`, `validation.*`, `messages.addSuccess`, `messages.updateSuccess`, `messages.errorGeneric`
  - [x] 4.13: Create barrel export in `src/features/user-mapping/components/index.ts` exporting `UserMappingDialog`

- [x] **Task 5: Create Delete User Mapping Dialog Component**
  - [x] 5.1: Create `src/features/user-mapping/components/DeleteUserMappingDialog.tsx` based on `DeleteCompanyDialog.tsx` pattern from `src/features/company/components/DeleteCompanyDialog.tsx`
  - [x] 5.2: Accept props `currentItemCount?: number` and `totalItems?: number` to handle pagination after deletion
  - [x] 5.3: Use `useUserMappingStore` to get `deletingUserMapping`, `deleteDialogOpen`, `setDeleteDialogOpen`, `clearDeletingUserMapping`, `page`, `setPage` state and actions
  - [x] 5.4: Use `useDeleteUserMapping` mutation hook (from task 3.3) with `deletingUserMapping.mapping_id` for deletion
  - [x] 5.5: Display confirmation dialog with title from `t('userMapping.dialog.deleteTitle')` and description from `t('userMapping.dialog.deleteDescription')` showing the Vista user and Teamwork user being deleted
  - [x] 5.6: On successful deletion, show success toast with `triggerToast('success', t('userMapping.dialog.messages.deleteSuccess'))`
  - [x] 5.7: Implement pagination adjustment logic: if deleting the last item on a page (but not page 1), navigate to previous page using `setPage(page - 1)`
  - [x] 5.8: Handle deletion errors with error toast displaying `triggerToast('error', errorMessage)`
  - [x] 5.9: Reset mutation state and clear deleting user mapping when dialog closes
  - [x] 5.10: Add translation keys in `src/i18n/locales/en/translation.json` under `userMapping.dialog` for: `deleteTitle`, `deleteDescription`, `messages.deleteSuccess`
  - [x] 5.11: Export `DeleteUserMappingDialog` in `src/features/user-mapping/components/index.ts`

- [x] **Task 6: Implement Custom Sort Logic in User Mapping Page**
  - [x] 6.1: Update `src/pages/UserMappingPage.tsx` to import `useCallback`, `useEffect`, `useMemo` from React for performance optimization
  - [x] 6.2: Import `getUserMappingListColumns`, `UserMappingAction` from `src/features/user-mapping` (from task 2.7)
  - [x] 6.3: Import `UserMappingDialog`, `DeleteUserMappingDialog` from `src/features/user-mapping/components` (from tasks 4.13 and 5.11)
  - [x] 6.4: Import `Table` component from `@/components/Table` to replace placeholder implementation
  - [x] 6.5: Implement `handleActionClick` callback with signature `(action: UserMappingAction, item: UserMapping) => void` that handles 'edit' action by calling `setEditingUserMapping(item)` and 'delete' action by calling `setDeletingUserMapping(item)` and `setDeleteDialogOpen(true)`
  - [x] 6.6: Implement custom `handleSortChange` callback with signature `(colId: keyof UserMapping | null, dir: 'asc' | 'desc' | null) => void` following this logic:
    - If `colId === 'vista_user_id'`: Two-state toggle - clicking once sets descending, clicking again resets to default (ascending)
    - If `colId === 'teamwork_username'`: Three-state toggle - clicking cycles through ascending, descending, then resets to default (Vista ascending)
    - If `colId === null && dir === null`: Reset to default sort `{ column: 'vista_user_id', direction: 'asc' }`
  - [x] 6.7: Create memoized `columns` using `useMemo(() => getUserMappingListColumns(handleActionClick, t), [handleActionClick, t])`
  - [x] 6.8: Add `useEffect` cleanup to reset store state when component unmounts using `reset()` from store

- [x] **Task 7: Integrate Table Component and Dialogs in User Mapping Page**
  - [x] 7.1: Replace placeholder content in `src/pages/UserMappingPage.tsx` with `Table` component from `@/components/Table`
  - [x] 7.2: Pass `columns` prop with memoized columns from task 6.7
  - [x] 7.3: Pass `data` prop with `data ?? []` from `useUserMappingList` hook
  - [x] 7.4: Pass `isLoading` prop from `useUserMappingList` query state
  - [x] 7.5: Pass `roundedTop` prop as `true` for consistent UI styling
  - [x] 7.6: Pass `page` prop with `(pagination?.page ?? DEFAULT_PAGE) - 1` (convert from 1-based to 0-based)
  - [x] 7.7: Pass `totalPages` prop with `pagination?.total_pages ?? 0` from query response
  - [x] 7.8: Pass `onPageChange` prop with `setPage` from store
  - [x] 7.9: Pass `orderBy` prop with `sort.column` from store
  - [x] 7.10: Pass `order` prop with `sort.direction` from store
  - [x] 7.11: Pass `onSortChange` prop with custom `handleSortChange` function from task 6.6
  - [x] 7.12: Pass `onRowClick` prop with `(row) => handleActionClick('edit', row)` for row click to open edit dialog
  - [x] 7.13: Pass `noDataMessage` prop with custom empty state component showing `EmptySearch` image and translated messages from `t('userMapping.noSearchResults.title')` and `t('userMapping.noSearchResults.description', { searchTerm: searchQuery })`
  - [x] 7.14: Add `<UserMappingDialog />` component (from task 4) after the Table component
  - [x] 7.15: Add `<DeleteUserMappingDialog currentItemCount={data?.length ?? 0} totalItems={pagination?.total_items ?? 0} />` component (from task 5) after UserMappingDialog
  - [x] 7.16: Update "Add new" button onClick handler to call `setDialogOpen(true)` instead of empty function
  - [x] 7.17: Add translation keys in `src/i18n/locales/en/translation.json` under `userMapping.noSearchResults` for: `title`, `description`

- [x] **Task 8: Update API Service for Proper Pagination and Search**
  - [x] 8.1: Update `getListUserMappings` function signature in `src/features/user-mapping/services.ts` to accept parameters: `search?: string`, `page?: number`, `rowsPerPage?: number`, `sortBy?: string`
  - [x] 8.2: Construct query parameters object with conditional inclusion: `{ q: search || undefined, page, page_size: rowsPerPage, sort_by: sortBy || undefined }`
  - [x] 8.3: Update API request to pass query parameters using `params` option in Axios config
  - [x] 8.4: Fix missing slash in API endpoint: change `url` from `` `${API_ENDPOINT_USER_MAPPINGS}teamwork/...` `` to `` `${API_ENDPOINT_USER_MAPPINGS}/teamwork/...` ``
  - [x] 8.5: Verify API response structure matches `UserMappingListResponse` type, add pagination metadata if API returns it

- [x] **Task 9: Update User Mapping List Hook to Pass Parameters**
  - [x] 9.1: Update `useUserMappingList` hook in `src/features/user-mapping/hooks.ts` to pass all parameters to `getListUserMappings` service function
  - [x] 9.2: Pass `query` (debounced search text) as `search` parameter
  - [x] 9.3: Pass `page` parameter to API service
  - [x] 9.4: Pass `rowsPerPage` parameter to API service
  - [x] 9.5: Pass `sortBy` (converted sort format) to API service
  - [x] 9.6: Update `staleTime` from `Infinity` to `5 * 60 * 1000` (5 minutes) to align with project conventions from `src/lib/queryClient.ts`
  - [x] 9.7: Ensure `queryKey` includes all parameters that affect the query: `[QUERY_KEY_USER_MAPPING_LIST, query, page, rowsPerPage, sortBy]`

- [x] **Task 10: Add Comprehensive Translation Keys**
  - [x] 10.1: Add missing translation keys in `src/i18n/locales/en/translation.json` under `userMapping.dialog`: `addTitle: "Add User Mapping"`, `editTitle: "Edit User Mapping"`, `deleteTitle: "Delete User Mapping"`, `deleteDescription: "Are you sure you want to delete this user mapping? This action cannot be undone."`
  - [x] 10.2: Add field labels: `fields.vistaUser: "Vista User"`, `fields.teamworkUser: "Teamwork User"`, `fields.defaultActionTypes: "Default Action Types"`
  - [x] 10.3: Add placeholder text: `placeholders.selectVistaUser: "Select Vista User"`, `placeholders.selectTeamworkUser: "Select Teamwork User"`, `placeholders.selectActionTypes: "Select action types"`
  - [x] 10.4: Add validation messages: `validation.vistaUserRequired: "Vista user is required"`, `validation.teamworkUserRequired: "Teamwork user is required"`, `validation.actionTypesRequired: "At least one action type is required"`
  - [x] 10.5: Add success messages: `messages.addSuccess: "User mapping created successfully"`, `messages.updateSuccess: "User mapping updated successfully"`, `messages.deleteSuccess: "User mapping deleted successfully"`, `messages.errorGeneric: "Something went wrong. Please try again later."`
  - [x] 10.6: Add no search results messages: `noSearchResults.title: "No user mappings found"`, `noSearchResults.description: "No results found for \"{{searchTerm}}\". Try adjusting your search."`

# Current Goal

ALL tasks complete
