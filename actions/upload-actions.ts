"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  fileKey: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload failed",
      data: null,
    };
  }

  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //call gpt 4.1
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      sucess: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "File Upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  fileKey,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  //sql statement for inserting pdf summary
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id, original_file_url, file_key, summary_text, title, file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${fileKey},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING id, summary_text
    `;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  fileKey,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  //user is logged in and has a userId
  // save Pdf summary
  //savePdfSummary()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      fileKey,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  //Revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
