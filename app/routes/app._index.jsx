import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
  DataTable,
} from "@shopify/polaris";
// import { authenticate } from "../shopify.server";
// import db from "../db.server";
import { useLoaderData } from "@remix-run/react";
import { formatDistance, parseISO } from 'date-fns';
import { json } from "@remix-run/node";



export const loader = async ({ request }) => {
  // const auth = await authenticate.admin(request);
  // const shop = auth.session.shop;
  // const { admin } = await authenticate.admin(request);

  /*
  // get data from database for that shop acending by id
  const wishlistData = await db.wishlist.findMany({
    where: {
      shop: shop,
    },
    orderBy: {
      id: "asc",
    },
  });

  // Extract unique customer and product IDs
  const productIds = [...new Set(wishlistData.map(item => item.productId))];


  // Fetch product data from Shopify
  const productData = await Promise.all(
    productIds.map(async (productId) => {
      try {
        const response = await admin.graphql(
          `#graphql
          query GetProduct($id: ID!) {
            product(id: $id) {
              id
              title
              featuredImage {
                url
                altText
              }
              variants(first: 1) {
                edges {
                  node {
                    price
                  }
                }
              }
            }
          }`,
          {
            variables: {
              id: `gid://shopify/Product/${productId}`
            }
          }
        );
        const data = await response.json();
        return data.data.product;
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        return { 
          id: productId, 
          title: 'Unknown Product', 
          featuredImage: null,
          variants: { edges: [] }
        };
      }
    })
  );

  const productsById = productData.reduce((acc, product) => {
    const id = product.id.split('/').pop(); // Extract numeric ID from gid
    acc[id] = product;
    return acc;
  }, {});

  // Enrich wishlist data with customerId and product information
  const enrichedWishlistData = wishlistData.map(item => {
    const product = productsById[item.productId] || { 
      title: 'Unknown Product', 
      featuredImage: null,
      variants: { edges: [] }
    };
    
    const price = product.variants.edges[0]?.node?.price || '0.00';
    const imgUrl = product.featuredImage?.url || null;

    return {
      id: item.id,
      customerId: item.customerId,
      productId: item.productId,
      productTitle: product.title,
      productPrice: `${price}`,
      productImage: `${imgUrl}`,
      productImageAlt: product.featuredImage?.altText || product.title,
      shop: item.shop,
      createdAt: item.createdAt
    };
  });

  return json(enrichedWishlistData);
  */
  return json([]);

};

export const action = async ({ request }) => {};

export default function Index() {
  const wishlistData = useLoaderData();
  const wishlistArray = wishlistData.map((item) => {
    
    let createdAt = "N/A";
    if (item.createdAt) {
      const parsedDate = parseISO(item.createdAt);
      if (!isNaN(parsedDate)) {
        createdAt = formatDistance(parsedDate, new Date(), { addSuffix: true });
      }
    }

    const productImage = (
      <img
        src={item.productImage || "/puzzle.png"}
        alt={item.productImageAlt || "Product Image"}
        style={{ width: 80, height: "auto", objectFit: "contain" }}
      />
    );

    // Format price with currency symbol (USD)
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(item.productPrice));

    const productTitle = item.productTitle.length > 20 ? item.productTitle.slice(0, 20) + '...' : item.productTitle;
    const productIdTitle = (<>{item.productId}<br/>{productTitle}</>);
    const customerIdTime = (<><strong>{item.customerId}</strong><br/>{createdAt}</>);

    return [productImage, customerIdTime, productIdTitle, formattedPrice];
  });


  return (
    <Page title="Welcome to Buildify">
      <ui-title-bar title="Overview">
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              {wishlistData.length > 0 ? (
                 <DataTable
                    columnContentTypes={[
                      'text',
                      'text',
                      'text',
                      'text',
                      'text',
                      'text',
                      'text',
                    ]}
                    headings={[
                      'Image',
                      'Customer ID & Time',
                      'Product ID & Title',
                      'Price',
                    ]}
                    rows={wishlistArray}/>

              ) : (
                <> 
                <div className="bufy-container">
                  <div className="max-w-m bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    
                    <img className="rounded-t-lg p-5" src="/blank.png" alt="Tanvir Md Al Amin" />
                    
                    <div className="p-5">
                      <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Buildify = Builder + Shopify</div>
                      
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pb-6">
                        We try to make the best page builder for Shopify.
                      </p>
                      <a href="https://bd.linkedin.com/in/1mdalamin1" target="_blank" className="bufy-btn-blue mr-2 mb-2">
                        Linkedin
                        <svg className="w-5 h-5 ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/></svg>
                      </a>
                      <a href="https://facebook.com/virza805" target="_blank" className="bufy-btn-blue mr-2 mb-2">
                        Facebook 
                        <svg className="w-5 h-5 ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z"/></svg>
                      </a>
                      <a href="https://youtube.com/@1mdalamin1" target="_blank" className="bufy-btn-blue mr-2 mb-2">
                        YouTube 
                        <svg className="w-5 h-5 ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"/></svg>
                      </a>
                      <a href="mailto:virza.bd@gmail.com" target="_blank" className="bufy-btn-blue mr-2 mb-2">
                        Email 
                        <svg className="w-5 h-5 ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
                      </a>
                      <a href="tel:+8801795815660" target="_blank" className="bufy-btn-blue mr-2 mb-2">
                        WhatsApp 
                        <svg className="w-5 h-5 ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>
                      </a>
                      <a href="https://vir-za.com/contact" target="_blank" className="bufy-btn-blue mr-2 mb-2">vir-za.com 
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </a>
                    </div>
                    
                  </div>
                </div>
                </>
              )}

            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Support/Contact Source
                  </Text>
                  <BlockStack gap="200">

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Video Guide line
                      </Text>
                      <Link url="https://youtube.com/@1mdalamin1" target="_blank" removeUnderline>
                        YouTube
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        virza.bd@gmail.com
                      </Text>
                      <Link url="mailto:virza.bd@gmail.com" target="_blank" removeUnderline>
                        Gmail
                      </Link>
                    </InlineStack>

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        +8801795815660
                      </Text>
                      <Link
                        url="tel:+8801795815660"
                        target="_blank"
                        removeUnderline
                      >
                        WhatsApp
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        vir-za.com
                      </Text>
                      <Link
                        url="http://vir-za.com/contact-us/"
                        target="_blank"
                        removeUnderline
                      >
                        Our Website
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        You can share your project.
                      </Text>
                      <span>
                        <Link
                          url="https://www.fiverr.com/tanvirmdalamin"
                          target="_blank"
                          removeUnderline
                        >
                          Fiverr
                        </Link>
                        {", "}
                        <Link
                          url="https://www.upwork.com/freelancers/~01b813f9a16c429b4d?mp_source=share"
                          target="_blank"
                          removeUnderline
                        >
                          Upwork
                        </Link>
                        {", "}
                        <Link
                          url="https://www.freelancer.com/u/virza805"
                          target="_blank"
                          removeUnderline
                        >
                          Freelancer
                        </Link>
                      </span>
                    </InlineStack>

                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <img src="/puzzle.png" alt="My App Logo" />
                  <List>
                    <List.Item>
                      Build a
                      <Link url="https://www.youtube.com/@1mdalamin1" target="_blank" removeUnderline >
                        {" "}
                        Buildify App
                      </Link>{" "}
                      to get started
                    </List.Item>

                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
