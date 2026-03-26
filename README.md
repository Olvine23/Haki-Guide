<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dc3d39f9-d527-4a30-80df-b6d40d93503a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

🛡️ Haki-Guide — AI Civic Rights Assistant

Haki-Guide is an AI-powered tool that helps everyday citizens understand their rights under the Constitution of Kenya in simple, actionable terms.

Instead of navigating complex legal language, users can ask questions in natural language and receive clear explanations, relevant legal context, and practical next steps.

🚀 Problem

Legal language is complex and difficult for most people to understand.
As a result:

Citizens are unaware of their rights
People don’t know what actions to take in critical situations
Access to justice becomes limited
🎯 Solution

Haki-Guide uses AI to:

Simplify constitutional and legal information
Provide clear explanations in plain language
Suggest actionable steps users can take
Offer localized and relatable guidance
💡 Key Features
🧠 AI-Powered Explanations
Converts complex legal text into simple, understandable language
🛡️ Rights Breakdown
Clearly identifies the relevant constitutional rights
👣 Actionable Next Steps
Guides users on what to do in real-life situations
🌍 Localized Context
Focuses on Kenyan law and real civic scenarios
🇰🇪 Multilingual Support
Provides a concise Swahili summary (“Kwa ufupi”)
⚠️ Ethical Safeguards
Includes disclaimers to avoid misuse as legal advice
🧩 Example Use Case

User Input:

“Can the police arrest me without telling me why?”

AI Output:

✅ Clear answer
🛡️ Relevant constitutional article
👣 Practical next steps (e.g., reporting channels)
🇰🇪 Swahili summary
🛠️ How It Works
User inputs a question or scenario
AI processes the request using a structured prompt
The system:
Identifies relevant legal provisions
Simplifies the language
Provides actionable guidance
Response is returned in a structured, easy-to-read format
🧠 AI Design

The system uses a role-based prompt (“Haki-Guide”) that:

Grounds responses in the Constitution of Kenya (2010)
Recognizes common civic scenarios
Produces structured outputs:
Summary
Rights
Next Steps
Swahili translation
🎯 Impact

Haki-Guide aims to:

Improve civic awareness
Empower citizens with accessible legal knowledge
Reduce information barriers
Promote informed decision-making
⚠️ Disclaimer

This tool provides information for educational purposes only and does not constitute legal advice.
Users are encouraged to consult a certified advocate for legal representation.

🏁 Buildathon Context

This project was built as part of the Build with AI East Africa Buildathon, under the AI for Social Good theme.

❤️ Why It Matters

Access to legal knowledge should not require expertise.
Haki-Guide helps bridge that gap by making rights understandable, actionable, and accessible to everyone.
