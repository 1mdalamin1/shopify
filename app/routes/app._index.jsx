import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
  EmptyState,
  DataTable,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { useLoaderData } from "@remix-run/react";
import { formatDistance, parseISO } from 'date-fns';
import { json } from "@remix-run/node";



export const loader = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const shop = auth.session.shop;
  const { admin } = await authenticate.admin(request);

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

  // console.log('Enriched wishlistData: -------> ', enrichedWishlistData);

  return json(enrichedWishlistData);

};

export const action = async ({ request }) => {

};

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
    <Page title="Wishlist overview dashboard">
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
                <EmptyState
                  heading="Manage your wishlist products here"
                  action={{
                    content: 'Learn more',
                    url: 'https://vir-za.com/contact',
                    external: "true",
                  }}
                  secondaryAction={{
                    content: 'Facebook',
                    url: 'https://facebook.com/virza805',
                    external: "true",
                  }}
                  image="/blank.png"
                >
                  {/* <div style={{ width: 200, margin: "0 auto" }}>
                    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" alt="Construction" style={{ width: "100%" }} />
                  </div> */}
                  <p>You don't have any products in your wishlist yet.</p>
                 
                </EmptyState>
              )}

            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Course content
                      </Text>
                      <Link url="https://youtube.com/@1mdalamin1" target="_blank" removeUnderline>
                        1mdalamin1
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Source code
                      </Text>
                      <Link url="https://github.com/1mdalamin1" target="_blank" removeUnderline>
                        Github
                      </Link>
                    </InlineStack>

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
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
