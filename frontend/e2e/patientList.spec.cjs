const { test, expect } = require("@playwright/test");
const { updateJwtExpiration } = require("./testUtils.cjs");

const fakePracId = "64c70ba70c6f403199bac2ec";
const fakePatientId = "64cc52a8faf3566c6ce4c872";
const fakeSessionId = "64cc7acede3fa381bc5c0c18";

test.describe("Patient List", () => {
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
            _id: fakePatientId,
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

    await page.route(`**/*/patient/${fakePatientId}`, async (route) => {
      const patientJson = {
        message: "Fetched patient successfully.",
        patient: {
          _id: fakePatientId,
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
      };
      const puttedPatientJson = {
        message: "Updated patient successfully.",
        patient: {
          _id: "64cc52a8faf3566c6ce4c872",
          firstName: "The",
          lastName: "Wolverine",
          dateOfBirth: "1950-01-01T00:00:00.000Z",
          email: "wolverine.xman@example.com",
          phoneNumber: "0401 234 567",
          medications: "Regular whiskey",
          healthHistory: "Adamantine skin, subdermal claws",
          practitionerId: "64c70ba70c6f403199bac2ec",
          practitionerName: "TestFname TestLname",
          __v: 0,
        },
      };
      if (route.request().method === "PUT") {
        await route.fulfill({ body: JSON.stringify(puttedPatientJson) });
      }
      await route.fulfill({ body: JSON.stringify(patientJson) });
    });

    await page.route(`**/*/session`, async (route) => {
      const createdSessionJson = {
        message: "Created session successfully.",
        session: {
          practitionerId: "64c70ba70c6f403199bac2ec",
          patientId: fakePatientId,
          sessionDate: "2023-08-04T04:13:02.581Z",
          mainComplaint: "NO idea.",
          sessionNotes: "Why did he even come in here?",
          tongue: "Tongue is still there.",
          pulse: "Pulse is slow.",
          _id: fakeSessionId,
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(createdSessionJson) });
    });

    await page.route(`**/*/session/${fakeSessionId}`, async (route) => {
      const fetchedSessionJson = {
        message: "Fetched session successfully.",
        session: {
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
      };
      const puttedSessionJson = {
        message: "Session updated.",
        session: {
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
      };
      if (route.request().method === "PUT") {
        await route.fulfill({ body: JSON.stringify(puttedSessionJson) });
      }
      await route.fulfill({ body: JSON.stringify(fetchedSessionJson) });
    });

    await page.route(
      `**/*/sessions/patient/${fakePatientId}`,
      async (route) => {
        const fakeSessionJson = {
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
              _id: fakeSessionId,
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
        await route.fulfill({ body: JSON.stringify(fakeSessionJson) });
      }
    );

    await page.route(
      `**/*/prescription/session/${fakeSessionId}`,
      async (route) => {
        const fetchedPrescriptionJson = {
          message: "Fetched prescriptions successfully for this session.",
          prescriptions: [
            {
              _id: "64cc7acede3fa381bc5c0c1d",
              sessionId: "64cc7acede3fa381bc5c0c18",
              patientId: "64cc52a8faf3566c6ce4c872",
              practitionerId: "64c70ba70c6f403199bac2ec",
              formulaName: "Whiskey.",
              composition: "Just straight.",
              dosageAdministration: "As much as he wants.",
              lifestyleAdvice: "Don't fight any more mutants.",
              createdDate: "2023-08-04T04:13:02.605Z",
              practitionerName: "TestFname TestLname",
              sendEmail: false,
              __v: 0,
            },
          ],
        };
        await route.fulfill({ body: JSON.stringify(fetchedPrescriptionJson) });
      }
    );

    await page.route(`**/*/prescription`, async (route) => {
      const createdPrescriptionJson = {
        message: "Created prescription successfully.",
        prescription: {
          sessionId: fakeSessionId,
          patientId: fakePatientId,
          practitionerId: "64c70ba70c6f403199bac2ec",
          formulaName: "Whiskey.",
          composition: "Just straight.",
          dosageAdministration: "As much as he wants.",
          lifestyleAdvice: "Don't fight any more mutants.",
          createdDate: "2023-08-04T04:13:02.605Z",
          practitionerName: "TestFname TestLname",
          sendEmail: false,
          _id: "64cc7acede3fa381bc5c0c1d",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(createdPrescriptionJson) });
    });
    await page.route(
      `**/*/prescription/${"64cc7acede3fa381bc5c0c1d"}`,
      async (route) => {
        const puttedPrescriptionJson = {
          message: "Prescription updated.",
          prescription: {
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
        };
        await route.fulfill({ body: JSON.stringify(puttedPrescriptionJson) });
      }
    );
  });

  test("should let me view my patient list", async ({ page }) => {
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

  test("should let me update my patient's details", async ({ page }) => {
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
    await page.getByText("James Howlett").click();
    // Update the fields
    await page.getByPlaceholder("Susan", { exact: true }).fill("The");
    await page.getByPlaceholder("Reynolds").fill("Wolverine");
    await page
      .getByPlaceholder("susan@example.com")
      .fill("wolverine.xman@example.com");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("button", { name: "Saved!" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Saved!" })).toBeDisabled();
  });
});
