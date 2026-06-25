# Customer Compass - Hackathon Context

## Project Overview

We are building a Microsoft Global Intern Hackathon 2026 project for the **Customer Engagement & Support** challenge.

Challenge focus:

- Improve customer engagement and supportability
- AI support agents
- Customer insights
- Personalized engagement
- Support case deflection
- Customer retention
- Proactive customer support

Judging feedback we received:

- Strong hackathon projects should have significant business/company impact.
- Strong hackathon projects should tell a compelling story.

## Project Name

**Customer Compass**

Tagline:

> Guiding customers through uncertainty with clarity, trust, and proactive support.

## Problem Statement

Customers often lose trust during support engagements because:

- Technical incidents are difficult to understand.
- Support updates can be inconsistent.
- Customers do not know what to expect next.
- Engineers spend significant time searching historical incidents and support documentation.

The problem is not only fixing technical issues but maintaining customer trust throughout the support process.

## Solution

Customer Compass is an AI-powered support platform that helps support engineers deliver clear, personalized, and trustworthy customer communications.

It learns from:

- Historical incidents
- Root Cause Analyses (RCAs)
- Support documentation
- Past resolutions

And generates:

- Similar historical incidents
- Recommended next actions
- Customer-friendly explanations
- Personalized status updates
- Resolution expectations
- Proactive support recommendations

## Future Vision

### Proactive Customer Rescue

Future capability:

Customer Compass identifies customers showing patterns associated with known incidents before a support ticket is opened.

Example:

- Detect warning signals
- Predict likely issue
- Automatically generate proactive outreach
- Help prevent customer impact

Story:

> Move Microsoft from reactive support to proactive customer success.

## Why This Is Different

This is **not** just an incident search engine.

The primary value is customer communication and trust.

Core idea:

> Turn Microsoft's historical support knowledge into clear, customer-ready guidance.

AI is the enabling technology.

Customer trust is the goal.

## Team Structure

Team of 4-6 people.

I am the Frontend Lead.

Other roles:

1. Frontend Lead (me)
2. AI / Backend Lead
3. Product / Customer Experience Lead
4. Design / Presentation / Video Lead

## Technical Architecture

### Frontend

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel deployment

Frontend responsibilities:

- Build dashboard UI
- Customer issue submission flow
- Results display
- Customer communication display
- Demo experience

### Backend

Recommended architecture:

Next.js API routes.

Example flow:

Customer Issue

↓

Find Similar Incidents

↓

Construct Prompt

↓

Call LLM

↓

Generate Response

Response shape:

```json
{
  "similarIncidents": [],
  "recommendedActions": [],
  "customerMessage": ""
}
```

## MVP Scope

We only have a few days.

Focus on:

### Customer Issue Input

User enters:

> Customer experiencing intermittent networking failures.

### AI Analysis

Display:

#### Similar Incidents

- Incident A
- Incident B

#### Recommended Actions

- Check route configuration
- Verify service dependencies

#### Customer Communication

AI-generated customer-friendly explanation.

## Planned UI

Page layout:

------------------------------------------------

Customer Compass

------------------------------------------------

Describe Customer Issue

[ Text Area ]

[ Analyze Issue ]

------------------------------------------------

Similar Incidents

------------------------------------------------

Incident A

Incident B

------------------------------------------------

Recommended Actions

------------------------------------------------

Action 1

Action 2

------------------------------------------------

Customer Communication Draft

------------------------------------------------

Customer-friendly explanation

## Frontend Technology Decisions

Use:

- Next.js
- React
- TypeScript
- Tailwind
- Vercel

Do not use:

- Redux
- Complex state management
- Separate backend service
- Kubernetes
- Docker
- Authentication

Prioritize speed and demo quality.