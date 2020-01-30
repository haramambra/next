/* eslint-disable */
import {DocumentNode} from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Query = {
	__typename?: 'Query';
	getDog: Scalars['String'];
	now?: Maybe<Scalars['String']>;
};

export type GetDogQueryVariables = {};

export type GetDogQuery = {__typename?: 'Query'} & Pick<Query, 'getDog'>;

export type NowQueryVariables = {};

export type NowQuery = {__typename?: 'Query'} & Pick<Query, 'now'>;

export const GetDogDocument: DocumentNode = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: {kind: 'Name', value: 'GetDog'},
			variableDefinitions: [],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [{kind: 'Field', name: {kind: 'Name', value: 'getDog'}, arguments: [], directives: []}],
			},
		},
	],
};

/**
 * __useGetDogQuery__
 *
 * To run a query within a React component, call `useGetDogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDogQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDogQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDogQuery, GetDogQueryVariables>) {
	return ApolloReactHooks.useQuery<GetDogQuery, GetDogQueryVariables>(GetDogDocument, baseOptions);
}
export function useGetDogLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDogQuery, GetDogQueryVariables>,
) {
	return ApolloReactHooks.useLazyQuery<GetDogQuery, GetDogQueryVariables>(GetDogDocument, baseOptions);
}
export type GetDogQueryHookResult = ReturnType<typeof useGetDogQuery>;
export type GetDogLazyQueryHookResult = ReturnType<typeof useGetDogLazyQuery>;
export type GetDogQueryResult = ApolloReactCommon.QueryResult<GetDogQuery, GetDogQueryVariables>;
export const NowDocument: DocumentNode = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: {kind: 'Name', value: 'Now'},
			variableDefinitions: [],
			directives: [],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [{kind: 'Field', name: {kind: 'Name', value: 'now'}, arguments: [], directives: []}],
			},
		},
	],
};

/**
 * __useNowQuery__
 *
 * To run a query within a React component, call `useNowQuery` and pass it any options that fit your needs.
 * When your component renders, `useNowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNowQuery({
 *   variables: {
 *   },
 * });
 */
export function useNowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NowQuery, NowQueryVariables>) {
	return ApolloReactHooks.useQuery<NowQuery, NowQueryVariables>(NowDocument, baseOptions);
}
export function useNowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NowQuery, NowQueryVariables>) {
	return ApolloReactHooks.useLazyQuery<NowQuery, NowQueryVariables>(NowDocument, baseOptions);
}
export type NowQueryHookResult = ReturnType<typeof useNowQuery>;
export type NowLazyQueryHookResult = ReturnType<typeof useNowLazyQuery>;
export type NowQueryResult = ApolloReactCommon.QueryResult<NowQuery, NowQueryVariables>;
