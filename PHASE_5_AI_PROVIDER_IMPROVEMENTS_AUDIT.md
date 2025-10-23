# PHASE 5: AI PROVIDER IMPROVEMENTS AUDIT

**Date:** 2025-10-23
**Status:** Audit Complete - Implementation Ready
**Compliance:** AGENT_CONTEXT_ULTIMATE.md - 100% Production Quality

---

## 🎯 OBJECTIVE

Standardize AI provider implementations with unified timeout handling, consistent confidence scoring, and improved prompts for better reliability and accuracy.

---

## 📊 AUDIT SUMMARY

| Issue Category | Severity | Count | Impact |
|----------------|----------|-------|--------|
| Inconsistent Timeout Implementation | 🔴 HIGH | 2 providers | Provider failures, user experience |
| Duplicate Provider Implementations | 🟡 MEDIUM | 5 files | Confusion, maintenance burden |
| Unreliable Confidence Extraction | 🔴 HIGH | 1 method | Inaccurate confidence scores |
| Missing Confidence in Prompts | 🟡 MEDIUM | All prompts | Relies on heuristics |
| No Unified Error Handling | 🟢 LOW | All providers | Inconsistent error messages |

---

## 🔴 ISSUE 1: INCONSISTENT TIMEOUT IMPLEMENTATION

### Current State

**OpenAI & Anthropic** (SDK-based timeout):
```typescript
// router.ts lines 33-42
this.openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: this.AI_REQUEST_TIMEOUT  // 120000ms
});
this.anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: this.AI_REQUEST_TIMEOUT  // 120000ms
});
```
✅ **Clean, SDK-native timeout handling**

**Gemini & Mistral** (Manual setTimeout with Promise.race):
```typescript
// router.ts lines 184-226 (Gemini)
const timeoutPromise = new Promise((_, reject) => {
  timeoutId = setTimeout(() => {
    reject(new Error('Gemini request timeout'));
  }, this.AI_REQUEST_TIMEOUT);
});

const result = await Promise.race([
  model.generateContent(call.prompt),
  timeoutPromise
]);
```
⚠️ **Manual timeout prone to errors, requires cleanup**

### Problems

1. **Code Duplication**: Same timeout logic repeated in Gemini & Mistral
2. **Error Cleanup**: `clearTimeout()` must be called in both success and error paths
3. **Inconsistent Error Messages**: Different timeout error formats
4. **Maintenance**: Changes to timeout must be made in 2 places

### Recommendation

**Create Unified Timeout Wrapper:**
```typescript
// NEW: src/services/ai-providers/timeout.ts
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  providerName: string
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`${providerName} request timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}
```

**Usage:**
```typescript
// Gemini
const result = await withTimeout(
  model.generateContent(call.prompt),
  this.AI_REQUEST_TIMEOUT,
  'Gemini'
);

// Mistral
const result = await withTimeout(
  this.mistral.chat({ model: '...', messages: [...] }),
  this.AI_REQUEST_TIMEOUT,
  'Mistral'
);
```

---

## 🟡 ISSUE 2: DUPLICATE PROVIDER IMPLEMENTATIONS

### Current State

**Two Sets of Provider Files:**

1. **router.ts** (lines 93-276):
   - `invokeOpenAI()`
   - `invokeAnthropic()`
   - `invokeGemini()`
   - `invokeMistral()`

2. **Separate Provider Files**:
   - `openai.ts` - `callOpenAI()` function
   - `claude.ts` - `callClaude()` function
   - `gemini.ts` - `callGemini()` function
   - `mistral.ts` - `callMistral()` function
   - `cohere.ts` - `callCohere()` function

### Problems

1. **Which Ones Are Used?** Unclear which implementations are active
2. **Inconsistent Confidence**: Different confidence calculation methods
3. **Maintenance Burden**: Changes must be made in 2 places
4. **Code Bloat**: 5 unused files (~500 lines)

### Investigation Needed

Need to determine:
- Which implementations are actually used in production?
- Can we remove the duplicate files?
- Are there any references to the separate provider files?

**Action:** Grep for usage of these functions:
```bash
grep -r "callOpenAI\|callClaude\|callGemini\|callMistral\|callCohere" backend/src
```

### Recommendation

**Option A: Remove Duplicate Files (Recommended if unused)**
- Delete `openai.ts`, `claude.ts`, `gemini.ts`, `mistral.ts`, `cohere.ts`
- Keep only `router.ts` implementations
- Update imports if any exist

**Option B: Consolidate (If both are used)**
- Move all providers to `router.ts`
- Delete separate files
- Update all imports

---

## 🔴 ISSUE 3: UNRELIABLE CONFIDENCE EXTRACTION

### Current Implementation

```typescript
// router.ts lines 278-296
private extractConfidence(response: string): number {
  // Extract confidence from response if mentioned
  const confidenceMatch = response.match(/confidence[:\s]+(\d+)%/i);
  if (confidenceMatch) {
    return parseInt(confidenceMatch[1]) / 100;
  }

  // Default confidence based on response characteristics
  const hasCitations = response.includes('based on') || response.includes('according to');
  const hasNumbers = /\d+/.test(response);
  const hasQualifiers = /uncertain|unclear|insufficient data|missing/i.test(response);

  let confidence = 0.7; // Base confidence
  if (hasCitations) confidence += 0.1;
  if (hasNumbers) confidence += 0.1;
  if (hasQualifiers) confidence -= 0.2;

  return Math.max(0.3, Math.min(0.95, confidence));
}
```

### Problems

1. **Unreliable Regex**: Relies on AI mentioning "confidence: 85%" which it rarely does
2. **Heuristic Fallback**: "Based on", numbers, qualifiers are weak signals
3. **No Ground Truth**: Can't validate if confidence is accurate
4. **Inconsistent Range**: 0.3-0.95, but what does 0.3 really mean?

### Better Approach

**Structured Output with JSON:**
```typescript
// Update prompts to request structured confidence:
const systemPrompt = `You are a fact-based analyst. Provide responses in this JSON format:
{
  "analysis": "your detailed analysis here",
  "confidence": 0.85,
  "reasoning": "I'm highly confident because [evidence]"
}

Confidence scale:
- 0.9-1.0: Very High (strong evidence, multiple sources)
- 0.7-0.9: High (good evidence, some verification)
- 0.5-0.7: Medium (limited evidence, assumptions made)
- 0.3-0.5: Low (speculation, insufficient data)
- 0.0-0.3: Very Low (pure guess, no evidence)
`;
```

**Extract from JSON:**
```typescript
private extractConfidence(response: string): number {
  try {
    // Try to parse as JSON first
    const json = JSON.parse(response);
    if (typeof json.confidence === 'number') {
      return Math.max(0, Math.min(1, json.confidence));
    }
  } catch {
    // Not JSON, try regex
  }

  // Fallback to existing regex/heuristics
  // ...
}
```

---

## 🟡 ISSUE 4: MISSING CONFIDENCE IN PROMPTS

### Current System Prompts

**OpenAI** (router.ts line 99-100):
```typescript
content: "You are a fact-based analyst. Provide accurate, evidence-based responses."
```

**Anthropic** (router.ts line 137-138):
```typescript
content: "You are a fact-based analyst. Provide accurate, evidence-based responses."
```

**Gemini & Mistral**: Just use `call.prompt` directly, no system prompt

### Problems

1. **No Confidence Request**: Prompts don't ask for confidence scores
2. **No Format Specification**: AI doesn't know how to structure response
3. **Inconsistent Prompts**: Some providers have system prompts, others don't

### Recommendation

**Unified System Prompt Template:**
```typescript
const SYSTEM_PROMPT = `You are a fact-based analyst for organizational assessment.

Response Format:
{
  "analysis": "your detailed analysis",
  "confidence": 0.85,
  "key_factors": ["factor1", "factor2"],
  "assumptions": ["assumption1", "assumption2"]
}

Confidence Guidelines:
- 0.9-1.0: Strong evidence from multiple data sources
- 0.7-0.9: Good evidence with some verification
- 0.5-0.7: Limited evidence, some assumptions
- 0.3-0.5: Speculation or insufficient data
- Below 0.3: Pure guess, recommend data collection

Always be explicit about your confidence level and reasoning.`;
```

**Apply to all providers:**
- OpenAI: ✅ Has system message support
- Anthropic: ✅ Has system parameter
- Gemini: ✅ Can add system instruction
- Mistral: ✅ Can add system message
- Cohere: ✅ Can add preamble

---

## 🟢 ISSUE 5: NO UNIFIED ERROR HANDLING

### Current State

Each provider has different error handling:

**OpenAI:**
```typescript
catch (error) {
  console.error('OpenAI invocation failed:', error);
  throw new Error(`OpenAI provider failed: ${error}`);
}
```

**Gemini:**
```typescript
catch (error) {
  clearTimeout(timeoutId);
  console.error('Gemini invocation failed:', error);
  throw new Error(`Gemini provider failed: ${error}`);
}
```

### Problems

1. **Inconsistent Error Messages**: Different formats
2. **Lost Error Context**: Stack traces not preserved
3. **No Retry Logic**: Fails immediately
4. **No Rate Limit Handling**: Doesn't detect 429 errors

### Recommendation

**Unified Error Handler:**
```typescript
class AIProviderError extends Error {
  constructor(
    public provider: string,
    public originalError: unknown,
    public isRateLimited: boolean = false,
    public isTimeout: boolean = false
  ) {
    super(`${provider} provider failed: ${originalError}`);
    this.name = 'AIProviderError';
  }
}

private handleProviderError(provider: string, error: unknown): never {
  const isTimeout = error instanceof Error && error.message.includes('timeout');
  const isRateLimit = error instanceof Error &&
    (error.message.includes('429') || error.message.includes('rate limit'));

  throw new AIProviderError(provider, error, isRateLimit, isTimeout);
}
```

---

## 📋 IMPLEMENTATION PLAN

### Phase 5-1: Create Timeout Utility ✅
**File:** `backend/src/services/ai-providers/timeout.ts` (NEW)
- Create `withTimeout<T>()` helper function
- Automatic cleanup with `finally` block
- Consistent error messages

**Time:** 10 minutes

---

### Phase 5-2: Remove Duplicate Provider Files ✅
**Action:** Investigate usage and remove if unused

1. Grep for `callOpenAI`, `callClaude`, etc.
2. If unused, delete:
   - `openai.ts`
   - `claude.ts`
   - `gemini.ts`
   - `mistral.ts`
   - `cohere.ts`
3. Update any imports

**Time:** 15 minutes

---

### Phase 5-3: Implement Unified Timeout ✅
**File:** `backend/src/services/ai-providers/router.ts`

1. Import `withTimeout` helper
2. Update `invokeGemini()` to use wrapper
3. Update `invokeMistral()` to use wrapper
4. Remove manual timeout logic

**Time:** 20 minutes

---

### Phase 5-4: Improve Confidence Extraction ✅
**File:** `backend/src/services/ai-providers/router.ts`

1. Update `extractConfidence()` to try JSON parsing first
2. Keep regex/heuristics as fallback
3. Add better error handling

**Time:** 15 minutes

---

### Phase 5-5: Update System Prompts ✅
**File:** `backend/src/services/ai-providers/router.ts`

1. Create unified system prompt constant
2. Update OpenAI system message
3. Update Anthropic system parameter
4. Add system prompts to Gemini
5. Add system prompts to Mistral

**Time:** 20 minutes

---

### Phase 5-6: Unified Error Handling ⏸️ (Optional)
**File:** `backend/src/services/ai-providers/router.ts`

1. Create `AIProviderError` class
2. Create `handleProviderError()` method
3. Update all catch blocks
4. Add rate limit detection

**Time:** 20 minutes (OPTIONAL - can defer to future iteration)

---

## ✅ SUCCESS CRITERIA

Phase 5 complete when:
- ✅ Unified timeout helper created and used by all providers
- ✅ Duplicate provider files removed (if unused)
- ✅ All providers use consistent timeout mechanism
- ✅ Confidence extraction tries JSON parsing first
- ✅ All providers have unified system prompts requesting confidence
- ✅ TypeScript compilation: SUCCESS (0 errors)
- ⏸️ (Optional) Unified error handling implemented

---

## 🎯 EXPECTED RESULTS

### Before Phase 5
- **Timeout Mechanisms:** 2 different approaches (SDK + manual)
- **Provider Files:** 5 duplicate files (~500 lines)
- **Confidence Extraction:** Unreliable regex + heuristics
- **System Prompts:** Inconsistent, no confidence request
- **Error Handling:** Inconsistent formats

### After Phase 5
- **Timeout Mechanisms:** 1 unified approach ✅
- **Provider Files:** Consolidated to router.ts only ✅
- **Confidence Extraction:** JSON-first, fallback to heuristics ✅
- **System Prompts:** Unified template with confidence guidelines ✅
- **Error Handling:** Consistent error types ✅

---

**Next Step:** Begin Phase 5-1 (Create timeout utility) - 10 minutes
