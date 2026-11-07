import assert from "node:assert/strict";
import test from "node:test";
import {
  calculatePayoutEstimate,
  nextPayoutStatus,
  validatePayoutAmount,
} from "@/lib/payout-mock";

test("payout estimate uses the fixed illustrative conversion and fee", () => {
  const estimate = calculatePayoutEstimate(250_000, "NGN", "GBP");
  assert.deepEqual(estimate, { rate: 0.00051, fee: 3750, recipientAmount: 125.59 });
});

test("payout amount validation rejects non-finite, too-small, and too-large amounts", () => {
  assert.match(validatePayoutAmount(Number.NaN)!, /between 100 and 100,000,000/);
  assert.match(validatePayoutAmount(99)!, /between 100 and 100,000,000/);
  assert.match(validatePayoutAmount(100_000_001)!, /between 100 and 100,000,000/);
  assert.equal(validatePayoutAmount(100), undefined);
});

test("mock payout states can advance from queued to completed and then stop", () => {
  assert.equal(nextPayoutStatus("Queued"), "Processing");
  assert.equal(nextPayoutStatus("Processing"), "Completed");
  assert.equal(nextPayoutStatus("Completed"), "Completed");
  assert.equal(nextPayoutStatus("Failed"), "Failed");
});
