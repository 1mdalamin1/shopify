export async function updateIssues(id, newIssues) {
  // This example uses metafields to store the data. For more information, refer to https://shopify.dev/docs/apps/custom-data/metafields.
  return await makeGraphQLQuery(
    `mutation SetMetafield($namespace: String!, $ownerId: ID!, $key: String!, $type: String!, $value: String!) {
      metafieldDefinitionCreate(
        definition: {namespace: $namespace, key: $key, name: "Tracked Issues", ownerType: PRODUCT, type: $type, access: {admin: MERCHANT_READ_WRITE}}
      ) {
        createdDefinition {
          id
        }
      }
      metafieldsSet(metafields: [{ownerId:$ownerId, namespace:$namespace, key:$key, type:$type, value:$value}]) {
        userErrors {
          field
          message
          code
        }
      }
    }
    `,
    {
      ownerId: id,
      namespace: "$app:issues",
      key: "issues",
      type: "json",
      value: JSON.stringify(newIssues),
    }
  );
}

export async function getIssues(productId) {
  // This example uses metafields to store the data. For more information, refer to https://shopify.dev/docs/apps/custom-data/metafields.
  const res = await makeGraphQLQuery(
    `query Product($id: ID!) {
      product(id: $id) {
        metafield(namespace: "$app:issues", key:"issues") {
          value
        }
      }
    }
  `,
    { id: productId }
  );

  if (res?.data?.product?.metafield?.value) {
    return JSON.parse(res.data.product.metafield.value);
  }
}


export async function updateFAQs(id, newIssues) {
  // This example uses metafields to store the data. For more information, refer to https://shopify.dev/docs/apps/custom-data/metafields.
  return await makeGraphQLQuery(
    `mutation SetMetafield($namespace: String!, $ownerId: ID!, $key: String!, $type: String!, $value: String!) {
      metafieldDefinitionCreate(
        definition: {namespace: $namespace, key: $key, name: "Product FAQ Input", ownerType: PRODUCT, type: $type, access: {admin: MERCHANT_READ_WRITE}}
      ) {
        createdDefinition {
          id
        }
      }
      metafieldsSet(metafields: [{ownerId:$ownerId, namespace:$namespace, key:$key, type:$type, value:$value}]) {
        userErrors {
          field
          message
          code
        }
      }
    }
    `,
    {
      ownerId: id,
      namespace: "faq",
      key: "faqs",
      type: "json",
      value: JSON.stringify(newIssues),
    }
  );
}

export async function getFAQs(productId) {
  // This example uses metafields to store the data. For more information, refer to https://shopify.dev/docs/apps/custom-data/metafields.
  const res = await makeGraphQLQuery(
    `query Product($id: ID!) {
      product(id: $id) {
        metafield(namespace: "faq", key:"faqs") {
          value
        }
      }
    }
    `,
    { id: productId }
  );

  if (res?.data?.product?.metafield?.value) {
    return JSON.parse(res.data.product.metafield.value);
  }
}


/*
const response = await fetch('https://your-store.myshopify.com/admin/api/2023-10/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': 'YOUR_ADMIN_API_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    query: `
      mutation {
        themeAssetCreate(
          input: {
            themeId: "gid://shopify/Theme/123456789",
            key: "sections/my-custom-section.liquid",
            content: "{% schema %}{ \\"name\\": \\"My Custom Section\\", \\"settings\\": [] }{% endschema %}\\n<div>My custom section content</div>"
          }
        ) {
          themeAsset {
            id
            key
            publicUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `
  })
});
const data = await response.json();
console.log(data);

export async function makeThemeAssetCreate(id, themeGID) {
  // This example uses metafields to store the data. For more information, refer to https://shopify.dev/docs/apps/custom-data/metafields.
  return await makeGraphQLQuery(
mutation CreateSectionFile {
  themeAssetCreate(
    input: {
      themeId: "gid://shopify/Theme/123456789", # Replace with your theme GID
      key: "sections/my-custom-section.liquid",
      content: "{% schema %}{ \"name\": \"My Custom Section\", \"settings\": [] }{% endschema %}\n<div>My custom section content</div>"
    }
  ) {
    themeAsset {
      id
      key
      publicUrl
    }
    userErrors {
      field
      message
    }
  }
}
);
}
*/





async function makeGraphQLQuery(query, variables) {
  const graphQLQuery = {
    query,
    variables,
  };

  const res = await fetch("shopify:admin/api/graphql.json", {
    method: "POST",
    body: JSON.stringify(graphQLQuery),
  });

  if (!res.ok) {
    console.error("Network error");
  }

  return await res.json();
}
