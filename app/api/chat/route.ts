import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json()

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages,
    })

    return NextResponse.json({ content: response.content[0].type === "text" ? response.content[0].text : "" })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ content: "Sorry, something went wrong." }, { status: 500 })
  }
}
