export type ActivityEventPayload = {
  eventType:
    | "section_view"
    | "model_view"
    | "model_use_generator"
    | "quick_example_click"
    | "draft_generate_start"
    | "draft_generate_success"
    | "draft_generate_error"
    | "word_download"
    | "copy_text"
    | "manual_download_pdf"
    | "manual_download_word"
    | "home_card_click"
    | "admin_login_success"
    | "admin_login_error"
    | "manual_chapter_view";
  section?: string;
  detail?: string;
  documentType?: string;
  modelId?: string;
};

export async function trackActivity(event: ActivityEventPayload) {
  try {
    await fetch("/api/activity/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.warn("No se pudo registrar actividad", error);
  }
}
