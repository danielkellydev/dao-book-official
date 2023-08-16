const { test, expect } = require("@playwright/test");
const { updateJwtExpiration } = require("./testUtils.cjs");

const fakePatientId = "64cc52a8faf3566c6ce4c872";
const fakeSessionId = "64cc53cafaf3566c6ce4c887";

test.describe("Patient View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mobile");

    const originalToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNjNTJhOGZhZjM1NjZjNmNlNGM4NzIiLCJpYXQiOjE2OTExMjUyNzIsImV4cCI6MTY5MTEyODg3Mn0.j5uv651t94MsF3bpbLa2cqICClxh0vnN-zJk9YM-q8k";
    const newExpiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // New expiration time (e.g., 24 hours from now)
    const updatedToken = updateJwtExpiration(originalToken, newExpiration);

    // Login
    await page.route("**/*/patient/login", async (route) => {
      const patientLoginJson = {
        token: updatedToken,
      };
      await route.fulfill({ body: JSON.stringify(patientLoginJson) });
    });

    // Sessions
    await page.route(
      `**/*/sessions/patient/${fakePatientId}`,
      async (route) => {
        const patientSessionsJson = {
          message: "Fetched sessions successfully.",
          sessions: [
            {
              _id: "64cc53cafaf3566c6ce4c887",
              practitionerId: "64c70ba70c6f403199bac2ec",
              patientId: "64cc52a8faf3566c6ce4c872",
              sessionDate: "2023-08-04T01:26:34.650Z",
              mainComplaint: "Sore bones",
              sessionNotes: "Very grumpy man.",
              tongue: "Wouldn't let me look",
              pulse: "Very slow and calm.",
              __v: 0,
            },
            {
              _id: "64cc7a2ede3fa381bc5c0be2",
              practitionerId: "64c70ba70c6f403199bac2ec",
              patientId: "64cc52a8faf3566c6ce4c872",
              sessionDate: "2023-08-04T04:10:22.734Z",
              mainComplaint: "Lost a hand",
              sessionNotes: "I mean... The hand thing?",
              tongue: "Still won't let me look.",
              pulse: "Beating slightly faster. Just.",
              __v: 0,
            },
            {
              _id: "64cc7acede3fa381bc5c0c18",
              practitionerId: "64c70ba70c6f403199bac2ec",
              patientId: "64cc52a8faf3566c6ce4c872",
              sessionDate: "2023-08-04T04:13:02.581Z",
              mainComplaint: "NO idea.",
              sessionNotes: "Why did he even come in here?",
              tongue: "Tongue is still there.",
              pulse: "Pulse is slow.",
              __v: 0,
            },
          ],
        };
        await route.fulfill({ body: JSON.stringify(patientSessionsJson) });
      }
    );

    // Session
    await page.route(`**/*/session/patient/${fakeSessionId}`, async (route) => {
      const patientSessionJson = {
        message: "Fetched session successfully.",
        session: {
          _id: fakeSessionId,
          practitionerId: "64c70ba70c6f403199bac2ec",
          patientId: "64cc52a8faf3566c6ce4c872",
          sessionDate: "2023-08-04T01:26:34.650Z",
          mainComplaint: "Sore bones",
          sessionNotes: "Very grumpy man.",
          tongue: "Wouldn't let me look",
          pulse: "Very slow and calm.",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(patientSessionJson) });
    });

    // Prescriptions
    await page.route(
      `**/*/prescriptions/patient/${fakePatientId}`,
      async (route) => {
        const patientSessionJson = {
          message: "Fetched session successfully.",
          prescriptions: [
            {
              _id: "64cc53cafaf3566c6ce4c88c",
              sessionId: "64cc53cafaf3566c6ce4c887",
              patientId: "64cc52a8faf3566c6ce4c872",
              practitionerId: "64c70ba70c6f403199bac2ec",
              formulaName: "Green tea",
              composition: "Mainly leaves, a little bit of root",
              dosageAdministration: "Taken liberally",
              lifestyleAdvice: "Maybe do less fighting...?",
              createdDate: "2023-08-04T01:26:34.698Z",
              practitionerName: "TestFname TestLname",
              sendEmail: false,
              __v: 0,
            },
            {
              _id: "64cc7acede3fa381bc5c0c1d",
              sessionId: "64cc7acede3fa381bc5c0c18",
              patientId: "64cc52a8faf3566c6ce4c872",
              practitionerId: "64c70ba70c6f403199bac2ec",
              formulaName: "Green tea.",
              composition: "Just straight.",
              dosageAdministration: "Changed my mind.",
              lifestyleAdvice: "Don't fight any more mutants.",
              createdDate: "2023-08-04T04:13:02.605Z",
              practitionerName: "TestFname TestLname",
              sendEmail: false,
              __v: 0,
            },
          ],
        };
        await route.fulfill({ body: JSON.stringify(patientSessionJson) });
      }
    );
  });

  test("should let me see a previous session", async ({ page }) => {
    await page.getByRole("button", { name: "Patient Login" }).click();

    // Login
    await page
      .getByPlaceholder("susan@example.com")
      .fill("wolverine.xman@example.com");
    await page.getByLabel("Date of Birth* (required)").fill("1950-01-01");
    await page.getByLabel("Last Name").fill("Wolverine");
    await page.getByRole("button", { name: "Login", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Past Sessions" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "August 4" }).first()
    ).toBeVisible();

    await page.getByRole("link", { name: "August 4" }).first().click();

    await expect(
      page.getByRole("heading", { name: "Notes from" })
    ).toBeVisible();

    await expect(page.getByText("Very grumpy")).toBeVisible();
    await expect(page.getByText("Leaves")).toBeVisible();
  });
});
