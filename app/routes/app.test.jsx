
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";

// Import primsa db
import db from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  // get data from database if it exists. If not return empty object
  let settings = await db.settings.findFirst({
    where: {
      shop: session.shop,
    },
  });

  if (!settings) {
    settings = {};
  }
  return json(settings);
}


export async function action({ request }) {
  // updates persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  const { session } = await authenticate.admin(request);

  // update database
  await db.settings.upsert({
    where: { shop: session.shop },
    update: {
      name: settings.name,
      description: settings.description,
      shop: session.shop
    },
    create: {
      name: settings.name,
      description: settings.description,
      shop: session.shop
    }
  });

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  return (<div className="bufy-container">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="https://flowbite.com/docs/components/card/#card-with-nav-tabs"><img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="Tanvir" /></a>
        <div className="p-5">
            <a href="#">
                <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tailwind CSS</div>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <a href="https://flowbite.com/docs/components/card/#card-with-nav-tabs" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Flowbite
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    </div>
  </div>);
}



// jQuery (e.g., inside a useEffect)
// import { useEffect } from "react";

// export default function Example() {
//   useEffect(() => {
//     if (window.$) {
//       window.$("body").addClass("jquery-loaded");
//     }
//   }, []);
//   return (
//     <>
//     <div x-data="{ open: false }">
//       <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => (open = !open)}>
//         Toggle
//       </button>
//       <p x-show="open" className="mt-2 text-sm text-gray-700">Hello from Alpine</p>
//     </div>
//     <div className="p-4">Check the body class for “jquery-loaded”.</div>
//     </>
//   );
// }


