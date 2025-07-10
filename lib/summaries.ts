import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
}

export async function getSummaryId(id: string) {
  try {
    const sql = await getDbConnection();

    const [summary] = await sql`SELECT
    id,
    user_id,
    original_file_url,
    file_key,
    summary_text,
    status,
    title,
    file_name,
    created_at,
    updated_at,
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count from pdf_summaries where id = ${id}`;

    return summary;
  } catch (err) {
    console.error("Error fetching summary by id", err);
    return null;
  }
}
