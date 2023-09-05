const { test, expect } = require("@playwright/test");
const { updateJwtExpiration } = require("./testUtils.cjs");

test.describe("Initial Consult", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("login");

    const originalToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3MGJhNzBjNmY0MDMxOTliYWMyZWMiLCJpYXQiOjE2OTExMTAxMjEsImV4cCI6MTY5MTExMzcyMX0.fVH8aN5RF27WqBzOv_lMuq7vQxgvfIRZIMUGfYHmzOg";
    const newExpiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // New expiration time (e.g., 24 hours from now)
    const updatedToken = updateJwtExpiration(originalToken, newExpiration);

    await page.route("**/*/prac/login", async (route) => {
      const loginJson = {
        token: updatedToken,
      };
      await route.fulfill({ body: JSON.stringify(loginJson) });
    });

    const fakePracId = "64c70ba70c6f403199bac2ec";

    await page.route(`**/*/prac/${fakePracId}`, async (route) => {
      const pracJson = {
        message: "Prac fetched.",
        prac: {
          _id: fakePracId,
          firstName: "TestName",
          lastName: "TestLast",
          email: "test@test.com",
          password:
            "$2a$10$ApcuKTdzYGpyiXe3BCcy5uvlIUtAzGGzXjyO3u4nfGWAt8wzOVdUu",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(pracJson) });
    });

    await page.route(`**/*/patients/prac/${fakePracId}`, async (route) => {
      const patientsJson = {
        message: "Fetched patients successfully.",
        patients: [
          {
            _id: "64cc52a8faf3566c6ce4c872",
            firstName: "James",
            lastName: "Howlett",
            dateOfBirth: "1950-01-01T00:00:00.000Z",
            email: "jamesHowlett@example.com",
            phoneNumber: "0401 234 567",
            medications: "Regular whiskey",
            healthHistory: "Adamantine skin, subdermal claws",
            practitionerId: "64c70ba70c6f403199bac2ec",
            practitionerName: "TestFname TestLname",
            __v: 0,
          },
        ],
      };

      await route.fulfill({ body: JSON.stringify(patientsJson) });
    });

    await page.route(`**/*/patient`, async (route) => {
      const createPatientJson = {
        message: "Created patient successfully.",
        patient: {
          firstName: "James",
          lastName: "Howlett",
          dateOfBirth: "1950-01-01T00:00:00.000Z",
          email: "jamesHowlett@example.com",
          phoneNumber: "0401 234 567",
          medications: "Regular whiskey",
          healthHistory: "Adamantine skin, subdermal claws",
          practitionerId: "64c70ba70c6f403199bac2ec",
          practitionerName: "TestFname TestLname",
          _id: "64cc52a8faf3566c6ce4c872",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(createPatientJson) });
    });

    await page.route(`**/*/session`, async (route) => {
      const createSessionJson = {
        message: "Created session successfully.",
        session: {
          practitionerId: "64c70ba70c6f403199bac2ec",
          patientId: "64cc54c6faf3566c6ce4c8ac",
          sessionDate: "2023-08-04T01:31:39.782Z",
          mainComplaint: "Sore bones",
          sessionNotes: "Very grumpy man.",
          tongue: "Wouldn't let me look",
          pulse: "Very slow and calm.",
          _id: "64cc54fbfaf3566c6ce4c8af",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(createSessionJson) });
    });

    await page.route(`**/*/prescription`, async (route) => {
      const createPrescriptionJson = {
        message: "Created prescription successfully.",
        prescription: {
          sessionId: "64cc54fbfaf3566c6ce4c8af",
          patientId: "64cc54c6faf3566c6ce4c8ac",
          practitionerId: "64c70ba70c6f403199bac2ec",
          formulaName: "Green tea",
          composition: "Mainly leaves, a little bit of root",
          dosageAdministration: "Taken liberally",
          lifestyleAdvice: "Maybe do less fighting...?",
          createdDate: "2023-08-04T01:31:39.797Z",
          practitionerName: "TestFname TestLname",
          sendEmail: false,
          _id: "64cc54fbfaf3566c6ce4c8b4",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(createPrescriptionJson) });
    });
  });

  test("should let me add an initial consult", async ({ page }) => {
    // Login
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByPlaceholder("*****").fill("daobook");
    await page.getByRole("button", { name: "Login", exact: true }).click();

    // Fill out patient form
    await page.getByRole("button", { name: "Initial" }).click();
    await page.getByPlaceholder("Susan", { exact: true }).fill("James");
    await page.getByPlaceholder("Reynolds").fill("Howlett");
    await page
      .getByPlaceholder("susan@example.com")
      .fill("jamesHowlett@example.com");
    await page.getByLabel("Date of Birth* (required)").fill("1950-01-01");
    await page.getByPlaceholder("0401 234 567").fill("0401 234 567");
    await page.getByLabel("Medications").fill("Regular whiskey");
    await page
      .getByLabel("Health history")
      .fill("Adamantine skin, subdermal claws");
    await page.getByRole("button", { name: "Next" }).click();

    // Fill out consult form
    await page.getByLabel("Main Complaint").fill("Sore bones");
    await page.getByLabel("Session notes").fill("Very grumpy man.");
    await page.getByLabel("Tongue").fill("Wouldn't let me look");
    await page.getByLabel("Pulse").fill("Very slow and calm.");
    await page.getByLabel("Formula name* (required)").fill("Green tea");
    await page
      .getByLabel("Composition* (required)")
      .fill("Mainly leaves, a little bit of root");
    await page
      .getByLabel("Dosage & administration* (required)")
      .fill("Taken liberally");
    await page
      .getByLabel("Lifestyle notes* (required)")
      .fill("Maybe do less fighting...?");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Saved!")).toBeVisible();
  });

  test("should show the initial consult in the patient list", async ({
    page,
  }) => {
    // Login
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByPlaceholder("*****").fill("daobook");
    await page.getByRole("button", { name: "Login", exact: true }).click();
    // Check the consultations
    await page.getByRole("button", { name: "Patient List" }).click();
    await expect(
      page.getByRole("heading", { name: "Patient List" })
    ).toBeVisible();
    await expect(page.getByText("James Howlett")).toBeVisible();
  });
});
