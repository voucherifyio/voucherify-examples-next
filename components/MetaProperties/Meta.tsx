import Head from "next/head";
import { MetaTypes } from "./types";

export const MetaProperties = ({ title, description, keywords }: MetaTypes) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial scale" />
            <title>{ title }</title>
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta charSet="utf-8" />
        </Head>
    )
}

MetaProperties.defaultProps = {
    title: "Voucherify Examples",
    keywords: "examples, voucherify, next, react",
    description: "Examples of using the Voucherify API engine"
}