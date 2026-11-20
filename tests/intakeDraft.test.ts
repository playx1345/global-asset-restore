import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { authReturnPath, clearIntakeDraft, INTAKE_DRAFT_KEY, readIntakeDraft, saveIntakeDraft } from "../src/lib/intakeDraft";

const draft = {
  step: 3,
  incident: "crypto",
  loss: "lt1k",
  when: "week",
  details: { platform: "QA Test Wallet", reference: "transaction-123", summary: "A fraudulent transfer removed funds from my wallet." },
  contact: { name: "Assessment Tester", email: "assessment@example.com" },
};

function memoryStorage() {
  const entries = new Map<string, string>();
  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => { entries.set(key, value); },
    removeItem: (key: string) => { entries.delete(key); },
  };
}

describe("assessment sign-in handoff", () => {
  test("preserves every answer and the final step across a remount", () => {
    const storage = memoryStorage();
    assert.equal(saveIntakeDraft(storage, draft), true);
    assert.deepEqual(readIntakeDraft(storage), draft);
  });

  test("clears the saved assessment only when requested after submission", () => {
    const storage = memoryStorage();
    saveIntakeDraft(storage, draft);
    clearIntakeDraft(storage);
    assert.equal(readIntakeDraft(storage), null);
  });

  test("ignores malformed saved drafts and reports unavailable storage", () => {
    const storage = memoryStorage();
    storage.setItem(INTAKE_DRAFT_KEY, '{"step":99}');
    assert.equal(readIntakeDraft(storage), null);
    assert.equal(saveIntakeDraft({ setItem: () => { throw new Error("blocked"); } }, draft), false);
  });

  test("returns assessment visitors to /start and ordinary logins to /portal", () => {
    assert.equal(authReturnPath("?returnTo=%2Fstart"), "/start");
    assert.equal(authReturnPath(""), "/portal");
    assert.equal(authReturnPath("?returnTo=https://example.com"), "/portal");
    assert.equal(authReturnPath("?returnTo=//example.com"), "/portal");
  });
});