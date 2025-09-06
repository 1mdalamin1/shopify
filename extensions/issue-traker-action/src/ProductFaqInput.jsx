import { useCallback, useEffect, useState } from "react";
import {
  reactExtension,
  useApi,
  TextField,
  AdminAction,
  Button,
  TextArea,
  Box,
} from "@shopify/ui-extensions-react/admin";
import { getFAQs, updateFAQs } from "./utils";

function generateId (allFAQs) {
  return !allFAQs?.length ? 0 : allFAQs[allFAQs.length - 1].id + 1;
};

function validateForm ({title, description}) {
  return {
    isValid: Boolean(title) && Boolean(description),
    errors: {
      title: !title,
      description: !description,
    },
  };
};

// The target used here must match the target used in the extension's .toml file at ./shopify.extension.toml
const TARGET = "admin.product-details.action.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  //connect with the extension's APIs
  const { close, data } = useApi(TARGET);
  const [faq, setFaq] = useState({ title: "", description: "" });
  const [allFAQs, setAllFAQs] = useState([]);
  const [formErrors, setFormErrors] = useState(null);
  const { title, description } = faq;

  useEffect(() => {
    getFAQs(data.selected[0].id).then(faqs => setAllFAQs(faqs || []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(async () => {
    const {isValid, errors} = validateForm(faq);
    setFormErrors(errors);

    if (isValid) {
      // Commit changes to the database
      await updateFAQs(data.selected[0].id, [
        ...allFAQs,
        {
          id: generateId(allFAQs),
          completed: false,
          ...faq,
        }
      ]);
      // Close the modal using the 'close' API
      close();
    }
  }, [faq, data.selected, allFAQs, close]);

  return (
    <AdminAction
      title="Create a FAQ"
      primaryAction={
        <Button onPress={onSubmit}>Create</Button>
      }
      secondaryAction={<Button onPress={close}>Cancel</Button>}
    >
      <TextField
        value={title}
        error={formErrors?.title ? "Please enter a question" : undefined}
        onChange={(val) => setFaq((prev) => ({ ...prev, title: val }))}
        label="Question"
        maxLength={50}
      />
      <Box paddingBlockStart="large">
        <TextArea
          value={description}
          error={
            formErrors?.description ? "Please enter an answer this question" : undefined
          }
          onChange={(val) =>
            setFaq((prev) => ({ ...prev, description: val }))
          }
          label="Answer"
          maxLength={300}
        />
      </Box>
    </AdminAction>
  );
}
