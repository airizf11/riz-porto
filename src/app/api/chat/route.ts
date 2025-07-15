// src/app/api/chat/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY ||
  !process.env.GOOGLE_API_KEY
) {
  console.error(
    "FATAL ERROR: Missing environment variables for Supabase or Google AI."
  );
  // throw new Error("Missing environment variables for Supabase or Google AI");
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid 'messages' format." }),
        { status: 400 }
      );
    }
    const userQuery = messages[messages.length - 1].content;

    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });
    const embeddingResult = await embeddingModel.embedContent(userQuery);
    const queryEmbedding = embeddingResult.embedding.values;

    const [
      { data: contextChunks, error: rpcError },
      { data: allContent, error: contentError },
      { data: allTags, error: tagsError },
      { data: socialLinks, error: socialsError },
      { data: quickLinks, error: quickLinksError },
    ] = await Promise.all([
      // Query 1: Pencarian kemiripan (tetap yang utama)
      supabaseAdmin.rpc("match_embeddings", {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 3, // Ambil lebih sedikit, karena kita punya banyak konteks lain
      }),
      // Query 2: Ambil semua judul konten
      supabaseAdmin
        .from("content_items")
        .select("title, content_type, excerpt")
        .eq("status", "published"),
      // Query 3: Ambil semua tags
      supabaseAdmin.from("tags").select("name, tag_type"),
      // Query 4: Ambil semua social links
      supabaseAdmin.from("social_links").select("name, url, category"),
      // Query 5: Ambil semua quick links
      supabaseAdmin
        .from("quick_links")
        .select("title, url")
        .eq("is_active", true),
    ]);

    // Error handling untuk semua query
    if (
      rpcError ||
      contentError ||
      tagsError ||
      socialsError ||
      quickLinksError
    ) {
      console.error({
        rpcError,
        contentError,
        tagsError,
        socialsError,
        quickLinksError,
      });
      throw new Error("Failed to fetch comprehensive context from Supabase.");
    }

    // Format setiap bagian dari konteks menjadi teks yang mudah dibaca AI
    const semanticContext =
      contextChunks?.map((chunk: any) => `- ${chunk.content}`).join("\n") ||
      "No specific content matched.";
    const allContentList =
      allContent?.map((c) => `- ${c.title} (${c.content_type})`).join("\n") ||
      "No content items.";
    const allTagsList =
      allTags?.map((t) => `- ${t.name} (${t.tag_type})`).join("\n") ||
      "No tags.";
    const socialLinksList =
      socialLinks
        ?.map((s) => `- ${s.name} (${s.category}): ${s.url}`)
        .join("\n") || "No social links.";
    const quickLinksList =
      quickLinks?.map((q) => `- ${q.title}: ${q.url}`).join("\n") ||
      "No quick links.";

    // Gabungkan semuanya menjadi satu "Super Context"
    const finalContext = `
      SEMANTICALLY SIMILAR CONTENT (Most relevant):
      ${semanticContext}

      LIST OF ALL PROJECTS, ARTICLES, ETC:
      ${allContentList}

      LIST OF ALL TAGS (SKILLS, TECHNOLOGIES, TOPICS):
      ${allTagsList}
      
      SOCIAL MEDIA AND PROFESSIONAL LINKS:
      ${socialLinksList}

      FEATURED QUICK LINKS:
      ${quickLinksList}
    `;

    // 3. Bangun "Super Prompt" yang lebih luwes
    const prompt = `
      You are Rizi-Bot, an AI assistant for Riziyan's personal website. 
      Your personality is a friendly, professional, and helpful expert on Riziyan.
      Your main goal is to answer questions about Riziyan and his work based on the comprehensive context provided below.

      **CRITICAL INSTRUCTIONS:**
      1.  **Synthesize, Don't Just Quote:** Use the provided context to form a complete, natural-sounding answer. Do not just list the context.
      2.  **Prioritize Semantic Context:** If the "SEMANTICALLY SIMILAR CONTENT" section has relevant information, prioritize it in your answer.
      3.  **Use General Context:** If the semantic context is not enough, use the other lists (projects, tags, links) to answer broader questions (e.g., "what projects has he done?", "where can I find him online?").
      4.  **Graceful Fallback:** If you truly cannot find any relevant information in ANY of the provided context sections, and only then, you can say: "That's a great question! I don't have specific details on that in my knowledge base, but you can explore Riziyan's projects and articles to learn more."
      5.  **Be Conversational:** Don't act like a database. For example, if asked "what are his projects?", instead of just listing them, say "Riziyan has worked on several interesting projects, including: [list projects here]. Is there one you'd like to know more about?".
      
      ---
      CONTEXT:
      ${finalContext}
      ---

      USER'S QUESTION:
      ${userQuery}
    `;

    const chatModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });
    const streamingResult = await chatModel.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of streamingResult.stream) {
          const textChunk = chunk.text();
          controller.enqueue(encoder.encode(textChunk));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error: any) {
    console.error("API Route Internal Error:", error);
    return new Response(
      JSON.stringify({
        error: `An internal server error occurred: ${error.message}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
