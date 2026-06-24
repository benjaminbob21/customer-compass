# Customer Compass — Architecture

Customer Compass turns Microsoft's historical support incidents into grounded,
customer-ready guidance. The system is a cloud-native, retrieval-grounded AI
application deployed on Vercel and powered by Azure AI Foundry.

## System Diagram

```mermaid
flowchart TB
    subgraph L1["① Identity &amp; Access"]
        direction LR
        User(["👤 Support Engineer"])
        Entra["🔐 Microsoft Entra ID<br/>Single Sign-On"]
        User --- Entra
    end

    subgraph L2["② Presentation Layer · Vercel Edge Network"]
        direction LR
        Web["⚡ Next.js App Router (React 19)<br/>Server-Rendered UI · HTTPS + CSP/HSTS"]
        Results["📄 Results Page<br/>Trust Score · Actions · Customer Message"]
        Web --- Results
    end

    subgraph L3["③ Application Layer · Serverless API"]
        direction LR
        API["🧩 Analysis API<br/>/api/analyze · validation · SLA-capped"]
        Retrieval["🔎 Incident Similarity Engine<br/>retrieves closest historical incidents"]
        Reasoning["🧠 AI Reasoning Layer<br/>grounds prompt · structures output"]
        API --> Retrieval --> Reasoning
    end

    subgraph L4["④ Intelligence · Azure AI Foundry"]
        AOAI["☁️ Azure OpenAI — GPT-4o<br/>Responsible AI"]
    end

    subgraph L5["⑤ Knowledge Base"]
        KB[("📚 Historical Incident Corpus<br/>incidents · root causes · resolutions")]
    end

    Outlook["📧 Microsoft Outlook<br/>customer-ready email"]

    Entra ==>|authenticated session| Web
    Web ==>|"customer issue"| API
    Retrieval -. grounds on .-> KB
    Reasoning <==>|reason over evidence| AOAI
    Reasoning ==>|"Trust Score · Recommended Actions<br/>Customer-Ready Message · Resolution Path"| Results
    Results ==>|"Send as email"| Outlook

    classDef azure fill:#0078d4,stroke:#004578,color:#ffffff
    classDef kb fill:#eef6ec,stroke:#0e700e,color:#063b06
    classDef identity fill:#ebf3fc,stroke:#2899f5,color:#0c3b5e
    classDef outlook fill:#e6f0fb,stroke:#0f6cbd,color:#0c3b5e
    class AOAI azure
    class KB kb
    class Entra,User identity
    class Outlook outlook
```

## End-to-End Flow

1. **Authenticate** — the support engineer signs in with Microsoft Entra ID (SSO).
2. **Submit** — they describe a customer issue in the Next.js web app on Vercel's edge.
3. **Retrieve** — the Incident Similarity Engine matches the issue against the
   historical incident corpus (incidents, root causes, resolutions).
4. **Reason** — the AI Reasoning Layer grounds a prompt on that evidence and calls
   Azure OpenAI (GPT-4o) to produce structured guidance.
5. **Present** — the Results page renders a Trust Score, recommended actions, a
   customer-ready message, and a resolution path.
6. **Act** — one click sends the customer-ready message as an email via Microsoft Outlook.

## Architectural Principles

- **Secure by default** — Entra ID SSO; all traffic over HTTPS with hardened
  security headers (CSP, HSTS) on Vercel's global edge.
- **Retrieval-grounded intelligence** — answers are grounded in real precedent
  rather than generated from scratch, improving trust and accuracy.
- **Structured, actionable output** — every analysis returns a consistent,
  decision-ready payload (Trust Score, actions, message, resolution path).
- **Cloud-native & resilient** — serverless API with enforced execution SLAs,
  deployed continuously to Vercel.
