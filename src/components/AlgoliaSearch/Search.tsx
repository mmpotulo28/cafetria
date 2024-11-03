import { liteClient as algoliasearch } from "algoliasearch/lite";
import { GetServerSideProps } from "next";
import singletonRouter from "next/router";
import React from "react";
import { renderToString } from "react-dom/server";
import {
	InstantSearch,
	Hits,
	SearchBox,
	InstantSearchServerState,
	InstantSearchSSRProvider,
	getServerState,
} from "react-instantsearch";
import { createInstantSearchRouterNext } from "react-instantsearch-router-nextjs";
import { Hit } from "./Hit";

const client = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || "",
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || "",
);



type SearchProps = {
	serverState?: InstantSearchServerState;
	url?: string;
};

export default function Search({ serverState, url }: SearchProps) {
	return (
		<InstantSearchSSRProvider {...serverState}>
			<InstantSearch
				searchClient={client}
				indexName="items_index"
				routing={{
					router: createInstantSearchRouterNext({
						serverUrl: url,
						singletonRouter,
						routerOptions: {
							cleanUrlOnDispose: false,
						},
					}),
				}}
				insights={true}>
				<div className="Container">
					<div>
						<SearchBox />
						<Hits hitComponent={Hit} />
					</div>
				</div>
			</InstantSearch>
		</InstantSearchSSRProvider>
	);
}

export const getServerSideProps: GetServerSideProps<SearchProps> =
	async function getServerSideProps({ req }) {
		const protocol = req.headers.referer?.split("://")[0] || "https";
		const url = `${protocol}://${req.headers.host}${req.url}`;
		const serverState = await getServerState(<Search url={url} />, {
			renderToString,
		});

		return {
			props: {
				serverState,
				url,
			},
		};
	};
