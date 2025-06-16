import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const loader = new PDFLoader(blob, {
    splitPages: false,
  });

  const docs = await loader.load();

  return docs[0].pageContent;
}
