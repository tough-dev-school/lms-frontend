import SimpleMDE from "simplemde";
import axios from "@/api/backend.js";

export default ({ element, uniqueId, onChange, onKeyDown }) => {
  const simplemde = new SimpleMDE({
    element,
    spellChecker: false,
    autosave: {
      enabled: true,
      uniqueId,
      delay: 500,
    },
    status: false,
    toolbar: [
      "bold",
      "italic",
      "heading-1",
      "heading-2",
      "heading-3",
      "|",
      "quote",
      "unordered-list",
      "ordered-list",
      "|",
      "fullscreen",
      "preview",
    ],
    previewRender: (markdown, preview) => {
      // сука, как же я ненавижу свою жизнь
      const formData = new FormData();
      formData.append("content", markdown);
      axios.post("/api/v2/markdownx/markdownify/", formData).then((result) => (preview.innerHTML = result.data));
    },
  });
  simplemde.codemirror.on("change", onChange);
  simplemde.codemirror.on("keydown", onKeyDown);

  return simplemde;
};
