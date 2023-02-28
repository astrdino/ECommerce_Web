import React from "react";
import {Toaster} from 'react-hot-toast'

import Layout from "../components/Layout";
import "@/styles/globals.css";
import {StateContext} from "../context/StateContext";




export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      {/* Passing value into each component inside of <StateContext> */}

      <Toaster/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
